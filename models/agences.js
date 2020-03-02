const mongoose = require('mongoose');

const agenceSchema = mongoose.Schema({
    nom: String,
    adresse: String,
    logoUrl: String,
    email: String,
    nbTelephone: String
});

const agenceModel = mongoose.model('agences', agenceSchema);

module.exports = agenceModel;