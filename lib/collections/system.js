System = new Mongo.Collection('system');

System.allow({
  update: function(userId, doc, fields, modifier) {
    if(doc.installStep === 'splash'
      && fields[0] === 'installStep'
      && modifier.$set.installStep === 'form')
    {
        return true;
    }
    return false;
  }
})
