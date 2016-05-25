var app = angular.module('easypick');

app.controller('mainController', [ '$window', '$scope', '$translate', '$http', function($window, $scope, $translate, $http){

    //brisanje tokena na refresh zbog testa
    //$window.localStorage.removeItem('token');

    this.userLoggedIn = function(){
    var token = $window.localStorage.getItem('token');
    return token ? true : false;
    };

    $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    };

    this.isAdmin = function() {

      $http.post('http://localhost:8000/korisnik', data).success(function(data){
          $log.debug(angular.toJson(data, true));
          return data.admin;
      })
      .error(function () {
          $log.debug(angular.toJson(data, true));

        });
    };

    this.logout = function(){
      $window.localStorage.removeItem('token');
      $window.localStorage.removeItem('user_id');
    }

   }]);