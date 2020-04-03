const mongoose = require('mongoose');

const roomImageSchema = mongoose.Schema({
    nom: String,
    url: String
});

// const dispoVisiteSchema = mongoose.Schema({
//     date: String,
//     heure: String,
//     type: String,
//     booked: Boolean
// })

const annonceSchema = mongoose.Schema({
    images: [roomImageSchema],
    ville: String,
    codePostal: Number,
    longitude: Number,
    latitude: Number,
    surface: String,
    nbPiece: String,
    prix: Number,
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
    // agenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'agences' },
    agenceId: String,
    dispoVisite: Array,
    dispo: Boolean
});

const annonceModel = mongoose.model('annonces', annonceSchema);

module.exports = annonceModel;