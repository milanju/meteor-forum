Template.installCreateUser.events({
  'submit #install-create-user-form': function(event) {
    var email = event.target.email.value;
    var username = event.target.username.value;
    var password = event.target.password.value;

    Accounts.createUser({
      email: email,
      username: username,
      password: password
    });

    return false;
  },
  'click .install-next': function() {
    Meteor.call('installNext');
  }
});
