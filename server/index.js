let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
let socketIO = require('socket.io');
let io = socketIO(server);
let array_users = [];
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('new_user', function (par) {
    console.log(array_users);
    if (array_users.includes(par.usuario)) {
      socket.emit('error_new_user', 'error');
      console.log('error')
    }
    else {
      console.log('correct');
      console.log(socket.id);
      array_users.push(par.usuario);
      socket.emit('usuario_correcto', {msg: 'correct', user: par.usuario, usuarios_disponibles: array_users});

      io.emit('ha llegado un nuevo usuario', {usuarios_disponibles: array_users, usuario: par.usuario})
    }

  });
  socket.on('new_message', function (msg) {
    io.emit('new_message', msg.usuario + ":" + msg.msg)
  });
  socket.on('turno', function (data) {
    io.emit('turno', data)
  })

});


server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
