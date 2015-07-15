if(Meteor.isServer) {
  if(System.find().count() === 0) {
    System.insert({
      status: "install",
      installStep: "splash",
      title: "",
      description: ""
    });
  }
}

if(Meteor.isServer){
  Meteor.methods({
    'installNext': function() {
      var system = System.findOne();
      if(system.status === 'install') {

        if(system.installStep === 'splash') {
          System.update(system, {$set: {installStep: 'createUser'}});
          return;
        }

        if(system.installStep === 'createUser') {
          if(Meteor.user() && !(Meteor.users.findOne({admin: true}))) {
            Meteor.users.update(Meteor.user(), {$set: {admin: true}});
            System.update(system, {$set: {installStep: 'form'}});
          }
          return;
        }

      } else return;
    },
    'initializeForum': function(title, description) {
      var system = System.findOne();
      if(Meteor.user().admin != true) {
        throw new Meteor.Error("Must be admin.");
      }
      if((system.status != "install") && (system.installStep != "form")) {
        throw new Meteor.Error("Method only available during install process.");
      }
      if(title === "") {
        throw new Meteor.Error("Title may not be empty.");
      }
      if(description === "") {
        throw new Meteor.Error("Description may not be empty.");
      }
      System.update(system, {$set: {
        title: title,
        description: description,
        status: "live",
        installStep: "done"
      }});

      // Now initialize first sample Section, Forum & Thread.
      var section = {
        title: "Sample Section",
        description: "This is a sample section."
      }

      Meteor.call("sectionInsert", section);

      var sectionId = Sections.findOne()._id;

      var forum = {
        title: "Sample Forum",
        description: "This is a sample forum.",
        sectionId: sectionId
      }

      Meteor.call("forumInsert", forum);
    }
  });
}
