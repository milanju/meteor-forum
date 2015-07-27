Posts = new Mongo.Collection('posts');

// After new post adjust post counts
Posts.after.insert(function(userId, doc) {
  var user = Meteor.users.findOne({_id: userId});

  Threads.update({_id: doc.threadId}, {
    $inc: {postCount: 1},
    $set: {lastPostDate: doc.date,lastPostAuthor: user.username}
  });
  Forums.update({_id: doc.forumId}, {
    $inc: {postCount: 1},
    $set: {
      lastPostDate: doc.date,
      lastPostAuthor: user.username,
      lastPostThreadId: doc.threadId,
      lastPostThreadTitle: Threads.findOne({_id: doc.threadId}).title
    }
  });

  Meteor.users.update(user, {$inc: {posts: 1}});
});

// After post is removed adjust post counts
Posts.after.remove(function (userId, doc) {
  var forumLastPost = Posts.findOne({forumId: doc.forumId}, {sort: {date: -1}});
  var threadLastPost = Posts.findOne({threadId: doc.threadId}, {sort: {date: -1}});
  if(threadLastPost) {
    Threads.update({_id: doc.threadId}, {$inc: {postCount: -1},
      $set: {
        lastPostDate: threadLastPost.date,
        lastPostAuthor: Meteor.users.findOne({_id: threadLastPost.userId}).username,
      }
    });
  }
  if(forumLastPost) {
    Forums.update({_id: doc.forumId}, {$inc: {postCount: -1},
      $set: {
        lastPostDate: forumLastPost.date,
        lastPostAuthor: Meteor.users.findOne({_id: forumLastPost.userId}).username,
        lastPostThreadId: forumLastPost.threadId,
        lastPostThreadTitle: Threads.findOne({_id: forumLastPost.threadId}).title
      }
    });
  } else {
    Forums.update({_id: doc.forumId}, {$inc: {postCount: -1},
      $set: {
        lastPostDate: undefined,
        lastPostAuthor: undefined,
        lastPostThreadId: undefined,
        lastPostThreadTitle: undefined
      }
    });
  }
  Meteor.users.update({_id: doc.userId}, {$inc: {posts: -1}});
});

Meteor.methods({
  postInsert: function(postProperties) {
    var user = Meteor.user();
    var date = new Date();
    if(user === undefined) {
      throw new Meteor.Error('Must be logged in.');
    }
    check(postProperties, {
      content: String,
      threadId: String
    });
    var thread = Threads.findOne({_id: postProperties.threadId});
    var post = _.extend(postProperties, {
      userId: user._id,
      forumId: thread.forumId,
      root: false,
      date: date
    });

    Posts.insert(post);
  },
  postUpdate: function(_id, postProperties) {
    var user = Meteor.user();
    var post = Posts.findOne({_id: _id});
    if(user._id != post.userId && user.admin != true) {
      throw new Meteor.Error('You may only edit your own posts.');
    } else {
      check(postProperties, {
        content: String
      });
      Posts.update({_id: _id}, {$set: postProperties});
    }
  },
  postRemove: function(_id) {
    var user = Meteor.user();
    if(user.admin != true) {
      throw new Meteor.Error('Must be admin.');
    }
    var post = Posts.findOne({_id: _id});
    if(post.root === true) {
      throw new Meteor.Error('Cannot delete root post');
    } else {
      Posts.remove(post);
    }
  }
});
