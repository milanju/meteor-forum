Template.layout.onRendered(function () {
  if(System.findOne() && System.findOne().status === "install") {
    Router.go('/install');
  }
});

Template.layout.helpers({
  statusInstall: function() {
    if(System.findOne() && System.findOne().status === "install") return true;
    return false;
  },
});
