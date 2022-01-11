$(document).ready(function() {

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
    const $voteItems = $('div.rank-options').find('div.vote-items');
    const totalPoints = {};

    for (let i = 0; i < $voteItems.length; i++) {
      const id = $($voteItems[i]).attr('id').slice(-1);
      const points = $voteItems.length - i;
      totalPoints[id] = points;
    }
    const formData = JSON.stringify(totalPoints);
    console.log(formData);
    $('input#vote-input').val(formData);
    console.log($('input#vote-input').val());
  });

  $('button#form-submit-button').on('click', function(event) {
    const $rankItems = $('div.rank-options').find('div.vote-items');
    const $voteItems = $('div.vote-options').find('div.vote-items');

    if ($rankItems.length < $voteItems.length && $('p.vote-error').length <= 0) {

      $('<p>', {
        class: 'vote-error',
        text: 'Please rank all options'
      }).appendTo('form.reset-button');
    }
  });

});
