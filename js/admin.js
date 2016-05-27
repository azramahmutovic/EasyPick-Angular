
(function() {

var admin = angular.module('admin', ['ngRoute', 'ui.bootstrap']);

admin.config(function($routeProvider, $httpProvider) {
        $routeProvider

            .when('/korisnici', {
                templateUrl : 'admin_korisnici.html',
                controller  : 'AKorisniciController'
            }).when('/oglasi', {
                templateUrl : 'admin_oglasi.html',
                controller  : 'AKorisniciController'
            });

          // Registruj interceptor.    
          $httpProvider.interceptors.push('AuthInterceptorAdmin');

        });

   //Interceptor koji svakom requestu u header dodaje token
    admin.factory('AuthInterceptorAdmin', function ($window, $q) {
      return {
          request: function(config) {
              config.headers = config.headers || {};
              if ($window.localStorage.getItem('token')) {
                  config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
              }
              return config || $q.when(config);
          },
          response: function(response) {
              if (response.status === 401) {
                  // TODO: Redirect user to login page.
              }
              return response || $q.when(response);
          }
      };
    });
            

admin.controller('AKorisniciController', ['$http','$scope', '$window' , '$log', function( $http, $scope, $window, $log){
    
       $scope.totalItems = 10;
  $scope.currentPage = 1;
  $scope.itemsPerPage=8;


  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
	
	

  $scope.$watch("currentPage + numPerPage", function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;

    
  });

  $scope.korisnici = {};

  $http.get('http://localhost:8000/korisnici').success(function(data){
        
      $scope.korisnici = data; 
      $log.debug(angular.toJson($scope.korisnici, true));
            
      })
      .error(function () {
            

       });
    
    
  }]);







 

})();

 