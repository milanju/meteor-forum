Template.home.helpers({
  sections: function() {
    return Sections.find({}, {sort: {position: 1}});
  },
  forums: function(id) {
    return Forums.find({sectionId: id}, {sort: {position: 1}});
  }
});
