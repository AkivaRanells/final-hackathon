const express = require('express');
const app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(8080, function(){
    console.log('running');
})