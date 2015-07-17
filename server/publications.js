Meteor.publish('system', function() {
  return System.find();
});

Meteor.publish('sections', function() {
  return Sections.find();
});

Meteor.publish('users', function() {
  return Meteor.users.find();
})
Meteor.publish(null, function() {
  return Meteor.users.find({_id: this.userId}, {fields: {admin: 1}});
});

Meteor.publish('forums', function() {
  return Forums.find();
});

Meteor.publish('threads', function() {
  return Threads.find();
});

Meteor.publish('posts', function() {
  return Posts.find();
})
