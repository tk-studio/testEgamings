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