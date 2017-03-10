function slider(element, itemsToScroll) {
    
  var x, 
      left, 
      down = false,
      dragging = false,
      links = element.querySelectorAll('a'),
      parent = element.parentNode,
      leftBtn = parent.querySelector('.slider-btn-left'),
      rightBtn = parent.querySelector('.slider-btn-right'),
      slideDuration = 500; // animation duration for slider arrow button easing effect

  element.addEventListener('mousedown',function(e) {
    e.preventDefault(); // required to prevent image dragging in firefox
    x = e.pageX;
    left = element.scrollLeft;
    down = true;
  });
  element.addEventListener('touchstart',function(e) {
    x = e.touches[0].pageX;
    left = element.scrollLeft;
    down = true;
  });
  element.addEventListener('mousemove',function(e) {
    if (down) {
      var newX = e.pageX;
      element.scrollLeft = (left-newX+x);
      dragging = true; // disable link click while dragging
    }
  });
  element.addEventListener('touchmove',function(e) {
    if (down) {
      var newX = e.touches[0].pageX;
      element.scrollLeft = (left-newX+x);
      dragging = true; // disable link click while dragging
    }
  });
  element.addEventListener('mouseup',function(e) {
    down = false;
    // wait half a second before re-enabling link click
    window.setTimeout(function() {
      dragging = false;
    },500);
  });
  element.addEventListener('touchend',function(e) {
    down = false;
    // wait half a second before re-enabling link click
    window.setTimeout(function() {
      dragging = false;
    },500);
  });

  for (var i=0;i<links.length;i++) {
    links[i].addEventListener('click', _disableLinks);
  }

  leftBtn.addEventListener('click', _moveSlider);
  rightBtn.addEventListener('click', _moveSlider);
  element.addEventListener('scroll', _toggleBtns);

  // move the slider left/right when clicking the arrow buttons
  function _moveSlider(event) {
    event.preventDefault();

    var location,
        btn = (event.target.tagName === 'svg') ? event.target.parentNode : event.target,
        item = element.querySelectorAll('.slider-item')[0],
        style = getComputedStyle(item),
        itemWidth = (parseInt(style.width) + parseInt(style.marginLeft) + parseInt(style.marginRight)),
        scrollDistance = itemWidth * itemsToScroll,
        currScroll = element.scrollLeft;

    // scroll the slider a distance equal to the width + margin of first element in slider
    if (btn.classList.contains('left')) {
      location = (currScroll - scrollDistance);
    } else {
      location = (currScroll + scrollDistance);
    }
    _scrollTo(location, slideDuration);

  }

  // animation for arrow button scroll
  function _scrollTo(to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollLeft;
    var perTick = difference / duration * 10;

    setTimeout(function() {
      element.scrollLeft = element.scrollLeft + perTick;
      if (element.scrollLeft == to) return;
      _scrollTo(to, duration - 10);
    }, 10);
  }

  // show/hide left & right arrow buttons when scroll reaches farthest end
  function _toggleBtns() {
    if (window.innerWidth >= 960) {
      var sliderWidth = element.offsetWidth,
          scrollWidth = element.scrollWidth,
          currScroll = element.scrollLeft;

      // if slider is scrolled all the way to the left, hide the left arrow button
      if (currScroll === 0) {
        leftBtn.style.display = 'none';
      } else {
        leftBtn.style.display = '';
      }
      // if slider is scrolled all the way to the right, hide the right arrow button
      if (currScroll === (scrollWidth - sliderWidth)) {
        rightBtn.style.display = 'none';
      } else {
        rightBtn.style.display = '';
      }
      // NOTE: keep rightBtn conditional separate from leftBtn conditional above,
      // so that both buttons are hidden if not enough items in slider to allow scrolling
    }
  }
  _toggleBtns();

  // trigger _toggleBtns function on resize in case button(s) should be hidden at certain resolutions
  // TODO - replace with resize event handler
  // Services.ResizeService.addCallback(function(){
  //   _toggleBtns();
  // });

  // disable link click when slider is being dragged
  function _checkLinkDisable() {
    return function() {
      _disableLinks();
    };
  }
  function _disableLinks(event) {
    if (dragging) {
      event.preventDefault();
    }
  }

  // disable side scrolling on non-webkit browsers to prevent horizontal scrollbars
  function _browserDetect() {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    if (!isChrome && !isSafari) {
      element.style.overflowX = 'hidden';
    }
  }
  _browserDetect();
}