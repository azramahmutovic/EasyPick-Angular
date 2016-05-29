var app = angular.module('easypick');

app.controller('LoginController', [ 'vcRecaptchaService', '$http', '$window', '$log', '$location', function(vcRecaptchaService, $http, $window, $log, $location) {
    
    
    this.user = {};
    this.user.tip = 'korisnik1';

    this.publicKey = "6LfQyB0TAAAAAFrPuH1kkbtrup-M2fKDM4CZrXFU";

    this.login = function() {

      var data = { email: this.user.email, password: this.user.password};

      $http.post('http://localhost:8000/prijava', data).success(function(data){
        $window.localStorage.setItem('token', data.token);
        $window.localStorage.setItem('user_id', data.id);
        $log.debug(angular.toJson(data, true));
        $location.path('/');
            
      })
      .error(function () {
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('user_id');
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
      $window.localStorage.setItem('user_id', data.id);
      $log.debug(angular.toJson(data, true));
            
      })
      .error(function () {
            $window.localStorage.removeItem('token');
            $log.debug(angular.toJson(data, true));

        });
    };

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
 