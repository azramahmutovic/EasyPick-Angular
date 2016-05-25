var app = angular.module('easypick');

app.controller('mainController', [ '$window', '$scope', '$translate', '$http', '$log', function($window, $scope, $translate, $http, $log){

    
    $scope.isAdmin = false;

    $http.get('http://localhost:8000/korisnik').success(function(data){
        if(data.admin == 1)
          $scope.isAdmin = true;
        $log.debug(angular.toJson($scope.isAdmin, true));
        
    })
    .error(function () {
        $log.debug(angular.toJson(data, true));

    });

    this.userLoggedIn = function(){
    var token = $window.localStorage.getItem('token');
    return token ? true : false;
    };

    $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    };

    this.redirectToPanel = function() {
      $window.location.href = '/easypick/admin.html';
    };

    this.logout = function(){
      $window.localStorage.removeItem('token');
      $window.localStorage.removeItem('user_id');
    };

   }]);