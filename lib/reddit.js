var _ = require('lodash');
var request = require('request');

exports.getPosts = function(sub, limit, callback) {
  request('http://www.reddit.com/r/' + sub + '.json?limit=' + limit,
    function(error, response, body) {
      body = JSON.parse(body);
      var posts = []
      _(body.data.children).forEach(function(post) {
        var post = post.data;
        if (post.num_comments > 1)
          posts.push({title: post.title, url: post.url, name: post.name});
      });
      return callback(error, posts);
    }
  );
}
