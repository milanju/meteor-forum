Template.adminForumsNew.helpers({
  sections: function() {
    return Sections.find({}, {sort: {position: 1}});
  }
});

Template.adminForumsNew.events({
  'submit #new-forum-form': function(event) {
    var title = event.target.newForumTitle.value;
    var description = event.target.newForumDescription.value;
    var sectionId = Sections.findOne({title: event.target.newForumSelect.value})._id;

    if(title != "" && description != "" && sectionId != "") {
      Meteor.call('forumInsert', {title: title, description: description, sectionId: sectionId});
    }

    event.target.newForumTitle.value = "";
    event.target.newForumDescription.value = "";
    return false;
  }
})
