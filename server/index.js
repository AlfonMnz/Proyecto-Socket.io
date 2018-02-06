let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
let socketIO = require('socket.io');
let io = socketIO(server);
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('new_user', function (par) {
    console.log(par)
  })


});
server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
