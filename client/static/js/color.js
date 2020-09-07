const socket = io();

var background = document.getElementById('background');

// Changer la couleur du background
socket.on('mytweet', function (tweet) {
    // On récupère le texte des tweets
    var tweetText = tweet.tweet.text;

    background.style.backgroundColor = tweetText;
})
