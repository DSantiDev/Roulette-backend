const PlayerModel = require("../models/player.model");
const RouletteModel = require("../models/roulette.model");


const dbCreateRoulette = async ( newRoullete ) => {
    try {
        const roulette = new RouletteModel(newRoullete);
        await roulette.save();

        return roulette;  

    } catch (error) {
        console.error('Error al crear la ruleta:', error);
        throw error;
    } 
}

const dbGetRoulette = async () => {
    try {
        return await RouletteModel.find({}); 
    } catch (error) {
        console.error('Error al obtener las ruletas:', error);
        throw error;
    }
};

const dbGetRouletteById = async ( _id ) => {
    return await RouletteModel.findOne({ _id });
}

const dbOpenRoulette = async (id) => {
    const roulette = await RouletteModel.findById(id);
    if (!roulette) throw new Error('Ruleta no encontrada');
    if (roulette.status === 'open') throw new Error('La ruleta ya está abierta');

    roulette.status = 'open';
    await roulette.save();

    return roulette;
};


const dbRouletteBet = async (rouletteId, bets) => {
    if (!bets || !Array.isArray(bets)) {
        throw new Error('El campo bets debe ser un array');
    }

    const roulette = await RouletteModel.findById(rouletteId);
    if (!roulette) throw new Error('Ruleta no encontrada');
    if (roulette.status !== 'open') throw new Error('La ruleta no está abierta para apuestas');

    let totalAmount = 0;

    for (const bet of bets) {
        const { playerId, type, value, amount } = bet;

        if (amount <= 0 || amount > 10000) throw new Error('Cantidad inválida');
        if (type === 'number' && (value < 0 || value > 36)) throw new Error('Número inválido');
        if (type === 'color' && !['red', 'black'].includes(value)) throw new Error('Color inválido');

        const player = await PlayerModel.findById(playerId);
        if (!player) throw new Error('Jugador no encontrado');
        if (player.account < amount) throw new Error('Saldo insuficiente');

        player.bets = player.bets || [];  
        player.bets.push({
            type,
            value,
            amount,
            date: new Date()
        });

        player.account -= amount;

        await player.save();

        if (type === 'number') {
            roulette.numbers.push({ value, playerId, amount });
        } else if (type === 'color') {
            roulette.colors.push({ value, playerId, amount });
        }

        totalAmount += amount; 
    }

    roulette.beat = (roulette.beat || 0) + totalAmount;
    await roulette.save();

    return {
        mensaje: 'Apuestas realizadas con éxito',
        apuestas: bets
    };
};


const dbCloseRoulette = async (rouletteId) => {
    const roulette = await RouletteModel.findById(rouletteId);

    if (!roulette) throw new Error('Ruleta no encontrada');
    if (roulette.status === 'close') throw new Error('La ruleta ya está cerrada');

    const winningNumber = Math.floor(Math.random() * 37); 
    const winningColor = winningNumber % 2 === 0 ? 'red' : 'black'; 

    const results = {
        winningNumber,
        winningColor,
        bets: [],
    };

    const bets = roulette.numbers.map((bet) => ({
        type: 'number',
        value: bet.value,
        playerId: bet.playerId,
        amount: bet.amount,
    })).concat(
        roulette.colors.map((bet) => ({
            type: 'color',
            value: bet.value,
            playerId: bet.playerId,
            amount: bet.amount,
        }))
    );

    for (const bet of bets) {
        let result = 'perdida';
        let winnings = 0;

        if (bet.type === 'number' && bet.value === winningNumber) {
            result = 'ganada';
            winnings = bet.amount * 5;
        } else if (bet.type === 'color' && bet.value === winningColor) {
            result = 'ganada';
            winnings = bet.amount * 1.8;
        }

        results.bets.push({
            bet,
            result,
            winnings,
        });

        if (result === 'ganada') {
            const player = await PlayerModel.findById(bet.playerId);
            if (!player) throw new Error('Jugador no encontrado');

            player.account += winnings; 
            await player.save();
        }
    }

    roulette.status = 'close';
    await roulette.save();

    return results; 
};


const dbUpdateRoulette = async (id, updatedRoulette) => {
        
    return await RouletteModel.findOneAndUpdate(
        { _id: id },
        updatedRoulette,
        { new: true }
    );
}

const dbDeleteRoulette = async (id) => {
    return await RouletteModel.findByIdAndDelete(id);
}

module.exports = {
    dbCloseRoulette,
    dbCreateRoulette,
    dbGetRoulette,
    dbGetRouletteById,
    dbUpdateRoulette,
    dbDeleteRoulette,
    dbOpenRoulette,
    dbRouletteBet
    
};
