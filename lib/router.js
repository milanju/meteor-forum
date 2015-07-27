// Home Route
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

// User Profile Routes
Router.route('/users/:username', function() {
  this.layout('layout');
  //TODO: subscribe to user Collection
  this.render('user');
});

// Forum Routes
Router.route('/forum/:forumSlug', function() {
  this.layout('layout');
  this.wait(Meteor.subscribe('sections', {}));
  this.wait(Meteor.subscribe('forums', {slug: this.params.forumSlug}, function() {
    var forumId = Forums.findOne({slug: this.params.forumSlug});
    Meteor.subscribe('threads', {forumId: forumId});
  }));
  if(this.ready()) {
    this.render('forum');
  } else {
    this.render('loading');
  }
});

Router.route('/forum/:forumSlug/new', function() {
  this.layout('layout');
  this.wait(Meteor.subscribe('sections', {}));
  this.wait(Meteor.subscribe('forums', {slug: this.params.forumSlug}));
  if(this.ready()) {
    this.render('threadNew');
  } else {
    this.render('loading');
  }
});

Router.route('/forum/:forumSlug/:threadSlug', function() {
  this.layout('layout');
  this.wait(Meteor.subscribe('sections', {}));
  this.wait(Meteor.subscribe('forums', {slug: this.params.forumSlug}));
  this.wait(Meteor.subscribe('threads', {slug: this.params.threadSlug}));
  this.wait(Meteor.subscribe('postsBySlug', {slug: this.params.threadSlug}));
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
