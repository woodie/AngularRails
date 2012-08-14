// Resource.all

app.factory('$railsResource', function($http, flashNotice, flashErrors, $location) {
  return function(singular, plural) {
    if (typeof plural == 'undefined' ) { plural = singular + 's'; }
    
    var Klass = function Klass(data) {
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
      return $http.get('/' + plural + '/' + id + '.json')
      .then(function(response) {
        console.log('get: %o', response.data);
        return new Klass(response.data);
      });
    };

    Klass.create = function(obj) {
      console.log('create: %o', obj);
      $http.post('/' + plural + '.json', obj)
      .success(function(data, status) {
        flashNotice.set(singular + ' was successfully created.');
        $location.path('/' + plural + '/' + data.id);
      })
      .error(function(data, status) {
        flashErrors.set(full_messages(data));
      });
    };

    Klass.update = function(obj) {
      console.log('update: %o', obj);
      $http.put('/' + plural + '/' + obj.id + '.json', obj)
      .success(function(data, status) {
        flashNotice.set(singular + ' was successfully undated.');
        $location.path('/' + plural + '/' + obj.id);
      })
      .error(function(data, status) {
        flashErrors.set(full_messages(data));
      });
    };

    Klass.destroy = function() {};

    Klass.prototype.update = function() {
      Klass.update(this);
    };

    return Klass;
  };
});

