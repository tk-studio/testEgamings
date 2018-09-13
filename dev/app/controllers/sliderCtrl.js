app.controller("sliderCtrl", function ($scope, $http) {
  $http.get("../json/slides.json").then(function (response) {
      $scope.slides = response.data;
  });
});