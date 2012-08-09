// Resource.all

app.factory('$railsResource', function($http) {
  return function(singular, plural) {
    if (typeof plural == 'undefined' ) { plural = singular + 's'; }
    
    var Klass = function(data) {
      angular.extend(this, data);
    };

//    Klass.$path = function(type) {
//      return  'partials/' + plural + '-' + type + '.html';
//    }

    Klass.all = function() {
      return $http.get('/' + plural + '.json').then(function(response) {
        return response.data;
      });
    };

    Klass.nil = function() {
      return new Klass(); // Q: do we need to add attributes?
    };

    Klass.get = function(id) {
      return $http.get('/' + plural + '/' + id + '.json').then(function(response) {
        return new Klass(response.data);
      });
    };

    Klass.create = function(obj) {
      $http.post('/' + plural + '.json', obj).then(function(response) {
        console.log('data: %o', response.data);
        console.log('error: %o', response.error);
      });
    };

    Klass.update = function(obj) {
      $http.put('/' + plural + '/' + obj.id + '.json', obj).then(function(response) {
        console.log('data: %o', response.data);
        console.log('error: %o', response.error);
      });
    };

    Klass.destroy = function() {};

    Klass.prototype.update = function() {
      Klass.update(this);
    };

    return Klass;
  };
});

