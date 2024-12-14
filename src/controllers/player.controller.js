const { dbCreatePlayer, dbGetPlayer, dbGetPlayerById, dbUpdatePlayer, dbDeletePlayer } = require("../services/player.service");



async function createPlayer( req, res ) {
    const inputData = req.body;

    try {  
        const data = await dbCreatePlayer(inputData);
        res.status( 201 ).json({
            ok: true,
            data           
        });        
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al crear un jugador'
        })
    }

}

async function getPlayer(req, res) {
    try {
        const data = await dbGetPlayer();
        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener todos los jugadores'
        });
    }
}


async function getPlayerById( req, res ) {
    const playerId = req.params.id;

    try {
        const data = await dbGetPlayerById( playerId );
        if( ! data ) {
            res.status( 404 ).json({
                ok: false,
                msg: 'Jugador no encontrado'
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


async function updatePlayerPatch( req, res ) {
    const PlayerId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdatePlayer( PlayerId, inputData );

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

async function deletePlayer( req, res ) {
    const PlayerId = req.params.id;
    try {
        const data = await dbDeletePlayer( PlayerId );

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
    createPlayer,
    getPlayer,
    getPlayerById,
    updatePlayerPatch,
    deletePlayer
}