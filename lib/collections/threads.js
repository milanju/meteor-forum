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
      title: title,
      postCount: 1,
      viewCount: 0,
      lastPost: "none",
      date: new Date()
    });
    var postId = Posts.insert({
      forumId: forumId,
      threadId: threadId,
      userId: userId,
      content: content,
      root: true,
      date: new Date()
    });
    if(threadId && postId) {
      var lastPostTitle = Threads.findOne({_id: threadId}).title;
      Forums.update(
        {_id: forumId},
        {
          $inc: {threadCount: 1, postCount: 1},
          $set: {
            lastPost: {
              id: threadId,
              title: lastPostTitle,
              userId: userId,
              username: user.username
            }
          }
        }
      );
      return threadId;
    }
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
    var thread = Threads.findOne({_id: _id});
    var forumId = thread.forumId;
    var postCount = thread.postCount;
    if(Threads.remove(thread)){
      Forums.update({_id: forumId}, {$dec: {postCount: postCount}});
    }
  }
});
