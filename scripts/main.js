(function () {
  scrollFunction();

  //по всем элементам с классом fancybox открывать href
  $(".fancybox").fancybox({
    touch: false,
  });

  //по клику на форме открывать success-form
  $("#call-form .main-button").on("click", function () {
    $.fancybox.close();

    setTimeout(() => {
      $.fancybox.open({
        src: "#success-form",
        type: "inline",
      });
    }, 0);
  });

  // блокировка кнопки
  $("#call-form label input").on("click", function () {
    var btn = $("#call-form .main-button");

    if (btn.attr("disabled")) {
      btn.removeAttr("disabled");
    } else {
      btn.attr("disabled", "disabled");
    }
  });

  dopdown(".system");
  dopdown(".order");
})();

function dopdown(selector) {
  //выпадающее меню
  $(selector + " .dropdown-toggle").click(function () {
    $(this).toggleClass("dropdown-toggle--active");
    $(this).next(".dropdown").slideToggle();
  });
}

function scrollFunction() {
  //плавающая шапка
  $(window).scroll(function () {
    if (window.innerWidth <= 640) {
      if ($(window).scrollTop() >= 40) {
        $(".pagecrm_header").addClass("scroll");
      } else {
        $(".pagecrm_header").removeClass("scroll");
      }
    }
  });
}
