Template.adminSectionsNew.events({
  'submit #new-section-form': function() {
    var title = event.target.newSectionTitle.value;
    var description = event.target.newSectionDescription.value;

    if(title != "" && description != "") {
      Meteor.call('sectionInsert', {title: title, description: description});
      event.target.newSectionTitle.value = "";
      event.target.newSectionDescription.value = "";
    }
    return false;
  },
});
