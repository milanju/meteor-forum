Sections = new Mongo.Collection('sections');
Meteor.methods({
  sectionInsert: function(sectionProperties) {
    var user = Meteor.user();
    if(user.admin != true) {
      throw new Meteor.Error('Must be admin.')
    }
    check(sectionProperties, {
      title: String,
      description: String,
    });

    var section = _.extend(sectionProperties, {

    });

    var sectionId = Sections.insert(section);
  }
});
