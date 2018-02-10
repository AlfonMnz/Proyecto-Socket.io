let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
let socketIO = require('socket.io');
let io = socketIO(server);
let array_users = []
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('new_user', function (par) {
    console.log(array_users)
    if (array_users.includes(par.usuario)) {
      socket.emit('error_new_user', 'error')
      console.log('error')
    }
    else {
      console.log('correct')
      console.log(socket.id)
      socket.emit('usuario_correcto', 'correct')
      array_users.push(par.usuario)
    }
  })
  socket.on('new_message', function (msg) {
    io.emit('new_message', msg.usuario + ":" + msg.contenido)
  })
  socket.on('turno', function (celda) {
    console.log(celda)
    io.emit('turno', celda)
  })
});


server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
