const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(process.env.CONNECTION_STRING ||'mongodb://localhost/users');

let userSchema = new mongoose.Schema({
    userName: String,
    bestTagsTotalScoreHistory: Number,
    tags: Array
});

let User = mongoose.model('user', userSchema);

let akiva = new User({
    userName: "Akiva FullStack",
    bestTagsTotalScoreHistory: 255,
    tags: ['man', 'dog', 'candle']
})

let alex = new User({
    userName: "Alex FullStack",
    bestTagsTotalScoreHistory: 100500,
    tags: ['phone', 'leash', 'computer']
})

let gaia = new User({
    userName: "Gaia FullStack",
    bestTagsTotalScoreHistory: 999999910,
    tags: ['cloud', 'cat', 'window']
})

// akiva.save()
// alex.save()
// gaia.save()

// let query = User.find;
// User.find({}, function(err, user){
//     if(err)throw err;
//     console.log(user)
// })
// module.exports = User
module.exports = {
    User: User
  }