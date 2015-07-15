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
      root: false
    });

    Posts.insert(post);
  },
  postUpdate: function(_id, postProperties) {
    var user = Meteor.user();
    var post = Posts.findOne({_id: _id});
    if(user.id != post.userId && user.admin != true) {
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
    Posts.remove(_id);
  }
});
