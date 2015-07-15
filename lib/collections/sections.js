Sections = new Mongo.Collection('sections');

Meteor.methods({
  sectionInsert: function(sectionProperties) {
    var user = Meteor.user();
    if(user.admin != true) {
      throw new Meteor.Error('Must be admin.');
    }
    check(sectionProperties, {
      title: String,
      description: String
    });

    // Calculate Section Position
    var position;
    if(Sections.findOne() === undefined) {
      position = 0;
    } else {
      position = Sections.findOne({}, {sort: {position: -1}}).position + 1;
    }

    var section = _.extend(sectionProperties, {
      position: position
    });

    Sections.insert(section);
  },
  sectionUpdate: function(_id, sectionProperties) {
    var user = Meteor.user();
    if(user.admin != true) {
      throw new Meteor.Error('Must be admin.');
    }
    Sections.update({_id: _id}, {$set: sectionProperties});
  },
  sectionRemove: function(_id) {
    var user = Meteor.user();
    if(user.admin != true) {
      throw new Meteor.Error('Must be admin.');
    }
    Sections.remove(_id);
  }
});
