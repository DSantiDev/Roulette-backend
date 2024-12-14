const express = require( 'express' );
const { createPlayer, getPlayer, getPlayerById, updatePlayerPatch, deletePlayer } = require('../controllers/player.controller');

const router = express.Router();

router.post( '/', createPlayer  );           
router.get( '/', getPlayer );                       
router.get( '/:id', getPlayerById );                                             
router.patch( '/:id',  updatePlayerPatch); 
router.delete( '/:id',  deletePlayer );        



module.exports = router;