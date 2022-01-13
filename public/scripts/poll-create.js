//const { render } = require("ejs");

$(document).ready(function() {
  var max_fields      = 10; //maximum input boxes allowed
  var wrapper   		= $(".input_fields_wrap"); //Fields wrapper
  var add_button      = $(".add_field_button"); //Add button ID

  var x = 1; //initlal text box count
  $(add_button).click(function(e){ //on add input button click
  e.preventDefault();
      if(x < max_fields){ //max input box allowed
          x++; //text box increment
          $(wrapper).append(`
            <div class="input-group mb-3">
              <div class="input-group-append poll-form-item">
                Option <input placeholder="Enter Option" type="text" name="label" class="form-control form-textarea"><span >characters remaining</span> <output name="counter" class="counter" for="poll-form-text">20</output>
              </div>
              <div class="input-group-append poll-form-item">
                Description <input placeholder="Enter Description" type="text" name="labelDescription" class="form-control form-textarea"> <span >characters remaining</span> <output name="counter" class="counter" for="poll-form-text">20</output>
              </div>
              <div class="input-group-append">
                <button class="btn btn-outline-danger remove_field" type="button">Remove Option/Description</button>\
              </div>
            </div>
          `); //add input box
          $('.form-textarea').on("input", onInput);

      }
  });
  const onInput = function() {
    const $input = $(this);
    const length = $input.val().length;
    const charLeft = 20 - length;

    const $form =  $input.parent();
    const $counter = $form.find(".counter");
    $counter.html(charLeft);

    if (charLeft < 0) {
      return $counter.addClass("red-color");
    }
    return $counter.removeClass("red-color");
  };
  $(".form-textarea").on("input", onInput);




  $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
      e.preventDefault(); $(this).parent('div').parent('div').remove(); x--;
  })

  const $form = $('#polls-form');
  $form.submit(function( event ) {
    // $(".error").css("display", "none");
    alert("hi");
    alert("hi2");
    event.preventDefault();
    const formData = $(this).serialize();

    //Serialize data from form
    const dataSerialized = unescape($(this).serialize());

    //Validate tweet length. 'text=' needs to be desconsiderated as comes with serialized default message
    if (dataSerialized === 'text=') {
      $(".error").text("Did you write a message?").slideDown();
      // 140 characters + 5 ('text=')
    } else if (dataSerialized.length > 145) {
      $(".error").text("Too long! Your post should have no more than 140 characters!").slideDown();
    } else {
      $.ajax("/polls/", {data: formData, method: "POST"})
      .then(function () {
        render("polls");
      })
    }
  });

  // //Escape Function to deal with insecure text
  const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
  };
});
