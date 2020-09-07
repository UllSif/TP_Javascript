const mongoose = require('mongoose');

var TweetSchema = mongoose.Schema({
    user: {
        name: String,
        location: String,
        profile_image_url: String,
    },
        created_at: String,
        id: Number,
        text: String,
        entities: Array,
        geo: String,
        coordinates: String,
        place: String,
})

const MyTweet = mongoose.model('myTweet', TweetSchema);

module.exports = MyTweet;
