Template.threadNew.events({
  'submit #new-thread-form': function(event) {
    var forumId = this._id;
    var title = event.target.title.value;
    var content = event.target.content.value;

    if(forumId != "" && title != "" && content != "") {
      Meteor.call('threadInsert', {forumId: forumId, title: title, content: content});
      Router.go('/forum/' + this._id);
    }
    return false;
  }
});
