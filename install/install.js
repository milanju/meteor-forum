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
