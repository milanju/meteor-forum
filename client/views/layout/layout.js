Template.layout.helpers({
  statusInstall: function() {
    if(System.findOne() && System.findOne().status === "install") return true;
    return false;
  },
  system: function() {
    return System.findOne();
  }
});
