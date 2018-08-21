const express = require('express')
const app = express()
const socket = require('socket.io')

app.set('port', process.env.PORT || 3000)

// app.get('/', (req, res) => res.send('<h1>Hola socket</h1>'))

const io = socket.listen(app.listen(app.get('port'), () => console.log('Serving on port: ', app.get('port'))))

io.on('connection', (socket) => {
    console.log(`Nueva conexion: ${socket.id}`)

    socket.on('conf:message', (data) => {
        io.sockets.emit('conf:message', data)
        console.log(data)
        io.sockets.emit('conf:time', 'domingo')
    })
})