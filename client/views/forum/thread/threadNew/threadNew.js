Template.threadNew.helpers({
  forum: function() {
    return Forums.findOne();
  }
});

Template.threadNew.events({
  'submit #new-thread-form': function(event) {
    var title = event.target.title.value;
    var content = event.target.content.value;
    var forumSlug = this.slug;
    if(this._id != "" && title != "" && content != "") {
      Meteor.call('threadInsert', {forumId: this._id, title: title, content: content}, function(error, result) {
        var threadSlug = result;
        Router.go('/forum/' + forumSlug + '/' + threadSlug);
      });
    }
    return false;
  }
});
