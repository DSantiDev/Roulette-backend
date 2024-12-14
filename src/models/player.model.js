const { Schema, model } = require('mongoose');

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    account: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});

const PlayerModel = model('players', PlayerSchema); 
module.exports = PlayerModel;
