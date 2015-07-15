Threads = new Mongo.Collection('threads');

Meteor.methods({
  threadInsert: function(threadProperties) {
    var user = Meteor.user();
    if(user === undefined) {
      throw new Meteor.Error('Must be logged in.')
    }
    check(threadProperties, {
      forumId: String,
      title: String,
      content: String
    });

    var forumId = threadProperties.forumId;
    var userId = user._id;
    var title = threadProperties.title;
    var content = threadProperties.content;
    var threadId = Threads.insert({
      forumId: forumId,
      userId: userId,
      title: title
    });
    Posts.insert({
      forumId: forumId,
      threadId: threadId,
      userId: userId,
      content: content,
      root: true
    });
  },
  threadUpdate: function(_id, threadProperties) {
    var user = Meteor.user();
    if(user.admin != true) {
      throw new Meteor.Error('Must be admin.');
    }
    Threads.update({_id: _id}, {$set: threadProperties});
  },
  threadRemove: function(_id) {
    var user = Meteor.user();
    if(user.admin != true) {
      throw new Meteor.Error('Must be admin.');
    }
    Threads.remove(_id);
  }
});
