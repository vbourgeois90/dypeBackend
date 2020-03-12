const mongoose = require('mongoose');

const rdvSchema = mongoose.Schema({
    lieu: String,
    date: Date,
    heure: String,
    // agenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'agences' },
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    agenceId: String,
    userId: String
});

const rdvModel = mongoose.model('rdv', rdvSchema);

module.exports = rdvModel;