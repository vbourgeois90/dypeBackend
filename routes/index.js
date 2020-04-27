var express = require('express');
var router = express.Router();
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

var userModel = require('../models/users');
var agenceModel = require('../models/agences');
var annonceModel = require('../models/annonces');
var rdvModel = require('../models/rdv');

var fs = require('fs');
var uniqid = require('uniqid');

var salt = uid2(15);

var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'dainctmx1',
  api_key: '981664579932456', 
  api_secret: 'VMszQ3p1S93QAEWQiCzNzdiTpUE'
});

const request = require('sync-request');
const cheerio = require ('cheerio');
const departement = [{name:"3-75"},{name:"3-78"},{name:"3-77"},{name:"3-92"},{name:"3-93"},{name:"3-94"},{name:"3-95"},{name:"3-91"}]


/* Scraping du bg. */
router.get('/', async function(req, res, next) {
  
  for(var i = 0; i<departement.length;i++){

    var result = request('GET',`https://www.avendrealouer.fr/recherche.html?pageIndex=1&pageSize=25&sortPropertyName=ReleaseDate&sortDirection=Descending&searchTypeID=2&typeGroupCategoryID=6&localityIds=${departement[i].name}&typeGroupIds=47,56&minimumPrice=800&maximumPrice=2000&hashSearch=null_null_null_null_2000_null_null_800_null_False__null_2_6_False_False______3-75_____47,56_&UserSorted=true`)
  
  
    var annonceSave;
    if(result.statusCode < 300){
      const $ = cheerio.load(result.body)
      $('.mode-list').children().each( async function(){
        let lieux = $(this).find('.loca').text().trim()
        let price = $(this).find('.price').text().trim()
        let type = $(this).find('li.first').text().trim()
        let description = $(this).find('.propShortDesc').text().trim()
        let img = $(this).find('.product-media').children().attr('src')
        let link = $(this).find('.product-media').parent().attr('href')
        let piece = $(this).find('.first').next().text().trim()
        let m2 = $(this).find('.first').next().next().text().trim()


      // var detail = request ('GET',`https://www.avendrealouer.fr/${link}`)
      // if(detail.statusCode <300){
      //   const $$ = cheerio.load(result.body)
      //   let fullDesc = $$('.property-description-main').text().trim()
      //     console.log(fullDesc)
      // }

      
      if(lieux && price && type && description && img && link){
        var newAnnonce = new annonceModel({
          localisation : lieux,
          prix : price,
          nbPiece : piece,
          typeDeBien : type,
          descriptionBref : description,
          image : img,
          lien : link,
          surface : m2,
          
        })  
        annonceSave = await newAnnonce.save() 
       
      }
      
    }) 
  } 
} 
  res.json(annonceSave); 
});

/* ROUTES RecoverAnnonce Hasni */
 
router.get('/RecoverAnnonce', async function(req, res, next) {
  var rep = await annonceModel.find();
  
  res.json({success: true, rep});
 })


/* ROUTES SingIn SignUp Hasni */
/* ROUTES SignUp Hasni */

router.post("/SingUp", async function(req, res,next){
  var newUser = new userModel ({
    type: 'utilisateur',
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: SHA256(req.body.mdp + salt).toString(encBase64),
    token : uid2(15),
    salt :salt,
    validationDossier: false
  })
  await newUser.save();
  res.json({sucess:true,newUser})
})

/* ROUTES SingIn Hasni */

router.post('/signIn', async function(req, res, next) {
  console.log("red body",req.body.email, req.body.mdp)
	if (req.body.email && req.body.mdp) {
		
		let userObj = await userModel.findOne({ email: req.body.email });
		if( userObj ) {
      var token = userObj.token;
      let hash = SHA256(req.body.mdp + userObj.salt).toString(encBase64);
			if ( hash === userObj.password ){
        console.log("OK")        
        res.json({ success: true, monToken: token, user: userObj});
      } else {
        console.log("mauvais mdp",userObj)
				res.json({ success: false, error: 'Email ou mot de passe incorrects' });
			}
			
		} else {
      console.log("mauvais user",userObj)

			res.json({ success: false, error: "Vous n'êtes pas enregistré(e)" });
		}
	}
	else {
		res.json({ success: false , error: 'Remplissez vos champs de saisie' });
	}
});


// UPLOAD DOCUMENT DEPUIS APPAREIL PHOTO
router.post('/uploadfromcamera', async function(req, res, next) {
  
  var imagePath = './'+uniqid()+'.jpg';
  var resultCopy = await req.files.photo.mv(imagePath);
  var resultCloudinary = await cloudinary.uploader.upload(imagePath);

  let user = await userModel.findOne({token: req.body.token});

  let date = new Date();

  var docUploaded={
    filename: req.files.photo.name,
    url: resultCloudinary.secure_url,
    dateAjout: date,
    type: req.body.docType,
    isValid: false
  }

  user.documents.push(docUploaded);
  var userSaved = await user.save();

  let lastIndex=userSaved.documents.length;
  let docUploadedWithID=userSaved.documents[lastIndex-1];

  if(!resultCopy) {
    res.json({result: true, message: 'File uploaded!', docUploaded: docUploadedWithID} );     
  } else {
    res.json({result: false, message: resultCopy} );
  }
  
  fs.unlinkSync(imagePath);
  
});


// UPLOAD DOCUMENT DEPUIS LE TELEPHONE
router.post('/uploadfromphone', async function(req, res, next) {

  var imagePath = './'+uniqid()+'.jpg';
  var resultCopy = await req.files.doc.mv(imagePath);
  var resultCloudinary = await cloudinary.uploader.upload(imagePath);
  
  var user = await userModel.findOne({token: req.body.token});

  let date = new Date();

  var docUploaded={
    filename: req.files.doc.name,
    url: resultCloudinary.secure_url,
    dateAjout: date,
    type: req.body.docType,
    isValid: false
  }

  user.documents.push(docUploaded);
  var userSaved = await user.save();

  let lastIndex=userSaved.documents.length;
  let docUploadedWithID=userSaved.documents[lastIndex-1];

  if(!resultCopy) {
    res.json({result: true, message: 'File uploaded!', docUploaded: docUploadedWithID} );     
  } else {
    res.json({result: false, message: resultCopy} );
  }
  
  fs.unlinkSync(imagePath);

})

router.get('/getDocuments/:token', async function (req, res, next){
  
  var user = await userModel.findOne({token: req.params.token});
  res.json({result: 'OK', documents: user.documents});
})

router.post('/addLike',async function (req,res,next){

  var user = await userModel.findOne({token : req.body.token})

  console.log(user.favoris)

  let index = user.favoris.findIndex(id=>id === req.body.idAnnonceLiked)
  if(index === -1){
      user.favoris.push(req.body.idAnnonceLiked);
    }
    
  var userSaved = await user.save();
    
  console.log("USERSAVED", userSaved)
  
  

  res.json({})
})

// SUPPRESSION D'UN DOCUMENT 

router.delete('/deleteDocument/:token/:id', async function (req, res, next){

  let user = await userModel.findOne({token: req.params.token});
  let index=user.documents.findIndex(document => document._id == req.params.id);
  user.documents.splice(index, 1);
  let userSaved = await user.save();

  res.json({result: 'OK'});

});


// VALIDATION DU DOSSIER - SOUMETTRE A L'EQUIPE DYPE POUR VALIDATION \\
router.put('/submitDossier', async function (req, res, next){

  // ON CONSIDERE QUE LE DOSSIER EST VALIDE
  let user = await userModel.findOne({token: req.body.token});
  console.log('user :', user);
  user.validationDossier=true;
  for(let i=0; i<user.documents.length; i++){
    user.documents[i].isValid=true;
  }
  let userSaved = await user.save();
  res.json({userSaved});
})


router.post('/annonces', async function(req, res, next) {

  var newAnnonce = new annonceModel({
    images: [{
      nom: req.body.nom,
      url: req.body.url
    }],
    ville: req.body.ville,
    codePostal: req.body.codePostal,
    surface: req.body.surface,
    nbPiece: req.body.nbPiece,
    prix: req.body.prix,
    typeDeBien: req.body.typeDeBien,
    perfEnergetique: req.body.perfEnergetique,
    chambre: req.body.chambre,
    salleDeBien: req.body.salleDeBien,
    toilette: req.body.toilette,
    balcon: req.body.balcon,
    digicode: req.body.digicode,
    interphone: req.body.interphone,
    terrasse: req.body.terrasse,
    parking: req.body.parking,
    cave: req.body.cave,
    chauffage: req.body.chauffage,
    ascenseur: req.body.ascenseur,
    agenceId: req.body.agenceId
  })

  var annonces = await newAnnonce.save()

  res.json({success: true, annonces });

  
});

router.post('/recherche', async function(req, res, next) {
  
  console.log('TOKEN', req.body.token);

  var user = await userModel.findOne({token: req.body.token})
  
  console.log('USER', user)
  
  user.criteres = {
      ville: req.body.ville,
      budgetMin: req.body.budgetMin,
      budgetMax: req.body.budgetMax
  }
  // console.log(user)

  var userSaved = await user.save();

  res.json(userSaved.criteres)
})

router.post('/mesMatchs', async function(req, res, next) {

  var user = await userModel.findOne({token:req.body.token})
 
  var annonces = await annonceModel.find({
    ville: user.criteres.ville.trim(),
    $and: [{prix:{$gte: user.criteres.budgetMin}}, {prix:{$lte: user.criteres.budgetMax}}] 
  
  })

  res.json({annonces})
});


router.post('/saveToStore',async function(req,res,next){
  console.log('hello',req.body.token)
  
  var annonces;
  var user = await userModel.findOne({
    token : req.body.token
  })
    
  for(var i = 0; i <user.favoris.length; i++){
    var annoncesList = await annonceModel.find({
      _id : user.favoris
    })
  }

    res.json(annoncesList);
  });
  
  router.delete('/deleteFav/:id/:token',async function(req,res,next) {
    var user = await userModel.findOne({
      token : req.params.token
    })
    console.log(user)
    let index=user.favoris.findIndex(favori => favori._id === req.params.id);
  user.favoris.splice(index, 1);
  let userSaved = await user.save();
  console.log(userSaved)
    res.json({})
  })

module.exports = router; 

// OUTIL D'AJOUT DE DISPONIBILITES EN DUR DANS LA BDD - APPELER AVEC POSTMAN POUR LE MOMENT PUIS BACKOFFICE
router.post('/addDispo', async function(req, res, next){

  let annonce = await annonceModel.findOne({_id: '5e6b6980a2e98623047a8bf3'});

  let dispoA = new Date ('2020-03-18T10:30:00.470Z');
  let dispoB = new Date ('2020-03-18T11:00:00.470Z');
  let dispoC = new Date ('2020-03-18T17:00:00.470Z');
  let dispoD = new Date ('2020-03-19T10:00:00.470Z');
  let dispoE = new Date ('2020-03-19T10:30:00.470Z');
  let dispoF = new Date ('2020-03-19T16:00:00.470Z');
  if(annonce){
    annonce.dispoVisite.push(dispoA, dispoB, dispoC, dispoD, dispoE, dispoF);
  }
  
  let annonceSaved = await annonce.save();

  res.json({result: 'OK'});
})


/// §§§§ PAS ENCORE TERMINE §§§§§
// router.post('/saveRdv', async function(req, res, next){   

//   console.log('req.body :', req.body);
//   var newRdv = new rdvModel ({
//     date: req.body.date,
//     agenceId: req.body.agence,
//     userId: req.body.token, 
//     lieu: req.body.annonce
//   })
//   await newRdv.save();

// })


// BACKOFFICE - RECUPERER LES UTILISATEURS
router.get('/getUsers', async function(req, res, next){
  let users = await userModel.find();
  console.log('users :>> ', users);
  res.json(users)
})


module.exports = router;