Template.post.helpers({
  user: function() {
    return Meteor.users.findOne({_id: this.userId});
  },
  isAuthor: function() {
    if(this.userId === Meteor.userId() || Meteor.user().admin === true) return true;
    else return false;
  },
  formatDatePost: function(date) {
    return moment(date).format('LLL');
  },
  edit: function() {
    if(Session.get(this._id) === "edit") return true;
    else return false;
  }
});

Template.post.events({
  'click .edit-post': function(event) {
    Session.set(this._id, "edit");
  },
  'click .delete-post': function() {
    Meteor.call('postRemove', this._id, function(error, result) {
      if(!error) {
        Materialize.toast('Post Deleted!', 3000);
      }
    });
  },
  'click .delete-thread': function() {
    var threadId = this.threadId;
    var forumId = this.forumId;

    Meteor.call('threadRemove', threadId, function(error, result) {
      if(!error) {
        Materialize.toast('Thread Deleted!', 3000);
        Router.go("/forum/" + Router.current().params.forumSlug);
      }
    })
  },
  'submit #edit-post-form': function(event) {
    var content = event.target.content.value;
    var postId = this._id;
    if(content != "" && postId != "") {
      Meteor.call('postUpdate', postId, {content: content});
      Session.set(this._id, "view");
    }
    return false;
  }
});
