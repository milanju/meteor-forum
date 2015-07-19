Template.adminSectionsEdit.helpers({
  section: function() {
    return Sections.findOne();
  }
});

Template.adminSectionsEdit.events({
  'submit #section-edit-form': function(event) {
    var title = event.target.sectionEditTitle.value;
    var description = event.target.sectionEditDescription.value;
    if(title != "" && description != "") {
      Meteor.call("sectionUpdate", this._id, {title: title, description: description});
      Router.go('/admin/sections');
    }
    return false;
  }
});
