var $window = $(window);
var nav = $(".fixed-button");
$window.scroll(function () {
  if ($window.scrollTop() >= 200) {
    nav.addClass("active");
  } else {
    nav.removeClass("active");
  }
});
