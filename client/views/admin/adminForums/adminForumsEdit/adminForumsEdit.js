Template.adminForumsEdit.helpers({
  sections: function() {
    return Sections.find({}, {sort: {position: 1}});
  },
  currentSection: function(id) {
    if(this._id === id) return true;
    else return false;
  },
  forum: function() {
    return Forums.findOne();
  }
});

Template.adminForumsEdit.events({
  'submit #forum-edit-form': function(event) {
    var title = event.target.title.value;
    var description = event.target.description.value;
    var sectionId = Sections.findOne({title: event.target.sectionSelect.value})._id;
    if(title != "" && description != "" && sectionId != "") {
      Meteor.call("forumUpdate", this._id, {
        title: title,
        description: description,
        sectionId: sectionId
      });
      Router.go('/admin/forums');
    }
    return false;
  }
});
