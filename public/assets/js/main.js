$( document ).ready(function() {
    console.log( "ready!" );
    $('.carousel').carousel();

  
      // Capture the form inputs
    $("#submit").on("click", function(event) {
        event.preventDefault();
  
        // Form validation
    function validateForm() {
          var isValid = true;
          $(".form-control").each(function() {
            if ($(this).val() === "") {
              isValid = false;
            }
          });
  
          $(".custom-select-sm").each(function() {
  
            if ($(this).val() === "") {
              isValid = false;
            }
          });
          return isValid;
        }
  
        // If all required fields are filled
        if (validateForm()) {
          // Create an object for the user"s data
          var userData = {
            name: $("#name").val(),
            photo: $("#photo").val(),
            scores: [
              $("#q1").val(),
              $("#q2").val(),
              $("#q3").val(),
              $("#q4").val(),
              $("#q5").val(),
              $("#q6").val(),
              $("#q7").val(),
              $("#q8").val(),
              $("#q9").val(),
              $("#q10").val()
            ]
          };
  
          // AJAX post the data to the friends API.
          $.post("/api/friends", userData, function(data) {
  
            $("#match-name").text(data.name);
            $("#match-img").attr("src", data.photo);
  
            // Show the modal with the best match
            $("#results-modal").modal("toggle");
  
          });
        } else {
          alert("Please fill out all fields before submitting!");
        }
      });
});

