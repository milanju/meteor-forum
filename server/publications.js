Meteor.publish('system', function() {
  return System.find();
});
