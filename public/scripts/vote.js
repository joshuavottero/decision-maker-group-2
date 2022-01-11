$(document).ready(function() {

  $('div.vote-items').on('dragstart', function(event) {
    event.originalEvent.dataTransfer.setData('text/plain', event.target.id);

    event.currentTarget.style.backgroundColor = 'yellow';
  });

  $('div.rank-options').on('dragover', function(event) {
    event.preventDefault();
  });

  $('div.rank-options').on('drop', function(event) {
    const id = event.originalEvent.dataTransfer.getData('text');

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);

    event.originalEvent.dataTransfer.clearData();
  });

  $('button#form-submit-button').on('mouseover', function(event) {
    const $voteItems = $('div.vote-items');
    const totalPoints = [];

    for (let i = 0; i < $voteItems.length; i++) {
      const points = $voteItems.length - i;
      totalPoints.push(points);
    }
  });

});
