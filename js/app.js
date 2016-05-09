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
      
      var response = vcRecaptchaService.getResponse();

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
        
        if(response.error === 0){

                alert("Successfully verified and signed up the user");
                $window.localStorage.setItem('token', data.token);
              $log.debug(angular.toJson(data, true));
            }
            else{

                alert("User verification failed");
            }     
            
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
 
app.factory('myService', function($http) {
  var myService = {
    async: function() {
      var urlBase = 'http://localhost:8000/korisnici/90?token=';
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get(urlBase + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjkwLCJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvcHJpamF2YSIsImlhdCI6MTQ2MjM1MjAyOSwiZXhwIjoxNDYyMzU1NjI5LCJuYmYiOjE0NjIzNTIwMjksImp0aSI6ImU1Y2ZjYTI1YWQyN2FlZGI0MWJhOTVlOTk4Mzk5MmFmIn0.JOsIhBaQbpLWakFFYOsqwk1ZDPOh4tCrMwiKB5ISbO4').then(function (response) {
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

app.controller('KorisnikController', function( myService,$scope) {
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
  });
  
}); 

  
    app.controller('ResetController', ['$http', function($http){
      this.user={};
      this.resetPass= function() {
        $http.post('http://localhost:8000/password/email', {email:this.user.email});  
      };
      
    }]);

})();