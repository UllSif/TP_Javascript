const express = require('express');
const app = express();
const mongoose = require('mongoose');

const MyTweet = require('./server/models/mytweets');

var http = require('http').createServer(app);
var io = require('socket.io')(http);

// DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/mytweets', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connecting error'));
db.once('open', function () {
    // we're connected!
    console.log('DB connected on port 27017');
});

// Connexion à twitter
const Twit = require('twit');
var T = new Twit({
    consumer_key: 'mPX22oQC6ACmDjUYAsqC3MOjL',
    consumer_secret: 'XaVNyDqQU4ZBfINA3ykTAlEQKBh2IIQb1T5gHliodbngRhH5rn',
    access_token: '1283450833330470914-vSKQOIA6eKZS4CNIBj2CdCvGLh6GPB',
    access_token_secret: '9s6TdkYHzV9zjDrlZ4MbjEn3f8JyzwxIWTxGbM1G1A1Vv'
})

// Récupération des tweets avec les hashtag #javascript et #iot
var stream = T.stream('statuses/filter', {track: ['#javascript', '#iot']})

// Puis on emit pour pouvoir les afficher dans tweets.js
stream.on('tweet', function (tweet) {
    // console.log(tweet)
    io.emit('tweet', {'tweet': tweet});
})


// Récupération du dernier tweet de mon compte
const getMyTweet = new Promise((resolve, reject) => {
    T.get('https://api.twitter.com/1.1/users/show.json', {user_id: "1283450833330471000", screen_name: "sif_ull"})
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            console.log(error);
        });
});

// Ajout du tweet dans la db
getMyTweet.then((value) => {
    console.log(value);

    var toSave = new MyTweet(value)
    toSave.save().then(function (newTweet) {
        console.log('Object saved')
    })
})


// CREATE APP CONF
app.use('/lib', express.static(__dirname + '/client/static/'));

// CREATE ROUTES API
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/static/index.html');
});

app.get('/tweets', function (req, res) {
    res.sendFile(__dirname + '/client/static/tweets.html')
})


// handle socket events
io.on('connection', (socket) => {
    console.log('a user connected');
});

// START server
http.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
