const mongoose = require('mongoose');


var TweetSchema = mongoose.Schema({
    name: String,
    location: String,
    status: {
        created_at: String,
        id: Number,
        text: String,
        entities: Array,
        geo: String,
        coordinates: String,
        place: String,
    },
    profile_image_url: String,
})

const MyTweet = mongoose.model('myTweet', TweetSchema);

module.exports = MyTweet;
