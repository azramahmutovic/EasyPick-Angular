var app = angular.module('easypick');

app.controller('mainController', [ '$window', '$scope', '$translate', function($window, $scope, $translate){

      //brisanje tokena na refresh zbog testa
      $window.localStorage.removeItem('token');


      this.userLoggedIn = function(){
      var token = $window.localStorage.getItem('token');
      return token ? true : false;
    };

     $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

   }]);