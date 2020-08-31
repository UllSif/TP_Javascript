const express = require('express');
const app = express();
const mongoose = require('mongoose');

var http = require('http').createServer(app);
var io = require('socket.io')(http);
// const tweetsRoute = require('./client/static/js/tweets')




// DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/mytweets', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connecting error'));
db.once('open', function () {
    // we're connected!
    console.log('DB connected on port 27017');
});


// CREATE APP CONF
app.use('/lib', express.static(__dirname + '/client/static/'));

// CREATE ROUTES API
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/static/index.html');
});

app.get('/tweets', function (req, res) {
    res.sendFile(__dirname + '/client/static/tweets.html')
})


const Twit = require('twit');
var T = new Twit({
    consumer_key: 'mPX22oQC6ACmDjUYAsqC3MOjL',
    consumer_secret: 'XaVNyDqQU4ZBfINA3ykTAlEQKBh2IIQb1T5gHliodbngRhH5rn',
    access_token: '1283450833330470914-vSKQOIA6eKZS4CNIBj2CdCvGLh6GPB',
    access_token_secret: '9s6TdkYHzV9zjDrlZ4MbjEn3f8JyzwxIWTxGbM1G1A1Vv'
})

// let stream = T.stream('statuses/filter', {track: '#javascript'} && {track: '#iot'});
// stream.on('tweet', function (tweet) {
//     // console.log('tweet', {'tweet': tweet.tweet})
//     io.emit('tweet', {'tweet': tweet.tweet})
// });

io.on('connection', function(socket) {

    T.get('search/tweets', { q: '#coding', count: 10 }, function(err, data, response) {
        var tweetArray=[];
        for (let index = 0; index < data.statuses.length; index++) {
            const tweet = data.statuses[index];
            var tweetbody = {
                'text': tweet.text,
                'userScreenName': "@" + tweet.user.screen_name,
                'userImage': tweet.user.profile_image_url_https,
                'userDescription': tweet.user.description,
            }
            try {
                if(tweet.entities.media[0].media_url_https) {
                    tweetbody['image'] = tweet.entities.media[0].media_url_https;
                }
            } catch(err) { }
            tweetArray.push(tweetbody);
        }
        io.emit('allTweet',tweetArray)
    })

    var stream = T.stream('statuses/filter', {track: '#javascript'} && {track: '#iot'})

    stream.on('tweet', function (tweet) {
        io.emit('tweet',{ 'tweet': tweet });
    })
});


// handle socket events
io.on('connection', (socket) => {
    console.log('a user connected');
});

// START server
http.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
