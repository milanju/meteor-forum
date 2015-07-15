Template.thread.helpers({
  posts: function() {
    return Posts.find({threadId: this._id});
  }
});

Template.thread.events({
  'submit #quickreply-form': function(event) {
    var content = event.target.content.value;
    var threadId = this._id;

    if(content != "" && threadId != "") {
      Meteor.call('postInsert', {content: content, threadId: threadId});
      event.target.content.value = "";
    }

    return false;
  }
});
