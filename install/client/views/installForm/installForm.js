Template.installForm.events({
  'submit #install-form': function(event, template) {
    var title = event.target.forumTitleInput.value;
    var description = event.target.forumDescriptionInput.value;

    Meteor.call('initializeForum', title, description);
    return false;
  }
});
