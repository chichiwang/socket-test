var socket = io();
var id;

var emitBtn = document.querySelector('.emit');
var receiveBlock = document.querySelector('.receive');


socket.on('welcome', function(data) {
    console.log('welcome', data);
    id = data.id;
    receiveBlock.innerHTML = data.counter; // Update the counter
});

socket.on('update', function(data) {
    console.log('update', data);
    receiveBlock.innerHTML = data.counter; // Update the counter
});

socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

emitBtn.addEventListener('click', onEmitClick);
function onEmitClick() {
  socket.emit('clicked', {id: id});
}