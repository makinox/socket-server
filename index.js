const express = require('express')
const app = express()
const socket = require('socket.io')
const fs = require('fs')
let {info} = require('./db.json')
let {users} = require('./db.json')

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => res.send(info))

const io = socket.listen(app.listen(app.get('port'), () => console.log('Serving on port: ', app.get('port'))))

io.on('connection', (socket) => {
    console.log(`Nueva conexion: ${socket.id}`)
    io.sockets.emit('push:connection', info)

    socket.on('push:message', (data) => {
        info.push(data)
        io.sockets.emit('push:message', info[info.length -1])
    })

    socket.on('push:login', (data) => {
        console.log(data)
        users.push(data)
        console.log(users.length)
        io.sockets.emit('push:validate', users.length)
    })
})