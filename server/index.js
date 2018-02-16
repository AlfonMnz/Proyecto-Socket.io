let express = require('express');
let app = express();
var path = require('path');

let http = require('http');
let server = http.Server(app);
app.use(express.static(path.join(__dirname, 'public')));
let socketIO = require('socket.io');
let io = socketIO(server);
let array_users = [];
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  socket.username = '';
  console.log('user connected');
  socket.on('new_user', function (par) {
    console.log(array_users);
    if (array_users.includes(par.usuario)) {
      socket.emit('error_new_user', 'error');
      console.log('error')

    }
    else {
      console.log('correct');

      array_users.push(par.usuario);
      socket.emit('usuario_correcto', {
        msg: 'correct',
        user: par.usuario,
        usuarios_disponibles: array_users,
        status: false
      });
      socket.username = par.usuario;
      socket.status = false;
      io.emit('ha llegado un nuevo usuario', {
        usuarios_disponibles: array_users,
        msg: "Se ha conectado el usuario " + par.usuario
      })
    }

  });
  socket.on('new_message', function (msg) {
    io.emit('new_message', msg.usuario + ":" + msg.msg)
  });
  socket.on('turno', function (data) {
    io.emit('turno', data)
  });
  socket.on('disconnect', function (data) {
    console.log("se ha desconectado el usuario");
    let pos = array_users.indexOf(socket.username);
    console.log(array_users);
    console.log(array_users[pos]);
    array_users.splice(pos, 1);
    console.log(array_users);
    io.emit('desconexion', {
      msg: "se has desconectado el usuario " + socket.username,
      usuarios_disponibles: array_users
    })
  });
  socket.on('usuario_listo', function (data) {
    socket.status = true;
    socket.prueba = socket.id;
    socket.broadcast.emit('usuario_listo', {
      msg: "el usuario " + socket.username + " está listo para la batalla",
      nombre_usuario_listo: socket.username
    });
    socket.emit('prueba', socket.status)
  });
  socket.on('comprobar_si_esta_logueado', function () {
    console.log('comprobando si esta logueado', socket.username)
    if (socket.username == '') {
      socket.emit('no_esta_logueado', "hola")

    }
  });
  socket.on('otro_usuario_listo', function (data) {

  })

});


server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
