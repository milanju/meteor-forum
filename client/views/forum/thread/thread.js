Template.thread.onRendered(function () {
  Meteor.call('incThreadViewCount', Threads.findOne()._id);
});

Template.thread.rendered = function() {
  CKEDITOR.replace( 'ckeditor1' );
}

Template.thread.helpers({
  forum: function() {
    return Forums.findOne();
  },
  thread: function() {
    return Threads.findOne({slug: Router.current().params.threadSlug});
  },
  posts: function() {
    return Posts.find({}, {sort: {date: 1}});
  }
});

Template.thread.events({
  'submit #quickreply-form': function(event, template) {
    var content = event.target.content.value;
    var threadId = this._id;

    if(content != "" && threadId) {
      Meteor.call('postInsert', {content: content, threadId: threadId});
      event.target.content.value = "";
    }

    return false;
  }
});
