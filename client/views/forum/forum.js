Template.forum.helpers({
  forum: function() {
    return Forums.findOne();
  },
  threads: function() {
    return Threads.find({}, {sort: {lastPostDate: -1}});
  },
  author: function() {
    return Meteor.users.findOne({_id: this.userId}).username;
  },
  lastPostExists: function() {
    if(this.lastPost != "none") return true;
    else return false;
  }
});

Template.forum.events({
  'click .new-thread': function() {
    Router.go('/forum/' + Forums.findOne()._id + '/new');
  }
});
