const express = require( 'express' );
const { createRoulette, getRoulette, getRouletteById, updateRoulettePatch, deleteRoulette, updateRouletteStatusPatch, placeBet, closeRoulette } = require('../controllers/roulette.controller');

const router = express.Router();

router.post( '/', createRoulette  );           
router.get( '/', getRoulette );                       
router.get( '/:id', getRouletteById );  
router.patch( '/:id/open',  updateRouletteStatusPatch); 
router.post('/:id/bet', placeBet);
router.patch('/:id/close', closeRoulette);
router.patch( '/:id',  updateRoulettePatch);                                            
router.delete( '/:id',  deleteRoulette );        



module.exports = router;