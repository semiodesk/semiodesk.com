$(document).ready(function() {
  // Enable smooth scrolling.
  new SmoothScroll('a[href*="#"]', { speed: 150 });

  $(".sidenav").focusin(function() {
    $("body").addClass("sidenav-toggled");

    if (gtag) {
      gtag("event", "focus", {
        event_category: "contact"
      });
    }
  });

  $(".sidenav").click(() => {
    if (!$("body").hasClass("sidenav-toggled")) {
      $("#name").focus();
    }
  });

  $(".overlay").click(() => {
    $("body").removeClass("sidenav-toggled");
  });

  $(".sidenav-trigger").click(function(e) {
    if ($(".sidenav").css("position") == "fixed") {
      e.preventDefault();
      $("#name").focus();
    }
  });

  // Initialize the contact form.
  const form = $("#form-contact");

  if (form) {
    $(".form-status-sending").css("display", "none");
    $(".form-status-ok").css("display", "none");
    $(".form-status-error").css("display", "none");

    form.submit(function(e) {
      e.preventDefault();

      if (gtag) {
        gtag("event", "submit", {
          event_category: "contact"
        });

        gtag("event", "generate_lead", {
          event_category: "engagement"
        });
      }

      // Prepare data to send
      data = {
        name: form.find("#name").val(),
        reply_to: form.find("#email").val(),
        organization: form.find("#organization").val(),
        subject: form.find("#subject").val(),
        message: form.find("#message").val()
      };

      $(".btn-submit").prop("disabled", true);
      $(".form-status-sending").css("display", "block");
      $(".form-status-ok").css("display", "none");
      $(".form-status-error").css("display", "none");

      sendEmail(data, function(err, response) {
        if (err) {
          $(".btn-submit").prop("disabled", false);
          $(".form-status-sending").css("display", "none");
          $(".form-status-ok").css("display", "none");
          $(".form-status-error").css("display", "block");
        } else {
          $(".btn-submit").prop("disabled", true);
          $(".form-status-sending").css("display", "none");
          $(".form-status-ok").css("display", "block");
          $(".form-status-error").css("display", "none");
        }
      });
    });

    var sendEmail = function(data, callback) {
      // Construct an HTTP request
      var xhr = new XMLHttpRequest();

      // Callback function
      xhr.onloadend = response => {
        if (response.target.status === 200) {
          callback(false, response.target.response);
        } else {
          callback(true, response.target.response);
        }
      };

      xhr.onerror = response => {
        callback(true, response.target.response);
      };

      xhr.open(form.attr("method"), form.attr("action"), true);
      xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

      // Send the collected data as JSON
      xhr.send(JSON.stringify(data));
    };
  }
});
