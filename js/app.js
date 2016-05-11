(function(){
  var app = angular.module('easypick', ['vcRecaptcha', 'ngRoute', 'ui.bootstrap']);

  // configure our routes
    app.config(function($routeProvider, $httpProvider) {
        $routeProvider

            .when('/login', {
                templateUrl : 'login-form.html',
                controller  : 'LoginController'
            })

            .when('/register', {
                templateUrl : 'register-form.html',
                controller  : 'LoginController'
            })

            .when('/reset', {
                templateUrl : 'pass-reset-form.html',
                controller  : 'LoginController'
            })
            
            .when('/korisnik/:id', {
  		    controller:'KorisnikController',
  		    templateUrl:'views/korisnik.html'})

            .when('/oglas', {
                templateUrl : 'novi-oglas.html',
                controller  : 'OglasController'
            });
        // Registruj interceptor.    
        $httpProvider.interceptors.push('AuthInterceptor');
    });

    //Interceptor koji svakom requestu u header dodaje token
    app.factory('AuthInterceptor', function ($window, $q) {
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

   app.controller('mainController', [ '$window', function($window){

      //brisanje tokena na refresh zbog testa
      $window.localStorage.removeItem('token');

      this.userLoggedIn = function(){
      var token = $window.localStorage.getItem('token');
      return token ? true : false;
    };

   }]);

   app.controller('LoginController', [ 'vcRecaptchaService', '$http', '$window', '$log', '$location', function(vcRecaptchaService, $http, $window, $log, $location) {
    //brisanje tokena na refresh zbog testa
    
    this.user = {};
    this.user.tip = 'korisnik1';

    this.publicKey = "6LfQyB0TAAAAAFrPuH1kkbtrup-M2fKDM4CZrXFU";

    this.login = function() {

        $window.localStorage.removeItem('token');
      var data = { email: this.user.email, password: this.user.password};

      $http.post('http://localhost:8000/prijava', data).success(function(data){
        $window.localStorage.setItem('token', data.token);
        $log.debug(angular.toJson(data, true));
        $location.path('/');
            
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
 




  app.controller('ResetController', ['$http', function($http){
    this.user={};
    this.resetPass= function() {
      $http.post('http://localhost:8000/password/email', {email:this.user.email});  
    };
    
  }]);

  app.controller('OglasController', ['$http', '$window', '$log', '$location', function($http, $window, $log, $location){
    
    this.oglas = {};

    this.drzave = ['Bosna i Hercegovina', 'Hrvatska', 'Crna Gora', 'Srbija'];

    this.objaviOglas = function(){

      var data = {
      'naziv': this.oglas.naslov,
      'status_oglasa':'aktivan',
      'tip_oglasa': this.oglas.tip,
      'povrsina' : this.oglas.povrsina,
      'cijena': this.oglas.cijena,
      'stanje' : this.oglas.stanje,
      'drzava' : this.oglas.drzava,
      'grad' : this.oglas.grad,
      'adresa' : this.oglas.adresa,
      'voda': this.oglas.voda,
      'struja': this.oglas.struja,
      'internet': this.oglas.internet,
      'grijanje': this.oglas.grijanje,
      'kablovska': this.oglas.kablovska,
      'telefon': this.oglas.telefon,
      'garaza': this.oglas.garaza

    }

    $http.post('http://localhost:8000/oglasi', data).success(function(data){
        
      alert("Oglas unesen");
        $log.debug(angular.toJson(data, true));
        //vrati se na pocetnu str
        $location.path('/');
            
      })
      .error(function () {
            $log.debug(angular.toJson(data, true));
            
        });
    };
  

  }]);

app.controller('porukaController', ['$http', '$window', '$routeParams', function($http, $window, $routeParams){
      
      this.poruka={};
      this.posalji= function() {
        
        
        var urlBase = 'http://localhost:8000/poruke?token=' + $window.localStorage.token;
        $http.post(urlBase, {tekst: this.poruka.tekst, korisnik2_id: $routeParams.id});  
      };
      
    }]);
    
    app.directive('messageForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'message-form.html'
   };
     
  });
    
})(); 