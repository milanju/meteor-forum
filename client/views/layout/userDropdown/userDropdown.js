Template.userDropdown.onRendered(function() {
  $(".dropdown-button").dropdown({
    hover: false,
    belowOrigin: true
  });
});

Template.userDropdown.events({
  'click .logout-button': function() {
    Meteor.logout();
  }
});
