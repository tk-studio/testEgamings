app.controller("gamesListCtrl", function ($scope, $http) {
  $http.get("../json/games.json").then(function (response) {
      $scope.games = response.data;
  });
});