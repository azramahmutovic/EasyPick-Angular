(function(){
  var app = angular.module('easypick', ['vcRecaptcha', 'ngRoute']);

  // configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/login', {
                templateUrl : 'login-form.html',
                controller  : 'LoginController'
            })

            // route for the about page
            .when('/register', {
                templateUrl : 'register-form.html',
                controller  : 'LoginController'
            })

            // route for the contact page
            .when('/reset', {
                templateUrl : 'pass-reset-form.html',
                controller  : 'LoginController'
            });
    });

   app.controller('mainController', function(){

   });

   app.controller('LoginController', [ 'vcRecaptchaService', '$http', '$window', '$log', function(vcRecaptchaService, $http, $window, $log) {
    //brisanje tokena na refresh zbog testa
    $window.localStorage.removeItem('token');
    this.user = {};
    this.user.tip = 'korisnik1';

    this.publicKey = "6LfQyB0TAAAAAFrPuH1kkbtrup-M2fKDM4CZrXFU";

    this.login = function() {


      var data = { email: this.user.email, password: this.user.password};

      $http.post('http://localhost:8000/prijava', data).success(function(data){
        $window.localStorage.setItem('token', data.token);
            $log.debug(angular.toJson(data, true));
            
      })
      .error(function () {
            $window.localStorage.removeItem('token');
            $log.debug(angular.toJson(data, true));

        });
    };

    this.register = function(){
      
      if(vcRecaptchaService.getResponse() === ""){
        //if string is empty
            
        }

        else{

            var data = {  
                'name':this.user.name,
                'email':this.user.email,
                'password':this.user.password,
                'drzava': this.user.grad,
                'grad': this.user.grad,
                'telefon': this.user.telefon,
                'g-recaptcha-response':vcRecaptchaService.getResponse()  //send g-captcah-reponse to our server
          }
        }

      $http.post('http://localhost:8000/korisnici', data).success(function(data){
        
      alert("Successfully verified and signed up the user");
      $window.localStorage.setItem('token', data.token);
      $log.debug(angular.toJson(data, true));
            
      })
      .error(function () {
            $window.localStorage.removeItem('token');
            $log.debug(angular.toJson(data, true));

        });
    };
/*
    this.reset = function(form){
      if(form.$valid){

      }
    };  */

    this.typeOfUser = function() {
      
      if(this.user.tip == 'korisnik1')
        return false;
      else return true;
    };

    this.isAuthed = function(){

      var token = $window.localStorage.getItem('token');
      $log.debug(angular.toJson(token, true));
      return token ? true : false;
    };

  }]);
 
app.factory('myService', function($http, $window) {
  var myService = {
    async: function() {
      var urlBase = 'http://localhost:8000/korisnici/6?token=';
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get(urlBase + $window.localStorage.token).then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
});

app.controller('KorisnikController', function( myService, $scope, $window) {
  // Call the async method and then do stuff with what is returned inside our own then function
  var easypick=this;
  easypick.korisnik={};
  myService.async().then(function(data) {
    easypick.korisnik=data;
    
    if(easypick.korisnik.verifikovan)
        $scope.verifikacija={"color":"green"};
    if(easypick.korisnik.admin)
        $scope.admin={"color":"yellow"};
    if(easypick.korisnik.ban)
        $scope.ban={"color":"red"};
    
    if(easypick.korisnik.telefon!=null)
        $scope.telefon=easypick.korisnik.telefon;
    
    
    if(easypick.korisnik.grad!=null && easypick.korisnik.drzava!=null)
        $scope.lokacija=easypick.korisnik.drzava +', '+easypick.korisnik.grad;    
    else if(easypick.korisnik.grad!=null)
        $scope.lokacija=easypick.korisnik.grad;
    else if(easypick.korisnik.drzava!=null)
        $scope.lokacija=easypick.korisnik.drzava;
    
  
           
  });
  
}); 

  
    app.controller('ResetController', ['$http', function($http){
      this.user={};
      this.resetPass= function() {
        $http.post('http://localhost:8000/password/email', {email:this.user.email});  
      };
      
    }]);

})();