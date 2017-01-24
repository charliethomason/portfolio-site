var charlie = charlie || {};

charlie.basics = function() {
  function hamburger() {
    $('#charlie-hamburger').click(function(e) {
      e.preventDefault();
      $('#charlie-main-nav ul').toggleClass('shown');
    });
  }
  function init() {
    hamburger();
  }
  init();
}

$(document).ready(function() {
  charlie.basics();
});