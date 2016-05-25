
(function() {

var admin = angular.module('admin', ['ngRoute', 'ui.bootstrap']);

admin.config(function($routeProvider) {
        $routeProvider

            .when('/korisnici', {
                templateUrl : 'admin_korisnici.html',
                controller  : 'AKorisniciController'
            }).when('/oglasi', {
                templateUrl : 'admin_oglasi.html',
                controller  : 'AKorisniciController'
            });
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
    
  }]);







 

})();

 