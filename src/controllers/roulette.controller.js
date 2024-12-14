const { dbCreateRoulette, dbGetRoulette, dbGetRouletteById, dbUpdateRoulette, dbDeleteRoulette, dbOpenRoulette, dbRouletteBet, dbCloseRoulette,  } = require("../services/roulette.service");



async function createRoulette( req, res ) {

    try {  
        const data = await dbCreateRoulette();
        res.status( 201 ).json({
            ok: true,
            data           
        });        
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al crear una Ruleta'
        })
    }

}

async function getRoulette(req, res) {
    try {
        const data = await dbGetRoulette();
        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener todos las Ruletas'
        });
    }
}


async function getRouletteById( req, res ) {
    const rouletteId = req.params.id;

    try {
        const data = await dbGetRouletteById( rouletteId );
        if( ! data ) {
            res.status( 404 ).json({
                ok: false,
                msg: 'Ruleta no encontrado'
            });
        } 

        res.status( 200 ).json({
            ok: true,
            data
        });
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener un Ruleta por ID'
        })  
    }

}


async function updateRoulettePatch( req, res ) {
    const RouletteId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateRoulette( RouletteId, inputData );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al actualizar un Ruleta por ID'
        })   
    }
}

async function updateRouletteStatusPatch(req, res) {
    const RouletteId = req.params.id;

    try {
        const data = await dbOpenRoulette(RouletteId); 
        res.status(200).json({
            ok: true,
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al abria la ruleta",
        });
    }
}

async function placeBet(req, res) {
    const rouletteId = req.params.id;
    const bets = req.body.bets; 
    try {
        if (!Array.isArray(bets)) {
            throw new Error('El campo "bets" debe ser un array');
        }

        const result = await dbRouletteBet(rouletteId, bets);
        res.status(200).json({
            ok: true,
            mensaje: result.mensaje,
            apuestas: result.apuestas  
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: error.message
        });
    }
}



async function closeRoulette(req, res) {
    const rouletteId = req.params.id;

    try {
        const result = await dbCloseRoulette(rouletteId);

        res.status(200).json({
            ok: true,
            msg: 'Ruleta cerrada exitosamente',
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
}


async function deleteRoulette( req, res ) {
    const RouletteId = req.params.id;
    try {
        const data = await dbDeleteRoulette( RouletteId );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al eliminar una Ruleta por ID'
        })
    } 
}



module.exports = {
    createRoulette,
    getRoulette,
    getRouletteById,
    updateRoulettePatch,
    deleteRoulette,
    updateRouletteStatusPatch,
    placeBet,
    closeRoulette
}