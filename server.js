const express = require('express');
const app = express();
const mongoose = require('mongoose');

const MyTweet = require('./server/models/mytweets');

const Key = require('./APIKeys');

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
    consumer_key: Key.consumer_key,
    consumer_secret: Key.consumer_secret,
    access_token: Key.access_token,
    access_token_secret: Key.access_token_secret
})

// Récupération des tweets avec les hashtag #javascript et #iot
var stream = T.stream('statuses/filter', {track: ['#javascript', '#iot']})

// Puis on emit pour pouvoir les afficher dans tweets.js
stream.on('tweet', function (tweet) {
    // console.log(tweet)
    io.emit('tweet', {'tweet': tweet});
})

// Récupérer mes tweets par mon ID
var streamMyTweet = T.stream('statuses/filter', {follow: ['1283450833330470914']})

// Enregistrement et Emit des tweets
streamMyTweet.on('tweet', function (tweet) {
    console.log(tweet.text);
    var toSave = new MyTweet(tweet)
    toSave.save().then(function() {
        console.log('Object saved with id : ' + toSave.id)
    })
    io.emit('mytweet', {'tweet' : tweet})
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

app.get('/api/mytweets', function (req, res) {
    MyTweet.find({}).exec(function (err, myTweetsList) {
        if (err) {
            console.log(err)
        }
        res.json(myTweetsList);
    })
})

// handle socket events
io.on('connection', (socket) => {
    console.log('a user connected');
});

// START server
http.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
