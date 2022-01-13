(function($) {
  $(document).ready(() => {
    $(".form-textarea").on("input", onInput);
  });

  const onInput = function(){
    console.log("hi");
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

})(jQuery);
