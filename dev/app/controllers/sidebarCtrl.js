app.controller("sidebarCtrl", function ($scope, $http) {
  $http.get("../json/sidebar.json").then(function (response) {
      $scope.sidebar = response.data;
  });
});