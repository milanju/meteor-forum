Template.post.helpers({
  user: function() {
    return Meteor.users.findOne({_id: this.userId});
  }
});

Template.post.events({
  'click .edit-post': function(event) {
    Router.go('/post/' + this._id + '/edit');
  }
});
