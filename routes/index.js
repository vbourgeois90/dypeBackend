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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* ROUTES SignUp Hasni */

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


router.post('/uploadPhoto', async function(req, res, next) {
  
  var imagePath = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.photo.mv(imagePath);
  var resultCloudinary = await cloudinary.uploader.upload(imagePath);
  
  if(!resultCopy) {
    res.json({result: true, message: 'File uploaded!', resultCloudinary} );     
  } else {
    res.json({result: false, message: resultCopy} );
  }
  
  // fs.unlinkSync(imagePath);
  
});



module.exports = router;