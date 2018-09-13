var app = angular.module("testEgApp", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  
  $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
  });

  $urlRouterProvider.otherwise("/");

  $stateProvider.state ({
    name: "root",
    abstract:true,
    views: {
      "@": {
        templateUrl: "../views/layout.html"
      },
      "header@root": {
        templateUrl: "../views/header.html",
        controller: "headerCtrl"
      },
      "slider@root": {
        templateUrl: "../views/slider.html",
        controller: "sliderCtrl"
      },
      "content@root": {
        templateUrl: "../views/content.html"
      }
    }
  });

  $stateProvider.state ({
      name: "root.main",
      url: "/",
      title: "Главная",
      views: {
        "": {
          templateUrl: "../views/mainPage.html"
        },
        "sidebar@root.main": {
          templateUrl: "../views/sidebar.html",
          controller: "sidebarCtrl"
        },
        "slots@root.main": {
          templateUrl: "../views/slots.html",
          controller: "gamesListCtrl"
        }
      }
  });

  $stateProvider.state ({
      name: "root.slots",
      url: "/slots",
      title: "Слоты",
      views: {
        "": {
          templateUrl: "../views/slotsPage.html"
        },
        "slots@root.slots": {
          templateUrl: "../views/slots.html",
          controller: "gamesListCtrl"
        }
      }
  });

  $stateProvider.state({
    name: "root.contacts",
    url: "/contacts",
    templateUrl: "../views/contacts.html",
    title: "Контакты",
    controller: "contactFormCtrl"

  });
});
// чтобы передавать другие параметры из scope на страницу - например title вверху страницы
app.run(["$rootScope", "$state", "$stateParams",
    function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
  ]
);
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
app.controller("gamesListCtrl", function ($scope, $http) {
  $http.get("../json/games.json").then(function (response) {
      $scope.games = response.data;
  });
});
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
app.controller("sidebarCtrl", function ($scope, $http) {
  $http.get("../json/sidebar.json").then(function (response) {
      $scope.sidebar = response.data;
  });
});
app.controller("sliderCtrl", function ($scope, $http) {
  $http.get("../json/slides.json").then(function (response) {
      $scope.slides = response.data;
  });
});
app.directive("smartToggle", function () {
  return {
    restrict:"C",
    link: function(scope, element, attr){
      element.on("click", function () {
        //проверка,чтобы действия по клику срабатывали исключительно на элементах у которых есть данный класс-директива.
        // инчае меню сайдбара если имеет элементы без дочерних работает некорректно
        if (element.hasClass("smart-toggle")) {
          //такой подход к скрытия-показа элементов взят из опыта. Иначе может возникнуть проблема с главным меню на мобилках, 
          //если пользователь перевернет экран и вид меню изменится на десктопный.
          element.toggleClass("active");
          element.next().toggleClass("open");
        }
      });
    }
  };
});