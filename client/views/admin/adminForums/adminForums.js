Template.adminForums.helpers({
  sections: function() {
    return Sections.find({}, {sort: {position: 1}});
  },
  forums: function(sectionId) {
    return Forums.find({sectionId: sectionId}, {sort: {position: 1}});
  },
});

Template.adminForums.events({
  'click .forum-edit': function() {
    Router.go('/admin/forums/edit/' + this._id);
  },
  'click .forum-delete': function() {
    Meteor.call('forumRemove', this._id);
  },
  'click .forum-position-up': function() {
    var forums = Forums.find({sectionId: this.sectionId}, {sort: {position: 1}}).fetch();
    for(var i = 0; i < forums.length; i++) {
      if(this._id === forums[0]._id) {
        return;
      }
      if(this._id === forums[i]._id) {
        var firstPos = this.position;
        Meteor.call("forumUpdate", forums[i]._id, {position: forums[i-1].position, sectionId: this.sectionId});
        Meteor.call("forumUpdate", forums[i-1]._id, {position: firstPos, sectionId: this.sectionId});
      }
    }
  },
  'click .forum-position-down': function() {
    var forums = Forums.find({sectionId: this.sectionId}, {sort: {position: -1}}).fetch();
    for(var i = 0; i < forums.length; i++) {
      if(this._id === forums[0]._id) {
        return;
      }
      if(this._id === forums[i]._id) {
        var firstPos = this.position;
        Meteor.call("forumUpdate", forums[i]._id, {position: forums[i-1].position, sectionId: this.sectionId});
        Meteor.call("forumUpdate", forums[i-1]._id, {position: firstPos, sectionId: this.sectionId});
      }
    }
  }
})
