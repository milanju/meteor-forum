Template.user.helpers({
  user: function() {
    return Meteor.users.findOne({username: Router.current().params.username});
  }
});
