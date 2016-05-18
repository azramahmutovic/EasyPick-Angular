angular.module('oglas').controller('prikazioglasController', ['$http','$scope', '$window' , function( $http, $scope, $window){




 

var controller=this;
controller.oglasi=[] ;
 

$http({method:'GET', url:'http://localhost:8000/oglasi'}).success(function(data){
	controller.oglasi=data;
	
	console.log(data);
}); 





}   ]);


angular.module("oglas").controller('detaljnooglasController',  ['$http', '$scope','$routeParams','$window', '$timeout' ,function ($http, $scope, $routeParams, $window, $timeout) {
   
var controller=this;



$http({method:'GET', url:'http://localhost:8000/oglasi/'+$routeParams.id}).success(function(data){
	controller.oglas=data;
    $scope.oglasi=data.naziv;
	console.log(data);
    console.log($scope.oglasi);

    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: controller.oglas.slika1,
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
     slides.push({
      image: controller.oglas.slika2,
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
      slides.push({
      image: controller.oglas.slika3,
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
       slides.push({
      image: controller.oglas.slika4,
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });

}); 



 $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://lorempixel.com/' + newWidth + '/300',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };

  

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  /*for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  } */
   // $scope.addSlide2();

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }
    

  




}]) 


