let express = require('express');
let app = express();
var path = require('path');

let http = require('http');
let server = http.Server(app);

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function (req, res) {
  res.sendfile(path.join(__dirname, 'public', 'index.html'));
});

let socketIO = require('socket.io');
let io = socketIO(server);
let array_users = [];
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  socket.username = '';
  socket.usuario1_figura = 'x';
  socket.usuario2_figura = 'o';
  socket.usuario1_nombre = '';
  socket.usuario2_nombre = '';
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
    socket.emit('not_turn', false)
    socket.broadcast.emit('your_turn', true)
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
  socket.on('comprobar_si_esta_logueado', function () {
    console.log('comprobando si esta logueado', socket.username);
    if (socket.username == '') {
      socket.emit('no_esta_logueado', "hola")

    }
  });

  socket.on('el_usuario1_esta_listo', function (data) {
    socket.status = true;
    socket.usuario1_nombre = socket.username;
    socket.broadcast.emit('el_usuario1_esta_listo', socket.username)
  });
  socket.on('el_usuario2_esta_listo', function (data) {
    socket.usuario1_nombre = data.name1;
    socket.usuario2_nombre = data.name2;
    socket.broadcast.emit('el_usuario2_esta_listo', data)
  });
  socket.on('iniciar_partida', function (data) {
    console.log("usuario1:", socket.usuario1_nombre)
    console.log("usuario2:", socket.usuario2_nombre)
    io.emit('asignando_figuras', socket.usuario1_nombre)

  })
  socket.on('ganador', function (data) {
    io.emit('ganador', data)
  })
  /*  socket.on('otro_usuario_listo', function (data) {
      if (data == socket.username){
        socket.emit('comenzar_partida','lets go')
        io.emit('otro_usuario_listo','definitivo')

      }

    })*/

});


server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
