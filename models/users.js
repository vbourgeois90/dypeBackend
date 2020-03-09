const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    type: String,
    url: String,
    filename: String
});

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
    documents: [documentSchema]
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;