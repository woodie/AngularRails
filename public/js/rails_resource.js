// framework
app.factory('$railsResource', function() {
  return function(name) {
    return {
      inflector: {
        singular: name,
        plural: name + 's'
      },
      all: function() {},
      new: function() {},
      get: function() {},
      create: function() {},     
      update: function() {},    
      destroy: function() {}
    }
  };
})


