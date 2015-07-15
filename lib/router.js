Router.route('/', {
    name: 'home',
    layoutTemplate: 'layout'
});

// Forum Routes
Router.route('/forum/:_id', function() {
  this.layout('layout');
  this.render('forum', {
    data: function() {
      return Forums.findOne({_id: this.params._id});
    }
  });
});

Router.route('/forum/:_id/new', function() {
  this.layout('layout');
  this.render('threadNew', {
    data: function() {
      return Forums.findOne({_id: this.params._id});
    }
  });
});

Router.route('/forum/:forumId/:threadId', function() {
  this.layout('layout');
  this.render('thread', {
    data: function() {
      return Threads.findOne({_id: this.params.threadId});
    }
  });
});

Router.route('/post/:postId/edit', function() {
  this.layout('layout');
  this.render('postEdit', {
    data: function() {
      return Posts.findOne({_id: this.params.postId});
    }
  });
});

// Admin Routes
Router.route('/admin', function() {
  this.layout('adminLayout');
  this.render('adminHome');
});

Router.route('/admin/sections', function() {
  this.layout('adminLayout');
  this.render('adminSections');
});

Router.route('/admin/sections/edit/:_id', function() {
  this.layout('adminLayout');
  this.render('adminSectionsEdit', {
    data: function() {
      return Sections.findOne({_id: this.params._id});
    }
  });
});

Router.route('/admin/forums', function() {
  this.layout('adminLayout');
  this.render('adminForums');
});

Router.route('/admin/forums/edit/:_id', function() {
  this.layout('adminLayout');
  this.render('adminForumsEdit', {
    data: function() {
      return Forums.findOne({_id: this.params._id});
    }
  });
});

// Install Routes
Router.route('/install', function () {
  this.layout('install');
});
