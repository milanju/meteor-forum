Template.registerForm.events({
  'submit #register-form': function(event) {
    var username = event.target.username.value;
    var password = event.target.password.value;
    var confirmPassword = event.target.confirmPassword.value;
    if(username != "" && password === confirmPassword) {
      Accounts.createUser({
        username: username,
        password: password
      }, function(error) {
        if(error) {

        } else {
          Session.set("register-panel-toggle", false);
        }
      });
    }
    return false;
  }
});
