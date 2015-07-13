Template.installSplash.events({
  'click #install-button': function() {
    Meteor.call("installNext");
  }
});
