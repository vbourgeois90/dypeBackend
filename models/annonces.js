const mongoose = require('mongoose');

const annonceSchema = mongoose.Schema({
    images: Array,
    ville: String,
    codePostal: Number,
    longitude: Number,
    latitude: Number,
    surface: String,
    nbPiece: String,
    prix: String,
    typeDeBien: String,
    perfEnergetique: Number,
    chambre: Number,
    salleDeBain: Number,
    toilette: Number,
    balcon: Boolean,
    digicode: Boolean,
    interphone: Boolean,
    terrasse: Boolean,
    parking: Boolean,
    cave: Boolean,
    chauffage: String,
    ascenseur: Boolean,
    lien: String,
    descriptionBref: String,
    agenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'agences' },
    dispoVisite: Array,
    dispo: Boolean
});

const annonceModel = mongoose.model('annonces', annonceSchema);

module.exports = annonceModel;