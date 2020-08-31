const socket = io();

var mainContent = document.getElementById('main-content');

socket.on('tweet', function (tweet) {
    console.log(tweet.tweet);
    var tweetbody = {
        'text': tweet.tweet.text,
    }
    try {
    } catch (err) {
    }

    var p = document.createElement('p');
    p.innerHTML = tweetbody.text

    mainContent.appendChild(p);
})
