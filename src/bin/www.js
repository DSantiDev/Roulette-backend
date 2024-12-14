const app = require('./../index')
const http = require('http')
const PORT = process.env.PORT

app.set('port', PORT)

const server = http.createServer(app)
server.listen(PORT)
server.on('error', ( error ) => {
    console.log('Error conectando al nuevo server', error)
})
server.on('listening', () => {
    console.log('Server conectado')
})