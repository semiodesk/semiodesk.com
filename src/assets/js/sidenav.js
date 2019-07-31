(() => {
  const body = $("body");
  const transition = "transition";
  const touched = "sidenav-touched";
  const open = "sidenav-open";

  $(".btn-toggle-sidenav").click(() => {
    body.addClass(touched);
    body.toggleClass(open);
  });

  $(".btn-open-sidenav").click(() => {
    body.addClass(touched);
    body.addClass(open);
  });

  $(".btn-close-sidenav").click(() => {
    body.addClass(touched);
    body.removeClass(open);
  });

  var timer;

  $(window).bind("load resize", () => {
    body.removeClass(transition);

    clearTimeout(timer);

    timer = setTimeout(() => {
      body.addClass(transition);
    });

    if (!body.hasClass(touched)) {
      if ($(window).width() > 1200) {
        body.addClass(open);
      } else {
        body.removeClass(open);
      }
    }
  });
})();
