// Resource.all

app.factory('$railsResource', function($http, flashNotice, $location) {
  return function(singular, plural) {
    if (typeof plural == 'undefined' ) { plural = singular + 's'; }
    
    var Klass = function Klass(data) {
      angular.extend(this, data);
    };

    Klass.all = function() {
      return $http.get('/' + plural + '.json')
      .then(function(response) {
        return new Klass(response.data);
      });
    };

    Klass.get = function(id) {
      return $http.get('/' + plural + '/' + id + '.json')
      .then(function(response) {
        return new Klass(response.data);
      });
    };

    Klass.nil = function() {
      return new Klass();
    };

    Klass.create = function(obj, erf) {
      $http.post('/' + plural + '.json', obj)
      .success(function(data, status) {
        flashNotice.set(singular + ' was successfully created.');
        $location.path('/' + plural + '/' + data.id);
      })
      .error(function(data, status) {
        erf(full_messages(data));
      });
    };

    Klass.update = function(obj, erf) {
      $http.put('/' + plural + '/' + obj.id + '.json', obj)
      .success(function(data, status) {
        flashNotice.set(singular + ' was successfully undated.');
        $location.path('/' + plural + '/' + obj.id);
      })
      .error(function(data, status) {
        erf(full_messages(data));
      });
    };

    Klass.destroy = function() {
    };

    Klass.prototype.update = function() {
      Klass.update(this);
    };

    Klass.prototype.path = function(type) {
      return 'partials/' + plural + '-' + type + '.html';
    };

    Klass.prototype.destroy = function(member, erf) {
      console.log("here");

      $http.delete('/' + plural + '/' + member.id + '.json')
      .success(function(data, status) {
        // Object [object Window] has no method 'indexOf'
        var index = this.indexOf(member);
        this.splice(index, 1);
      })
      .error(function(data, status) {
        erf(data);
      });

    };

    return Klass;
  };
});

