var charlieBurger = document.getElementById('charlie-hamburger');
var charlieNav = document.getElementById('charlie-main-nav').querySelector('ul');
charlieBurger.addEventListener('click',function(e) {
  e.preventDefault();
  if (charlieNav.classList) {
    charlieNav.classList.toggle('shown');
  } else {
    var classes = charlieNav.className.split(' ');
    var existingIndex = -1;
    for (var i = classes.length; i--;) {
      if (classes[i] === 'shown') {
        existingIndex = i;
      }
    }
    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push('shown');
    }
    charlieNav.className = classes.join(' ');
  }
});