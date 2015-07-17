Template.post.helpers({
  user: function() {
    return Meteor.users.findOne({_id: this.userId});
  },
  isAuthor: function() {
    if(this.userId === Meteor.userId() || Meteor.user().admin === true) return true;
    else return false;
  }
});

Template.post.events({
  'click .edit-post': function(event) {
    Router.go('/post/' + this._id + '/edit');
  }
});
