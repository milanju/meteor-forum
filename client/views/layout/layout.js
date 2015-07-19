Template.layout.onRendered(function() {
  if(Meteor.user() === undefined) {
    Session.set("register-panel-toggle", false);
    Session.set("login-panel-toggle", false);
  }
});

Template.layout.helpers({
  statusInstall: function() {
    if(System.findOne() && System.findOne().status === "install") return true;
    return false;
  },
  system: function() {
    return System.findOne();
  }
});

Template.layout.events({
  'click #login-button': function() {
    if(Session.get("login-panel-toggle") === undefined || Session.get("login-panel-toggle") === false) {
      Session.set("login-panel-toggle", true);
    } else {
      Session.set("login-panel-toggle", false);
    }
    if(Session.get("register-panel-toggle") === true) {
      $("#register-panel").slideToggle(200, "linear", function() {
        $("#login-panel").slideToggle(200, "linear", function() {
          $("#login-username").focus();
        });
      });
      Session.set("register-panel-toggle", false);
    } else {
      $("#login-panel").slideToggle(200, "linear", function() {
        $("#login-username").focus();
      });
    }
  },
  'click #register-button': function() {
    if(Session.get("login-panel-toggle") === true) {
      $("#login-panel").slideToggle(200, "linear", function() {
        $("#register-panel").slideToggle(200, "linear", function() {
          $("#register-username").focus();
        });
      });
      Session.set("login-panel-toggle", false);
    } else {
      $("#register-panel").slideToggle(200, "linear", function() {
        $("#register-username").focus();
      });
    }
    if(Session.get("register-panel-toggle") === undefined || Session.get("register-panel-toggle") === false) {
      Session.set("register-panel-toggle", true);
    } else {
      Session.set("register-panel-toggle", false);
    }
  }
});
