var Twit = require('twit');
var S = require('string');

var T = new Twit({
  consumer_key: process.env.LR_CONSUMER_KEY,
  consumer_secret: process.env.LR_CONSUMER_SECRET,
  access_token: process.env.LR_ACCESS_TOKEN,
  access_token_secret: process.env.LR_TOKEN_SECRET
})

exports.postTweet = function(sub, url, title, callback) {
  var title = S(title).truncate(80, '...').s
  var status = title + ' #' + sub  + ' - ' + url;
  T.post('statuses/update', { status: status }, function(err, data, response) {
    if (err)
      console.log(err);
    callback(err, data, response);
  });
};
