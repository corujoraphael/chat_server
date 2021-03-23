const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const bodyParser  = require('body-parser')
app.use(cors())
app.use(bodyParser.json({limit : "50mb"})); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit : "50mb", extended: true })); // support encoded bodies
const server = http.createServer(app)
const socket = require('socket.io')(server, {cors: {origin: "*"}})

server.listen(3001)

app.use(
    express.urlencoded({
        extended: true
    })
)

app.post('/emit-message', (req, res) => {
    if (req.body.key != 'Kw58Vxu1Xm')
        return res.send()

    const params = req.body
    const roomId = params.room_id
    const message = params.message
    delete params.key

    socket.to(roomId).emit('newMessage', message)
    res.send()
})

socket.on('connection', socket => {
    socket.on('joinRoom', data => socket.join(data.roomId))
})
