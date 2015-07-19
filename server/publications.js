Meteor.publish('system', function() {
  return System.find();
});

Meteor.publish('sections', function(params) {
  return Sections.find(params);
});

Meteor.publish('users', function() {
  return Meteor.users.find();
})
Meteor.publish(null, function() {
  return Meteor.users.find({_id: this.userId}, {fields: {
  }});
});

Meteor.publish('forums', function(params) {
  return Forums.find(params);
});

Meteor.publish('threads', function(params) {
  return Threads.find(params);
});

Meteor.publish('posts', function(params) {
  return Posts.find(params);
})
