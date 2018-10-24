const express = require('express');
var socket = require('socket.io');
const app = express();
let bodyParser = require('body-parser');
var mongoose = require('mongoose');
let {User} = require('./models/user-model');
// var server = require('http').createServer(app);
//urgent todo change port 8080 to heroku port

mongoose.connect('mongodb://localhost/users', function() {
  console.log("DB connection established!!!");
})

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  
    next()
  })

  app.get('/users', (req, res, err) => {
    let users;
    if (err) {
      console.log(err);
    }
    User.find().exec(function(err, users){
      if (err){
        console.log(`couldn't return users: ${err}`);
      }
      res.send(users);
    });
  });

app.post('/users', (req, res, err) => {
    if (err) {
      console.log(err);
    }
    let newUser = new User({
        userName: req.body.userName,
        bestTagsTotalScoreHistory: 0,
        tags: []
    });
    newUser.save((err, data) => {
        if (err) {
          console.log(err);
        }
        res.json(data);
      });
    });

const server = app.listen(8080, function(){
    console.log('server running on port 8080')
});
const io = socket(server)
io.on('connection', function (socket) {
  let seconds = 60;

  // to make things interesting, have it send every second
  const interval = setInterval(function () {
      seconds--;
      socket.emit("timer", seconds);
  }, 1000);

  socket.on("disconnect", function () {
      clearInterval(interval);
  });
  // console.log(socket.id)
    socket.on('chat message', function (msg) {
      // socket.emit('chat message', msg);
        console.log(msg);
    });
});