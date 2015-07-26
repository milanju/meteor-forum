Template.registerHelper(
  'rightForm', function(word, count) {
    if(count === 1) return word;
    else return word + 's';
  }
)

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('lll');
})

Template.registerHelper('isAdmin', function() {
  if(Meteor.user().admin === true) return true;
  else return false;
})
