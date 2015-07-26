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
    var date = new Date();
    var threadId = Threads.insert({
      forumId: forumId,
      userId: userId,
      title: title,
      postCount: 0,
      viewCount: 0,
      lastPostDate: date,
      lastPostAuthor: user.username,
      date: date
    });
    Posts.insert({
      forumId: forumId,
      threadId: threadId,
      userId: userId,
      content: content,
      root: true,
      date: date
    });
    return threadId;
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
    var postCount = thread.postCount;
    Threads.remove(thread);
  },
  incThreadViewCount: function(_id) {
    var thread = Threads.findOne({_id: _id});
    if(thread) {
      Threads.update(thread, {$inc: {viewCount: 1}});
    }
  }
});
