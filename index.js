// Dead simple HTTP server

var http =  require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic('public', {'index': ['index.html', 'index.htm']});

var server = http.createServer(function(req, res){
  var done = finalhandler(req, res);
  serve(req, res, done);
});

// Socket implementation and demo

var counter = 0;

var io = require('socket.io')(server); // Wrap the server in socket

io.on('connection', function(socket){
  socket.emit('welcome', { message: 'Welcome!', id: socket.id, counter: counter });

  socket.on('clicked', onClicked);
  socket.on('disconnect', onDisconnect);

  function onClicked(data) {
    console.log('onClicked', data);
    counter++;
    io.sockets.emit('update', { counter: counter });
  }

  function onDisconnect() {
    console.log('onDisconnect', arguments);
  }
});

server.listen(8080);