var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(80, function(){
    console.log('server running on port 80')
});
// WARNING: app.listen(80) will NOT work here!

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/homepage/homepage.js');
// });

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

//     next()
// })

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.emit('news', { hello: 'world' }, console.log('hello'));
    socket.on('my other event', function (data) {
        console.log(data);
    });
});