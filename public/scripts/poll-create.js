

$(document).ready(function() {
  var max_fields      = 10; //maximum input boxes allowed
  var wrapper   		= $(".input_fields_wrap"); //Fields wrapper
  var add_button      = $(".add_field_button"); //Add button ID

  var x = 3; //initlal text box count
  $(add_button).click(function(e){ //on add input button click
  e.preventDefault();
      if(x < max_fields){ //max input box allowed
          x++; //text box increment
          $(wrapper).append(`
            <div class="input-group mb-3">
              <div class="input-group-append poll-form-item">
                Option * <input placeholder="Enter Option" type="text" name="label" id="option" class="form-control form-textarea poll-form-option"><span >characters remaining</span> <output name="counter" class="counter" for="poll-form-text">20</output>
              </div>
              <div class="input-group-append poll-form-item">
                Description <input placeholder="Enter Description" type="text" name="labelDescription" class="form-control form-textarea poll-form-option-description"> <span >characters remaining</span> <output name="counter" class="counter" for="poll-form-text">20</output>
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

    event.preventDefault();



    const maxCharLength = 20;
    let error = "";





    // lets check name feld to see if is are good
    $form.find("#poll-form-name").each(function () {
      const nameLength = this.value.length
      if (nameLength > maxCharLength) {
        error = "name has too many chars";
      }
    });



    // lets check email feld to see if its good
    $form.find("#poll-form-email").each(function () {
      const emailLength = this.value.length
      if (emailLength <= 0) {
        error = "email is empty";
      }
      else if (emailLength > maxCharLength) {
        error = "email has too many chars"
      }
    });

     // lets check title feld to see if its good
     $form.find("#poll-form-title").each(function () {
      const titleLength = this.value.length
      if (titleLength <= 0 ) {
        error = "title is empty"
      }
      else if (titleLength > maxCharLength) {
        error = "title has too many chars"
      }

    });

    // lets check if the date is good
    const date = $form.find("#poll-form-date").val()

    if (date === "") {
      error = "date was not entered";
    }
    else if (new Date(date).getTime() <= Date.now()) {
      error = "date has to be tomorrow or later";
    }

    // lets check all options felds to see if they are good
    $form.find(".poll-form-option").each(function () {
      const optionLength = this.value.length;
      if (optionLength <= 0){
        error = `a option is empty`;
      }
      else if (optionLength > maxCharLength) {
        error = `a option has too many chars`;
      }
    });

    // lets check all options description felds to see if they are good
    // we are only checking to see if they go over the maxCharLength
    $form.find(".poll-form-option-description").each(function () {
      const optionLength = this.value.length;
      if (optionLength > maxCharLength){
        error = `a option description has too many chars`;
      }
    });
    if (error) {
      alert(error);
    }
    else {
      const formData = $(this).serialize();
      $.ajax("/polls/", {data: formData, method: "POST"})
    }

    //Serialize data from form
    // const dataSerialized = unescape($(this).serialize());

    // //Validate tweet length. 'text=' needs to be desconsiderated as comes with serialized default message
    // if (dataSerialized === 'text=') {
    //   $(".error").text("Did you write a message?").slideDown();
    //   // 140 characters + 5 ('text=')
    // } else if (dataSerialized.length > 145) {
    //   $(".error").text("Too long! Your post should have no more than 140 characters!").slideDown();
    // } else {
    //
    //   //window.history.back();
    //   //restore ajex later
    //
    // }
  });

  // //Escape Function to deal with insecure text
  // const escape = function(str) {
  // let div = document.createElement("div");
  // div.appendChild(document.createTextNode(str));
  // return div.innerHTML;
  // };
});
