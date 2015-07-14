Meteor.publish('system', function() {
  return System.find();
});

Meteor.publish('sections', function() {
  return Sections.find();
});
Meteor.publish('userData', function() {
  return Meteor.users().find({_id: this.userId}, {fields: {admin: 1}});
});
