Messages = new Mongo.Collection('messages');

Meteor.methods({
  messageInsert: function(messageProperties) {
    var user = Meteor.user();
    var date = new Date();
    if(user === undefined) {
      throw new Meteor.Error('Must be admin.');
    }

    check(messageProperties, {
      title: String,
      content: String,
      recipient: String
    });

    var message = _.extend(messageProperties, {
      userId: user._id,
      date: date
    });

    var messageId = Messages.insert(message);
  }
});
