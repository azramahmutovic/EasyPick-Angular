var app = angular.module('easypick');

app.controller('OglasController', ['$http', '$window', '$log', '$location', function($http, $window, $log, $location){
    
    this.oglas = {};

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