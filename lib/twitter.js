var Twit = require('twit');

var T = new Twit({
  consumer_key: process.env.LR_CONSUMER_KEY,
  consumer_secret: process.env.LR_CONSUMER_SECRET,
  access_token: process.env.LR_ACCESS_TOKEN,
  access_token_secret: process.env.LR_TOKEN_SECRET
})

exports.postTweet = function(url, title, callback) {
  var status = title + ' - ' + url;
  T.post('statuses/update', { status: status }, function(err, data, response) {
    console.log(err);
    callback(err, data, response);
  });
};
