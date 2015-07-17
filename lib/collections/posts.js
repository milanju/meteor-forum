Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postProperties) {
    var user = Meteor.user();
    if(user === undefined) {
      throw new Meteor.Error('Must be logged in.');
    }
    check(postProperties, {
      content: String,
      threadId: String
    });

    var post = _.extend(postProperties, {
      userId: user._id,
      root: false,
      date: new Date()
    });

    var postId = Posts.insert(post);
    if(postId) {
      var thread = Threads.findOne({_id: postProperties.threadId});
      var forumId = thread.forumId;
      Threads.update(thread, {$inc: {postCount: 1}});
      Forums.update({_id: forumId}, {$inc: {postCount: 1}});
    }
  },
  postUpdate: function(_id, postProperties) {
    var user = Meteor.user();
    var post = Posts.findOne({_id: _id});
    if(user._id != post.userId && user.admin != true) {
      throw new Meteor.Error('You may only edit your own posts.');
    }
    check(postProperties, {
      content: String
    });
    Posts.update({_id: _id}, {$set: postProperties});
  },
  postRemove: function(_id) {
    var user = Meteor.user();
    if(user.admin != true) {
      throw new Meteor.Error('Must be admin.');
    }
    var post = Posts.findOne({_id: _id});
    var thread = Threads.findOne({_id: post.threadId});
    var postId = Posts.remove(post);
    if(postId) {
      Threads.update(thread, {$dec: {postCount: 1}});
      Forums.update({_id: thread.forumId}, {$dec: {postCount: 1}});
    }
  }
});
