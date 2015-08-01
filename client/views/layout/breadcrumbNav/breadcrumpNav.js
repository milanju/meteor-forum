Template.breadcrumbNav.helpers({
  firstCrumb: function() {
    if(this.url === "/") {
      return true;
    }
  },
  breadcrumbs: function() {
    newThread = function() {
      var arr = Router.current().url.split("/");
      if(arr[arr.length-1] === "new") {
        return true;
      } else {
        return false;
      }
    }
    var params = Router.current().params;
    var crumbs = [];
    crumbs.push({
      name: "Home",
      url: "/"
    });
    if(params.forumSlug) {
      var forum = Forums.findOne({slug: params.forumSlug});
      if(forum) {
        crumbs.push({
          name: forum.title,
          url: "/forum/" + params.forumSlug
        });
      }
      if(params.threadSlug) {
        var thread = Threads.findOne({slug: params.threadSlug});
        if(thread) {
          crumbs.push({
            name: thread.title,
            url: "/forum/" + params.forumSlug + "/" + params.threadSlug
          });
        }
      } else if(newThread()) {
        crumbs.push({
          name: "New Thread",
          url: "/forum/" + params.forumSlug + "/new"
        });
      } else {
      }
    } else if(Iron.Location.get().path.split("/")[1] === "users") {
      crumbs.push({
        name: "Users",
        url: "/users/"
      });
      var username = Router.current().params.username;
      if(username) {
        crumbs.push({
          name: username,
          url: "/users/" + username
        })
      }
    }
    return crumbs;
  }
});
