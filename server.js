

var express = require('express');

var app = express();

app.use(express.static(__dirname + '/webcontent'));

var port = process.env.PORT || 8080;

var io  = require('socket.io').listen(app.listen(port));



//Handel connections
io.sockets.on('connection', function (socket) {
	console.log("New user connected:", socket.id);
	io.emit('clients', io.engine.clientsCount);
	
	socket.on('disconnect', function () {
		console.log("User disconnected:", socket.id);
		socket.broadcast.emit('clients', io.engine.clientsCount);
	});

	socket.on('d', function (data) {
		data["sid"] = socket.id;
		//console.log(data["a"]);
		socket.broadcast.emit('d', data); //Send to all but the sender
		//io.emit("d", data); //Send to all clients (4 debugging)
	});
});