Template.registerHelper(
  'rightForm', function(word, count) {
    if(count === 1) return word;
    else return word + 's';
  }
)
