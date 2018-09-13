app.controller("contactFormCtrl", function ($scope, $http) {
  $http.get("../json/contactForm.json").then(function (response) {
      $scope.contactForm = response.data;
  });
  $scope.requireValue = true;
  $scope.sendMessage = function (supportMessage) {
    console.log(supportMessage.email  + " - " + supportMessage.message);
    $scope.supportForm.$setPristine();
    $scope.supportForm.$setUntouched();
    supportMessage.email = null;
    supportMessage.message = null;

  }
  $scope.minLength = 3;
  $scope.maxLength = 20;
  $scope.getError = function (error) {
    if (angular.isDefined(error)) {
        if (error.required) {
            return "Введите значение";
        } else if (error.email) {
          return "Введите свой email адрес";
        } else if (error.minlength) {
          return "Минимальная длина сообщения - "+ $scope.minLength + " символов";
        } else if (error.maxlength) {
          return "Вы превысили максимальную длину сообщения - "+ $scope.maxLength + " символов";
        }
    }
  };  
});