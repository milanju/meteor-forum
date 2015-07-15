Template.adminLayout.helpers({
  isAdmin: function() {
    if(Meteor.user() && Meteor.user().admin === true) return true;
    else return false;
  }
});
