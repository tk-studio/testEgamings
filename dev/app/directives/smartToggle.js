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