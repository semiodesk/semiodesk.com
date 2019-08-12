$(document).ready(function() {
  // Enable smooth scrolling.
  new SmoothScroll('a[href*="#"]', { speed: 150 });

  $(".sidenav").focusin(function() {
    $("body").addClass("sidenav-toggled");
  });

  $(".sidenav").click(() => {
    $("body").addClass("sidenav-toggled");
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

    $(".btn-submit").click(function(e) {
      form.submit();
    });

    form.submit(function(e) {
      e.preventDefault();

      // Prepare data to send
      const data = {};
      const formElements = Array.from(form);
      formElements.map(input => (data[input.name] = input.value));

      // Log what our lambda function will receive
      console.log(formElements, JSON.stringify(data));

      $(".btn-submit").prop("disabled", true);
      $(".form-status-sending").css("display", "block");
      $(".form-status-ok").css("display", "none");
      $(".form-status-error").css("display", "none");
      $("body").addClass("sidenav-toggled");

      return;

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

          form.reset();
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

      xhr.open(form.method, form.action, true);
      xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

      // Send the collected data as JSON
      xhr.send(JSON.stringify(data));
    };
  }
});
