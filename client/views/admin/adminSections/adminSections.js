Template.adminSections.helpers({
  sections: function() {
    return Sections.find({}, {sort: {position: 1}});
  }
});

Template.adminSections.events({
  'click .section-edit': function() {
    Router.go('/admin/sections/edit/' + this._id);
  },
  'click .section-delete': function() {
    Meteor.call('sectionRemove', this._id);
  },
  'click .section-position-up': function() {
    var sections = Sections.find({}, {sort: {position: 1}}).fetch();
    for(var i = 0; i < sections.length; i++) {
      if(this._id === sections[0]._id) {
        return;
      }
      if(this._id === sections[i]._id) {
        var firstPos = this.position;
        Meteor.call("sectionUpdate", sections[i]._id, {position: sections[i-1].position});
        Meteor.call("sectionUpdate", sections[i-1]._id, {position: firstPos});
      }
    }
  },
  'click .section-position-down': function() {
    var sections = Sections.find({}, {sort: {position: -1}}).fetch();
    for(var i = 0; i < sections.length; i++) {
      if(this._id === sections[0]._id) {
        return;
      }
      if(this._id === sections[i]._id) {
        var firstPos = this.position;
        Meteor.call("sectionUpdate", sections[i]._id, {position: sections[i-1].position});
        Meteor.call("sectionUpdate", sections[i-1]._id, {position: firstPos});
      }
    }
  }
});
