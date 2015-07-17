Template.forum.helpers({
  threads: function() {
    return Threads.find({forumId: this._id}, {sort: {date: -1}});
  }
});

Template.forum.events({
  'click .new-thread': function() {
    Router.go('/forum/' + this._id + '/new');
  }
});
