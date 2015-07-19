Template.loginForm.events({
  'submit #login-form': function(event, template) {
    var username = event.target.username.value;
    var password = event.target.password.value;
    Meteor.loginWithPassword(username, password, function(error) {
      if(error) {

      } else {
        Session.set("login-panel-toggle", false);
      }
    });
    event.target.username.value = "";
    event.target.password.value = "";
    return false;
  }
});
