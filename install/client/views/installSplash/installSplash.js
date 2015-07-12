Template.installSplash.events({
  'click #install-button': function() {
    var id = System.findOne()._id;
    System.update({_id: id}, {$set: {installStep: "form"}});
  }
});
