Threads = new Mongo.Collection('threads');
Threads.friendlySlugs('title');

// After new thread, adjust thread counts
Threads.after.insert(function(userId, doc) {
  Forums.update({_id: doc.forumId}, {$inc: {threadCount: 1}});
});

// After thread is removed, adjust thread counts
Threads.after.remove(function(userId, doc) {
  Forums.update({_id: doc.forumId}, {$inc: {threadCount: -1}});
});

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
    return Threads.findOne({_id: threadId}).slug;
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
    Posts.remove({threadId: _id});
    Threads.remove({_id: _id});
  },
  incThreadViewCount: function(_id) {
    var thread = Threads.findOne({_id: _id});
    if(thread) {
      Threads.update(thread, {$inc: {viewCount: 1}});
    }
  }
});
