var express = require('express');
var router = express.Router();
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

var userModel = require('../models/users');
var agenceModel = require('../models/agences');
var annonceModel = require('../models/annonces');
var rdvModel = require('../models/rdv');
const request = require('sync-request');
const cheerio = require ('cheerio');
var salt = uid2(15)


/* Scraping du bg. */
router.get('/', async function(req, res, next) {
  
  var result = request('GET','https://www.avendrealouer.fr/recherche.html?pageIndex=1&sortPropertyName=Price&sortDirection=Descending&searchTypeID=2&typeGroupCategoryID=6&localityIds=3-75&typeGroupIds=47,48,56&maximumPrice=2000')
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
      //   $('.property-description').find('div').each( function(){
      //     let fullDesc = $(this).find('.property-description-main').text().trim()
      //     console.log(fullDesc)
      //   })
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
  
  res.json(annonceSave); 
});
 
/* ROUTES SingIn SignUp Hasni */

router.post("/SingUp", async function(req, res,next){
  var newUser = new userModel ({
    nom: req.body.nom, 
    prenom: req.body.prenom,
    email: req.body.email,
    password: SHA256(req.body.mdp + salt).toString(encBase64),
    token : uid2(15),
    salt :salt
  })
  await newUser.save();
 res.json({sucess:true,newUser})
})

/* ROUTES SingIn Hasni */

router.post('/signIn', async function(req, res, next) {
  console.log("red body",req.body.email, req.body.mdp)
	if (req.body.email && req.body.mdp) {
		
		let userObj = await userModel.findOne({ email: req.body.email });
    console.log(userObj);
		if( userObj ) {
      let hash = SHA256(req.body.mdp + userObj.salt).toString(encBase64);
			if ( hash === userObj.password ){
        res.json({ success: true });
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
module.exports = router;