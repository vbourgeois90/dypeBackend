const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    type: String,
    url: String,
    filename: String
});

<<<<<<< HEAD

=======
const criteresSchema = mongoose.Schema({
    budgetMin: Number,
    budgetMax: Number,
    ville: String
})
>>>>>>> 8840d1faf8ccb4af541a8d1598a8d60924054cb6

const userSchema = mongoose.Schema({
    nom: String, 
    prenom: String,
    email: String,
    password: String,
    token: String,
    salt: String,
    adresse: String,
    sexe: String,
    age: Number,
    probleme: Number,
    validationDossier: Boolean,
<<<<<<< HEAD
    documents: [documentSchema],
    favoris : Array
=======
    criteres: criteresSchema,
    documents: [documentSchema]
>>>>>>> 8840d1faf8ccb4af541a8d1598a8d60924054cb6
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;