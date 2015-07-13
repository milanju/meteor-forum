Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
    name: 'home'
});

Router.route('/install', {
  name: 'install'
});
