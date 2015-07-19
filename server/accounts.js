Accounts.onCreateUser(function(options, user) {
  user.posts = 0;
  user.admin = false;
  return user;
});
