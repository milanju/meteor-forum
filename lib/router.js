Router.route('/', function() {
    this.layout('layout');
    this.wait(Meteor.subscribe('sections', {}));
    this.wait(Meteor.subscribe('forums', {}));
    if(this.ready()) {
    this.render('home');
    } else {
      this.render('loading');
    }
});

// Forum Routes
Router.route('/forum/:forumId', function() {
  this.layout('layout');
  this.wait(Meteor.subscribe('sections', {}));
  this.wait(Meteor.subscribe('forums', {_id: this.params.forumId}));
  this.wait(Meteor.subscribe('threads', {forumId: this.params.forumId}));
  if(this.ready()) {
    this.render('forum');
  } else {
    this.render('loading');
  }
});

Router.route('/forum/:forumId/new', function() {
  this.layout('layout');
  this.wait(Meteor.subscribe('sections', {}));
  this.wait(Meteor.subscribe('forums', {_id: this.params.forumId}))
  if(this.ready()) {
    this.render('threadNew');
  } else {
    this.render('loading');
  }
});

Router.route('/forum/:forumId/:threadId', function() {
  this.layout('layout');
  this.wait(Meteor.subscribe('sections', {}));
  this.wait(Meteor.subscribe('forums', {_id: this.params.forumId}));
  this.wait(Meteor.subscribe('threads', {_id: this.params.threadId}));
  this.wait(Meteor.subscribe('posts', {threadId: this.params.threadId}));
  if(this.ready()) {
    this.render('thread');
  } else {
    this.render('loading');
  }
});

// Admin Routes
Router.route('/admin', function() {
  this.layout('adminLayout');
  this.wait(Meteor.subscribe('sections', {}));
  this.wait(Meteor.subscribe('forums', {}));
  if(this.ready()) {
    this.render('adminHome');
  } else {
    this.render('loading')
  }
});

Router.route('/admin/sections', function() {
  this.layout('adminLayout');
  this.wait(Meteor.subscribe('sections', {}));
  this.wait(Meteor.subscribe('forums', {}));
  if(this.ready()) {
    this.render('adminSections');
  } else {
    this.render('loading')
  }
});

Router.route('/admin/sections/edit/:sectionId', function() {
  this.layout('adminLayout');
  this.wait(Meteor.subscribe('sections', {_id: this.params.sectionId}));
  if(this.ready()) {
    this.render('adminSectionsEdit');
  } else {
    this.render('loading')
  }
});

Router.route('/admin/forums', function() {
  this.layout('adminLayout');
  this.wait(Meteor.subscribe('sections', {}));
  this.wait(Meteor.subscribe('forums', {}));
  if(this.ready()) {
    this.render('adminForums');
  } else {
    this.render('loading')
  }
});

Router.route('/admin/forums/edit/:forumId', function() {
  this.layout('adminLayout');
  this.wait(Meteor.subscribe('sections', {}));
  this.wait(Meteor.subscribe('forums', {_id: this.params.forumId}));
  if(this.ready()) {
    this.render('adminForumsEdit');
  } else {
    this.render('loading')
  }
});

// Install Routes
Router.route('/install', function () {
  this.layout('install');
});
