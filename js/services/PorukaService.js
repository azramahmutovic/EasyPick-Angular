var app = angular.module('easypick');

app.factory('PorukaService', function($http) {
  var PorukaService = {
    async: function(tekst1, korisnikid) {
      var urlBase = 'http://localhost:8000/poruke';
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.post(urlBase, {tekst: tekst1, korisnik2_id: korisnikid}).then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return PorukaService;
});