app.controller("headerCtrl", function ($scope, $rootScope, $http) {
  $http.get("../json/mainMenu.json").then(function (response) {
      $scope.mainMenu = response.data;
  });
  $http.get("../json/userInfo.json").then(function (response) {
    $scope.user = response.data;
  });
  //хак,чтобы убрать выпадающее меню если был совершен переход по ссылке.
  $rootScope.$on("$locationChangeStart", function () {
    var elem = document.querySelector(".main-menu-list");
    if (elem.classList.contains("open")) {
      elem.classList.remove("open");
      elem.previousElementSibling.classList.remove("active");
    }
  });
  
});