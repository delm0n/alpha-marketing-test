(function () {
  scrollFunction();
})();

function scrollFunction() {
  $(window).scroll(function () {
    if (window.innerWidth < 640) {
      if ($(window).scrollTop() >= 40) {
        $(".pagecrm_header").addClass("scroll");
      } else {
        $(".pagecrm_header").removeClass("scroll");
      }
    }
  });
}
