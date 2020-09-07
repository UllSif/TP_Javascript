const mongoose = require('mongoose');
const MyTweet = require('../../server/models/mytweets');
const Twit = require('twit');
const Key = require('./APIKeys.js');
var T = new Twit({
    consumer_key: Key.consumer_key,
    consumer_secret: Key.consumer_secret,
    access_token: Key.access_token,
    access_token_secret: Key.access_token_secret
})


mongoose.connect('mongodb://localhost:27017/mytweets', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connecting error'));
db.once('open', function () {
    // we're connected!
    console.log('DB connected on port 27017');
});

// Récupération de mes tweets
const getMyTweet = new Promise((resolve, reject) => {
    T.get('statuses/user_timeline', {screen_name: 'sif_ull', count: 50})
        .then(response => {
            resolve(response.data)
            console.log(response.data)
        })
        .catch(err => {
            console.log(err);
        })
})

// Ajout de chaque tweet dans la db
getMyTweet.then((value) => {
    // console.log(value);
    value.forEach(function (tweet) {
        var toSave = new MyTweet(tweet)
        toSave.save().then(function () {
            console.log('Object saved with id : ' + toSave.id)
        })
    })
})
