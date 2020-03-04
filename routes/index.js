var express = require('express');
var router = express.Router();
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

var userModel = require('../models/users');
var agenceModel = require('../models/agences');
var annonceModel = require('../models/annonces');
var rdvModel = require('../models/rdv');

var salt = uid2(15)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

/* ROUTES SingIn SignUp Hasni */

// router.post('/sign-in', async function(req, res, next) {
	
// 	if (req.body.email && req.body.password) {
		
// 		let userObj = await UserModel.findOne({ email: req.body.email });
// 		let hash = SHA256(req.body.password + userObj.salt).toString(encBase64);
   
// 		if( userObj ) {
		
// 			if ( hash === userObj.password ){
			
// 				let newToken = uid2(32);
// 				userObj = await UserModel.updateOne( { email: req.body.email }, {token: newToken} );
				
// 				res.json({ success: true, userToken: newToken });
				
// 			} else {
// 				res.json({ success: false, error: 'Email ou mot de passe incorrects' });
// 			}
			
// 		} else {
// 			res.json({ success: false, error: `Vous n'êtes pas enregistré.e` });
// 		}
// 	}
// 	else {
// 		res.json({ success: false , error: 'Remplissez vos champs de saisie' });
// 	}
// });
module.exports = router;