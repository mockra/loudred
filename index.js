var Reddit = require('./lib/reddit');
var Twitter = require('./lib/twitter');
var Post = require('./lib/post');
var _ = require('lodash');
var mongoose = require('mongoose');

mongoose.connect(process.env.LR_MONGO);
mongoose.connection.on('error', function() {
  console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});

var subreddits = [
  { name: 'emberjs', limit: 1 },
  { name: 'elixir', limit: 1 },
  { name: 'elm', limit: 1 },
  { name: 'games', limit: 1 },
  { name: 'javascript', limit: 2 },
  { name: 'leagueoflegends', limit: 2 },
  { name: 'node', limit: 2 },
  { name: 'programming', limit: 1 },
  { name: 'ps4', limit: 1 },
  { name: 'rails', limit: 1 },
  { name: 'reactjs', limit: 1 },
  { name: 'ruby', limit: 1 },
  { name: 'streetfighter', limit: 1 },
  { name: 'webdev', limit: 1 }
]

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

function postSub(sub, limit) {
  Reddit.getPosts(sub, limit, function(error, posts) {
    posts = _.uniq(posts);
    _(posts).forEach(function(post) {
      postTweet(sub, post);
    });
  });
}

function postTweets() {
  _(subreddits).forEach(function(sub) {
    postSub(sub.name, sub.limit);
  });
}

setInterval(postTweets, 5 * 60 * 1000);
