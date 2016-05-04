(function(){
  var app = angular.module('easypick', ['vcRecaptcha']);

   app.controller('NavigationController', function(){

      this.form = 0;

      this.isSelected = function(form){
        return this.form === form;
      };

      this.selectForm = function(form){
        this.form = form;
      };
      
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

  app.directive('loginForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'login-form.html'
   };

  });

    app.directive('passResetForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'pass-reset-form.html'
   };
   
  });

  app.directive('registerForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'register-form.html'
   };
   
  });
 
 
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
 
 
  
/*
app.factory('StudentDataOp', ['$http', function ($http) {

    var urlBase = 'http://localhost:8000/korisnici/90?token=';
    var StudentDataOp = {};

    StudentDataOp.getStudents = function () {
        return $http.get(urlBase+'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjkwLCJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvcHJpamF2YSIsImlhdCI6MTQ2MjM0ODE0NywiZXhwIjoxNDYyMzUxNzQ3LCJuYmYiOjE0NjIzNDgxNDcsImp0aSI6ImVhOGY1YWM3MTQxMWY4ZTBhMzJkMjcwMjE5N2I4OTY4In0.G9qPjNQNgZDSJmo0aWh4fAA1eodAchEdJy0ssOezujw');
    };
   
    return StudentDataOp;

}]);

app.controller('KorisnikController', function ($scope, StudentDataOp) {
    var easypick=this;
    easypick.korisnik={};
    $scope.status;
    $scope.students;
    getStudents();
    

    function getStudents() {
        StudentDataOp.getStudents()
            .success(function (studs) {
                $scope.students = studs;
                easypick.korisnik=studs; 
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
       
}); */

/*       
  app.factory('dajKorisnika', ['$http', function($http){
    return $http.get('http://localhost:8000/korisnici/90?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjkwLCJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvcHJpamF2YSIsImlhdCI6MTQ2MjMwOTMyMCwiZXhwIjoxNDYyMzEyOTIwLCJuYmYiOjE0NjIzMDkzMjAsImp0aSI6IjNhOGE0NWJiMGM5MDUzMTBiMDdhM2ZkYzM3NWM3ZjBhIn0.0hgZohyRJKVdUXNXt0kGTXIuD1ihw5AoV7bdwcwgnWs')
        .success(function(data) {
          return data;
        })
        .error(function(err){
          return err;
        });
  }]); 
  
   
  app.controller('KorisnikController', ['dajKorisnika', '$scope', function(dajKorisnika, $scope){
    var easypick=this;
    easypick.korisnik={};
    
    dajKorisnika.success(function(data){
      easypick.korisnik=data; 
    });  
      
         
    if(easypick.korisnik.verifikovan)
        $scope.verifikacija={"color":"green"};
     
    
  }]);
  
  */
    
         
 
  
    app.controller('ResetController', ['$http', function($http){
      this.user={};
      this.resetPass= function() {
        $http.post('http://localhost:8000/password/email', {email:this.user.email});  
      };
      
    }]);

})();