const express = require('express');

const socket = require('socket.io');
const app = express();
let bodyParser = require('body-parser');
var mongoose = require('mongoose');
let { User } = require('./models/user-model');
const server = require('http').createServer(app);
const Clarifai = require('clarifai');
const io = socket(server);
const port = process.env.PORT || '8080';
let path = require ('path');
// var server = require('http').createServer(app);
//urgent todo change port 8080 to heroku port

if (app.get('env') === 'development') {
	require('dotenv').load();
	const cors = require('cors');
	app.use(cors());
}


mongoose.connect(process.env.CONNECTION_STRING ||'mongodb://localhost/users', function () {
  console.log("DB connection established!!!");
})

const vision = require('./apikey.js')



app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

//   next()
// })

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
  User.find({ "userName": req.params.userName }).exec(function (err, user) {
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
app.get('/reset', function (req, res) {
  userCounter = 0;
  startTime = null;
  firstTimer = false;
  tagsSent = false;
  res.send('Reset done')
})
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

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'build')));
	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
}

let tagsSent = false;

server.listen(port, function () {
  console.log('server running on port 8080')
});
let userCounter = 0;
let urlArray = [];
io.on('connection', function (socket) {
  userCounter++;
  // console.log(userCounter);
  let timerStatus = true;
  let firstTimer = false;
  let startTime;
  let timer;
  socket.emit("userCounter", userCounter);
  // socket.emit("timer", timer );
  socket.on('gameBegan', function (time) {
    if (!firstTimer) {
      startTime = Date.now();
      firstTimer = true;
    }
    timer = { timerStatus: timerStatus, startTime: startTime };
    // startTime=time.startTime
    io.emit('gameBegan', timer);
  })

  socket.on('sendTags', function (tagObject) {
    if (!tagsSent) {
      io.emit("sendTags", tagObject)
      tagsSent = true;
    }
  })
  socket.on("sendURL", function (url) {
    // console.log("url" + url)
    let objectToPush = {url:url, votes:0}
    urlArray.push(objectToPush)
    console.log(urlArray)
    io.emit("sendURL", urlArray)
  })
  // console.log(socket.id)
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
    // console.log(msg);
  });
});