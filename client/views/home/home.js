Template.home.helpers({
  title: function() {
    if(System.findOne()) {
      return System.findOne().title;
    }
  },
  description: function() {
    if(System.findOne()) {
      return System.findOne().description;
    }
  },
  sections: function() {
    return Sections.find();
  }
});
