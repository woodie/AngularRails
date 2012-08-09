// framework
app.factory('$railsResource', function($http) {
  return function(singular, plural) {
    if (typeof plural == 'undefined' ) { plural = singular + 's'; }
    return {
      all: function() {
        $http.get('/' + plural + '.json').success(function(data) {
          return data;
        });
      },
      new: function() {},
      get: function() {},
      create: function() {},     
      update: function() {},    
      destroy: function() {}
    }
  };
})

