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
        res.json({ success: true, monToken: token});
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
  
  console.log('req.files :', req.files);

  var imagePath = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.photo.mv(imagePath);
  var resultCloudinary = await cloudinary.uploader.upload(imagePath);

  // BESOIN DE RECUPERER ET RENSEIGNER LE TOKEN DE L'UTILISATEUR VIA LE FRONT ET LE STORE

  console.log('req.files :', req.files);

  var user = await userModel.findOne({nom: 'Majax'});

  var docUploaded={

    // FAIRE TRANSITER LE TYPE DE DOCUMENT - ID EN DUR ICI
    type: req.files.photo.name,
    url: resultCloudinary.secure_url
  }

  user.documents.push(docUploaded);
  var userSaved = await user.save();


  if(!resultCopy) {
    res.json({result: true, message: 'File uploaded!', docUploaded} );     
  } else {
    res.json({result: false, message: resultCopy} );
  }
  
  fs.unlinkSync(imagePath);
  
});


// UPLOAD DOCUMENT DEPUIS LE TELEPHONE
router.post('/uploadfromphone', async function(req, res, next) {


  // console.log('req.body :', req.body); POUR RECUPERER AU PROPRE L'INFORMATION DE TYPE DE FICHIER

  var imagePath = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.doc.mv(imagePath);
  var resultCloudinary = await cloudinary.uploader.upload(imagePath);
  
  // BESOIN DE RECUPERER ET RENSEIGNER LE TOKEN DE L'UTILISATEUR VIA LE FRONT ET LE STORE

  var user = await userModel.findOne({nom: 'Majax'});

  var docUploaded={
    type: req.files.doc.name,
    url: resultCloudinary.secure_url
  }

  user.documents.push(docUploaded);
  var userSaved = await user.save();

  if(!resultCopy) {
    res.json({result: true, message: 'File uploaded!', docUploaded} );     
  } else {
    res.json({result: false, message: resultCopy} );
  }
  
  fs.unlinkSync(imagePath);

})

router.get('/getDocuments', async function (req, res, next){
  

  // BESOIN DE RECUPERER ET RENSEIGNER LE TOKEN DE L'UTILISATEUR VIA LE FRONT ET LE STORE
  
  var user = await userModel.findOne({nom: 'Majax'});

  res.json({result: 'OK', documents: user.documents});
})

router.post('/addLike',async function (req,res,next){
  var id = req.body.idAnnonceLiked; 
  var user = await userModel.findOne({token : req.body.token})
  console.log(id)
  
  user.favoris.push(id);
  var userSaved = await user.save();
  console.log(userSaved)
  res.json({})
})

module.exports = router;