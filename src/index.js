const express = require( 'express' );
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config()
const app = express();
const PORT = process.env.PORT;

const dbConection = require( './config/mongo.config.js' );

dbConection();

app.use(cors());
app.use( express.json() );              

app.use( '/api/roulette', require( './routes/roulette.routes' ) ); 
app.use( '/api/player', require( './routes/player.routes' ) ); 

module.exports = app