const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    type: String,
    url: String,
    filename: String,
    dateAjout: Date,
    isValid: Boolean
});


const criteresSchema = mongoose.Schema({
    budgetMin: Number,
    budgetMax: Number,
    ville: String,
    budgetMaxDype : Number
})

const userSchema = mongoose.Schema({
    type: String,
    nom: String, 
    prenom: String,
    email: String,
    password: String,
    token: String,
    salt: String,
    adresse: String,
    numeroTelephone: String,
    sexe: String,
    age: Number,
    probleme: Number,
    logoUrl: String,
    validationDossier: Boolean,
    documents: [documentSchema],
    favoris : Array,
    criteres: criteresSchema,
    isLoge: Boolean
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;