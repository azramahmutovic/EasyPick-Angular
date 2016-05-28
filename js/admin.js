
(function() {

var admin = angular.module('admin', ['ngRoute', 'ui.bootstrap']);

admin.config(function($routeProvider, $httpProvider) {
        $routeProvider

            .when('/korisnici', {
                templateUrl : 'admin_korisnici.html',
                controller  : 'AKorisniciController'
            }).when('/oglasi', {
                templateUrl : 'admin_oglasi.html',
                controller  : 'AOglasiController'
            }).when('/korisnik/:id', {
                controller:'AKorisnikController',
                templateUrl:'admin_korisnik.html'
            }).when('/uredikorisnika/:id', {
                  templateUrl : 'admin_uredi.html',
                  controller  : 'AUrediController'


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
    
      
  $scope.korisnici = {};

  $http.get('http://localhost:8000/korisnici').success(function(data){
        
      $scope.korisnici = data; 
       $scope.totalItems = $scope.korisnici.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage=10;


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
    
      $log.debug(angular.toJson($scope.korisnici, true));
            
      })
      .error(function () {
            

       });

      $scope.izbrisikorisnika=function(id) {
$http.delete('http://localhost:8000/korisnici/'+id).success(function(){
	console.log("izbirsano");
	 }).error(function(response){  console.log(id);}) ;

};
    


     $scope.banujkorisnika=function(id) {
$http.post('http://localhost:8000/korisnici/ban/'+id).success(function(){
	console.log("izbirsano");
	 }).error(function(response){  console.log(id);}) ;

};


$scope.odbanujkorisnika=function(id) {
$http.delete('http://localhost:8000/korisnici/ban/'+id).success(function(){
	console.log("izbirsano");
	 }).error(function(response){  console.log(id);}) ;



};


  }]);


admin.controller('AOglasiController', ['$http','$scope', '$window' , '$log', function( $http, $scope, $window, $log){
    
      
  $scope.oglasi= {};

  $http.get('http://localhost:8000/oglasi').success(function(data){
        
      $scope.oglasi = data; 
       $scope.totalItems = $scope.oglasi.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage=10;


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
    
      $log.debug(angular.toJson($scope.oglasi, true));
            
      })
      .error(function () {
            

       });
    
    
$scope.izbrisioglas=function(id) {
$http.delete('http://localhost:8000/oglasi/'+id).success(function(){
	console.log("izbirsano");
	 }).error(function(response){  console.log(id);}) ;

};
  }]);



 



 admin.controller('AKorisniciController', ['$http','$scope', '$window' , '$log', function( $http, $scope, $window, $log){
    
      
  $scope.korisnik = {};

  $http.get('http://localhost:8000/korisnici').success(function(data){
        
      $scope.korisnici = data; 
       $scope.totalItems = $scope.korisnici.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage=10;


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
    
      $log.debug(angular.toJson($scope.korisnici, true));
            
      })
      .error(function () {
            

       });

      $scope.izbrisikorisnika=function(id) {
$http.delete('http://localhost:8000/korisnici/'+id).success(function(){
	console.log("izbirsano");
	 }).error(function(response){  console.log(id);}) ;

};
    


     $scope.banujkorisnika=function(id) {
$http.post('http://localhost:8000/korisnici/ban/'+id).success(function(){
	console.log("izbirsano");
	 }).error(function(response){  console.log(id);}) ;

};


$scope.odbanujkorisnika=function(id) {
$http.delete('http://localhost:8000/korisnici/ban/'+id).success(function(){
	console.log("izbirsano");
	 }).error(function(response){  console.log(id);}) ;



};

    
  }]);


 admin.controller('AKorisnikController', ['$http','$scope', '$routeParams', function( $http, $scope,  $routeParams){
    
      
  $scope.korisnik = {};

  
$http.get('http://localhost:8000/korisnici/'+$routeParams.id).success(function(data){
	   $scope.korisnik = data; 
	console.log("prikazano");
	 }).error(function(response){  console.log(id);}) ;




}]);
  
   admin.controller('AUrediController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams){
    
       
      $scope.user=this;
 
$http.get('http://localhost:8000/korisnici/'+$routeParams.id).success(function(data){
	  
	   $scope.user=data;
	         
      if ($scope.user.dodatno_korisnik==null)
      $scope.tip=0;
    
	            
	console.log("prikazano");
	 }).error(function(response){  console.log(id);}) ;

$scope.register=function(){
	var data = {  
		         
                'name':$scope.user.name,
                'email':$scope.user.email,
                'password':$scope.user.password,
                'drzava': $scope.user.drzava,
                'grad': $scope.user.grad,
                'telefon': $scope.user.telefon
                
          }


          var urlBase = 'http://localhost:8000/korisnici/'+$scope.user.id;
        $http.put(urlBase, data).success(function(response) {

        	console.log("Response" + response);
        });  



};
$scope.dodajadmina=function(id) {
	console.log(id);
$http.post('http://localhost:8000/korisnici/admini/'+id).success(function(){
	console.log("dodano");
	 }).error(function(response){  console.log(id);}) ;

};
    
$scope.oduzmiadmina=function(id) {
$http.delete('http://localhost:8000/korisnici/admini/'+id).success(function(){
	console.log("izbrisan admin");
	 }).error(function(response){  console.log(id);}) ;

};

 
}
  


]);


   


})();