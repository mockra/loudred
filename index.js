var Reddit = require('./lib/reddit');
var Twitter = require('./lib/twitter');
var Post = require('./lib/post');
var _ = require('lodash');
var mongoose = require('mongoose');

mongoose.connect(process.env.LR_MONGO);
mongoose.connection.on('error', function() {
  console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});

var subreddits = ['globaloffensive', 'games', 'programming',
                  'node', 'ruby', 'rails', 'javascript', 'emberjs'];

function postTweet(sub, post) {
  Post.findOne({ name: post.name }, function(err, record) {
    if (!record) {
      var postRecord = new Post({
        url: post.url,
        title: post.title,
        name: post.name
      });

      postRecord.save(function(err) {
        Twitter.postTweet(sub, post.url, post.title,
          function(error, data, response) {}
        );
      });
    }
  });
}

function postSub(sub) {
  Reddit.getPosts(sub, function(error, posts) {
    posts = _.uniq(posts);
    _(posts).forEach(function(post) {
      postTweet(sub, post);
    });
  });
}

function postTweets() {
  _(subreddits).forEach(function(sub) {
    postSub(sub);
  });
}

setInterval(postTweets, 5 * 60 * 1000);
