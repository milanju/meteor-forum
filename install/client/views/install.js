Template.install.helpers({
  splash: function() {
    if(System.findOne() && System.findOne().installStep === "splash") return true;
    return false;
  },
  form: function() {
    if(System.findOne() && System.findOne().installStep === "form") return true;
    return false;
  },
  createUser: function() {
    if(System.findOne() && System.findOne().installStep === "createUser") return true;
    return false;
  },
  live: function() {
    if(System.findOne() && System.findOne().status === "live") {
      Router.go('/');
    }
  }
});
