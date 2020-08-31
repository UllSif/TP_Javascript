const mongoose = require('mongoose');

// TODO: TweetSchema

var TweetSchema = mongoose.Schema({
    created_at: 'Mon Aug 31 13:55:49 +0000 2020',
    id: 1300432104187203600,
    id_str: '1300432104187203584',
    text: '#javascript test',
    source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
    truncated: false,
    in_reply_to_status_id: null,
    in_reply_to_status_id_str: null,
    in_reply_to_user_id: null,
    in_reply_to_user_id_str: null,
    in_reply_to_screen_name: null,
    user: {
        id: 1283450833330471000,
        id_str: '1283450833330470914',
        name: 'UllSif',
        screen_name: 'sif_ull',
        location: null,
        url: null,
        description: null,
        translator_type: 'none',
        protected: false,
        verified: false,
        followers_count: 0,
        friends_count: 0,
        listed_count: 0,
        favourites_count: 0,
        statuses_count: 1,
        created_at: 'Wed Jul 15 17:18:37 +0000 2020',
        utc_offset: null,
        time_zone: null,
        geo_enabled: true,
        lang: null,
        contributors_enabled: false,
        is_translator: false,
        profile_background_color: 'F5F8FA',
        profile_background_image_url: '',
        profile_background_image_url_https: '',
        profile_background_tile: false,
        profile_link_color: '1DA1F2',
        profile_sidebar_border_color: 'C0DEED',
        profile_sidebar_fill_color: 'DDEEF6',
        profile_text_color: '333333',
        profile_use_background_image: true,
        profile_image_url: 'http://pbs.twimg.com/profile_images/1300424672278872064/bCL9mIGC_normal.jpg',
        profile_image_url_https: 'https://pbs.twimg.com/profile_images/1300424672278872064/bCL9mIGC_normal.jpg',
        default_profile: true,
        default_profile_image: false,
        following: null,
        follow_request_sent: null,
        notifications: null
    },
    geo: null,
    coordinates: null,
    place: null,
    contributors: null,
    is_quote_status: false,
    quote_count: 0,
    reply_count: 0,
    retweet_count: 0,
    favorite_count: 0,
    entities: {hashtags: [[Object]], urls: [], user_mentions: [], symbols: []},
    favorited: false,
    retweeted: false,
    filter_level: 'low',
    lang: 'en',
    timestamp_ms: '1598882149155'

})

const tweet = mongoose.model('Tweet', TweetSchema);
