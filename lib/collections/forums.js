Forums = new Mongo.Collection('forums');

Meteor.methods({
  forumInsert: function(forumProperties) {
    var user = Meteor.user();
    if(user.admin != true) {
      throw new Meteor.Error('Must be admin.');
    }
    check(forumProperties, {
      title: String,
      description: String,
      sectionId: String
    });

    // Calculate Forum Position
    var position;
    if(Forums.findOne({sectionId: forumProperties.sectionId}) === undefined) {
      position = 0;
    } else {
      position = Forums.findOne({sectionId: forumProperties.sectionId}, {sort: {position: -1}}).position + 1;
    }

    var forum = _.extend(forumProperties, {
      position: position,
      threadCount: 0,
      postCount: 0,
      lastPost: "none"
    });

    Forums.insert(forum);
  },
  forumUpdate: function(_id, forumProperties) {
    var user = Meteor.user();
    if(user.admin != true) {
      throw new Meteor.Error('Must be admin.');
    }
    // if forum is moved between sections, get new position
    if(Forums.findOne({_id: _id}).sectionId != forumProperties.sectionId) {
      forumProperties.position = Forums.findOne({sectionId: forumProperties.sectionId}, {sort: {position: -1}}).position + 1
    }
    Forums.update({_id: _id}, {$set: forumProperties});
  },
  forumRemove: function(_id) {
    var user = Meteor.user();
    if(user.admin != true) {
      throw new Meteor.Error('Must be admin.');
    }
    Forums.remove(_id);
  }
});
