Template.forum.helpers({
  threads: function() {
    return Threads.find({forumId: this._id});
  }
});

Template.forum.events({
  'click .new-thread': function() {
    Router.go('/forum/' + this._id + '/new');
  }
});
