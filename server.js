const express = require('express');

const socket = require('socket.io');
const app = express();
let bodyParser = require('body-parser');
var mongoose = require('mongoose');
let { User } = require('./models/user-model');
const server = require('http').createServer(app);
const Clarifai = require('clarifai');
const io = socket(server);
// var server = require('http').createServer(app);
//urgent todo change port 8080 to heroku port




mongoose.connect('mongodb://localhost/users', function () {
  console.log("DB connection established!!!");
})

const vision = require ('./apikey.js')



app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
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
  User.find().exec(function (err, users) {
    if (err) {
      console.log(`couldn't return users: ${err}`);
    }
    res.send(users);
  });
});

app.get('/users/:userName', (req, res, err) => {
  if (err) {
    console.log(err);
  }
  User.find({"userName":req.params.userName}).exec(function (err, user) {
    if (err) {
      console.log(`couldn't return users: ${err}`);
    }
    res.send(user);
  });
});

app.get('/image', (req, res, err) => {
  vision.models.predict(Clarifai.GENERAL_MODEL, req.query.str).then(
    function (response) {
      res.send(response.outputs[0].data);
    },
    function (err) {
      console.error(err);
    }
  )
})

// vision.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
//   function(response) {
//     console.log(response.outputs[0].data);
//   },
//   function(err) {
//     console.error(err);
//   }
// )

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

server.listen(8080, function () {
  console.log('server running on port 8080')
});
let userCounter = 0 ;
let startTime = Date.now();
io.on('connection', function (socket) {
  userCounter++;
  // console.log(userCounter);
  let timerStatus = true;
  let timer = {timerStatus:timerStatus, startTime:startTime};
  socket.emit("userCounter", userCounter);
  socket.emit("timer", timer );
  socket.on('gameBegan', function(time){
    startTime=time.startTime
    io.emit('gameBegan', time);
  })
  // console.log(socket.id)
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
    // console.log(msg);
  });
});