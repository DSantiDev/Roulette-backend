const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const RouletteSchema = new Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'players'
    },
    colors: {
        type: Array,
        default: []
    },
    numbers: {
        type: Array,
        default: []
    },
    beat: {
        type: Number,
    },
    status: {
        type: String,
        default: 'close'
    }
}, {
    timestamps: true        
});

const RouletteModel = model('roulettes', RouletteSchema);

module.exports = RouletteModel;
    