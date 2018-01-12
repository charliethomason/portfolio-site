var charlie = charlie || {};
charlie.init = function() {
  function init() {
    var charlieBurger = document.getElementById('charlie-hamburger');
    var charlieNav = document.querySelector('#charlie-main-nav ul');
    charlieBurger.addEventListener('click', function(e) {
      e.preventDefault();
      var shown = charlieNav.getAttribute('data-show');
      if (shown === 'true') {
        charlieNav.setAttribute('data-show', 'false');
      } else {
        charlieNav.setAttribute('data-show', 'true');
      }
    });
  }
  init();
}
charlie.isReady = function() {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    charlie.init();
  } else {
    document.addEventListener('DOMContentLoaded', charlie.init);
  }
};
charlie.isReady();