const mongoose = require( 'mongoose' );
mongoose.set("strictQuery", false);

async function dbConection() {
   
    try {
        await mongoose.connect( process.env.DB_URI, {} );     
        console.log( 'Base de datos inicializada correctamente' );
    } 
    catch ( error ) {
        console.error( error );
    }
    
}


module.exports = dbConection;       
