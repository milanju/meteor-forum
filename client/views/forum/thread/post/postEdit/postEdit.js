Template.postEdit.events({
  'submit #edit-post-form': function(event) {
    var content = event.target.content.value;
    var postId = this._id;
    if(content != "" && postId != "") {
      Meteor.call('postUpdate', postId, {content: content});
      Router.go('/forum/' + this.forumId + '/' + this.threadId);
    }
    return false;
  }
})
