var _ = require('lodash');
var request = require('request');

exports.getPosts = function(sub, callback) {
  request('http://www.reddit.com/r/' + sub + '.json?limit=3',
    function(error, response, body) {
      body = JSON.parse(body);
      var posts = []
      _(body.data.children).forEach(function(post) {
        var post = post.data;
        posts.push({title: post.title, url: post.url, name: post.name});
      });
      return callback(error, posts);
    }
  );
}
