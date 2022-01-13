$(document).ready(function() {
  const $voteItems = $('div.vote-options').find('div.vote-items');

  $('input#vote-input').hide();

  $('div.vote-items').on('dragstart', function(event) {
    event.originalEvent.dataTransfer.setData('text/plain', event.target.id);
  });

  $('div.rank-options').on('dragover', function(event) {
    event.preventDefault();
  });

  $('div.rank-options').on('drop', function(event) {
    const id = event.originalEvent.dataTransfer.getData('text');

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.append(draggableElement);

    event.originalEvent.dataTransfer.clearData();
  });

  $('button#form-submit-button').on('mouseover', function(event) {
    const $rankItems = $('div.rank-options').find('div.vote-items');
    const totalPoints = {};

    for (let i = 0; i < $rankItems.length; i++) {
      const id = $($rankItems[i]).attr('id').slice(-1);
      const points = $rankItems.length - i;
      totalPoints[id] = points;
    }
    const formData = JSON.stringify(totalPoints);
    console.log(formData);
    $('input#vote-input').val(formData);
    console.log($('input#vote-input').val());
  });

  $('button#form-submit-button').on('click', function(event) {
    const $voteItems = $('div.vote-options').find('div.vote-items');

    if ($voteItems.length >= 1 && $('p.vote-error').length <= 0) {
      $('<p>', {
        class: 'vote-error',
        text: '   Please rank all options'
      }).insertAfter('div.vote-ranking');

      $('<i>', {
        class: 'fa-solid fa-circle-exclamation'
      }).prependTo('p.vote-error');
    }
  });

  $(document).on('submit', 'form.vote-form', function(event){
    const $voteItems = $('div.vote-options').find('div.vote-items');

    if ($voteItems.length <= 0) {
      $('p.vote-error').hide();
      $('button#form-submit-button').hide();

      $('<p>', {
        id: 'submit-alert',
        text: 'Thanks for voting!   '
      }).insertAfter('div.vote-ranking');

      $('<i>', {
        class: 'fa-regular fa-face-smile-wink'
      }).appendTo('p#submit-alert');

      setTimeout(function() {
        window.location.href = '/polls';
      }, 3000);
    }
  });

});
