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
    $("#login-panel").slideToggle(200,"linear");
  },
  'click #register-button': function() {
    $("#register-panel").slideToggle(200,"linear");
  }
});
