Template.thread.onRendered(function () {
  Meteor.call('incThreadViewCount', this.data._id);
});

Template.thread.helpers({
  posts: function() {
    return Posts.find({threadId: this._id}, {sort: {date: 1}});
  },
  getForumTitle: function() {
    if(Forums.findOne({_id: this.forumId})) {
      return Forums.findOne({_id: this.forumId}).title;
    }
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
