const PlayerModel = require("../models/player.model");



const dbCreatePlayer = async ( newPlayer ) => {
    try {
        const player = new PlayerModel(newPlayer);
        await player.save();

        return player;  

    } catch (error) {
        console.error('Error al crear un jugador:', error);
        throw error;
    } 
}
const dbGetPlayer = async () => {
    try {
        return await PlayerModel.find({}); 
    } catch (error) {
        console.error('Error al obtener los jugadores:', error);
        throw error;
    }
};



const dbGetPlayerById = async ( _id ) => {
    return await PlayerModel.findOne({ _id });
}


const dbUpdatePlayer = async (id, updatedPlayer) => {
        
    return await PlayerModel.findOneAndUpdate(
        { _id: id },
        updatedPlayer,
        { new: true }
    );
}

const dbDeletePlayer = async (id) => {
    return await PlayerModel.findByIdAndDelete(id);
}

module.exports = {
    dbCreatePlayer,
    dbGetPlayer,
    dbGetPlayerById,
    dbUpdatePlayer,
    dbDeletePlayer
};
