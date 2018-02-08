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
      io.emit('error_new_user', 'El nombre de usuario está pillado')
      console.log('error')
    }
    else {
      console.log('correct')
      io.emit('usuario_correcto', "El usuario se ha registrado correctamente")
      array_users.push(par.usuario)
    }
  })
});


server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
