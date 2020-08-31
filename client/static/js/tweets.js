const socket = io();
var tweetArray = [];
var index = 0;

var mainContent = document.getElementById('main-content');

socket.on('tweet', function (tweet) {
    console.log(tweet.tweet);
    var tweetbody = {
        'text': tweet.tweet.text,
    }
    try {
    } catch (err) {
    }
    tweetArray.unshift(tweetbody);
})


socket.on('allTweet', function (tweet) {
    console.log(tweet);
    tweetArray = tweet;
    loopArray();
})


function loopArray() {
    if (tweetArray.length > index) {
        var currentTweet = tweetArray[index];

        var p = document.createElement('p');
        p.innerHTML = currentTweet.text

        mainContent.appendChild(p);
        index ++
    }


}
