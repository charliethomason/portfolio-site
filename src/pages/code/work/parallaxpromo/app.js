$(document).ready(function() {

  // Determines if on a mobile device
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Silk|Opera Mini/i.test(navigator.userAgent);

  // Set the height of the YouTube Video and 1st Section
  sectionHeights();

  // Resizing the window resets whether the footer links should be shown or collapsed
  var resizeId;
  $(window).resize(function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(resizeEvents, 500);
  });

  if(isMobile) {
    $('#youtube-video .poster').hide();
    $('#youtube-video').addClass('mobile');
    $('.social-btns').hide();
    $('.trullix-btns').hide();
  }

  if(!isMobile) {
    $('.social-btn').click(function(e) {
      e.preventDefault();
      var channel = $(this).data('social');
      window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    });
  }

  $(window).on('scroll', function() {

    var winHeight = ($(window).height());
    var winWidth = $(window).width();
    var scrollPos = $(window).scrollTop(); // current scroll position

    if(winWidth > 960) {

      if(!isMobile) {
        $('.section-img').each(function() {
          var fixedHeight = $('#gotcha').outerHeight();
          var sectionTop = ($(this).offset().top - fixedHeight) ; // top of the section
          var sectionBottom = sectionTop + $(this).height(); // bottom of the section
          var visHeight = ((sectionTop - scrollPos) * -1); // value used to create scrolling parallax effect

          // IF the top of the section is at or above the top of the window
          // AND the bottom of the section is below the window,
          // slowly move the background image downwards.
          if(sectionTop <= scrollPos && sectionBottom > scrollPos) {
            $(this).addClass('visible');
            $(this).css('background-position', 'right ' + (visHeight/2) + 'px');

          // IF the bottom of the section is above the top of the window,
          // OR the top of the section hasn't reached the top of the window,
          // keep the background-image in the normal position
          } else if(sectionBottom < scrollPos || sectionTop > scrollPos) {
            $(this).removeClass('visible');
            $(this).css('background-position', 'right 0');
          }
        });
      }

      if(scrollPos >= winHeight) {
        $('#gotcha:not(.fixed)').addClass('fixed');
        $('#section2:not(.fixed)').addClass('fixed');
      } else if(scrollPos < winHeight) {
        $('#gotcha.fixed').removeClass('fixed');
        $('#section2.fixed').removeClass('fixed');
      }

    } else if(winWidth <= 960) {

      var sectionHeight = ($('#youtube-video').outerHeight() + 
                           $('#section1-mobile').outerHeight() +
                           $('#gotcha .promo-text').outerHeight());
      if(scrollPos >= sectionHeight) {
        $('#gotcha:not(.fixed)').addClass('fixed');
        $('#section2:not(.fixed)').addClass('fixed');
      } else if(scrollPos < sectionHeight) {
        $('#gotcha.fixed').removeClass('fixed');
        $('#section2.fixed').removeClass('fixed');
      }

    }

  });

  // MOTO X BUTTON TOGGLE

  $('.trullix-btn').click(function(e) {
    e.preventDefault();
    var btnId = $(this).attr('id');
    var $phone1 = $('#phone-trullix1');
    var $phone2 = $('#phone-trullix2');
    switch(btnId) {
      case 'trullix1-btn1':
        $phone1.css('background-position','0 0');
        break;
      case 'trullix1-btn2':
        $phone1.css('background-position','0 -435px');
        break;
      case 'trullix1-btn3':
        $phone1.css('background-position','0 -870px');
        break;
      case 'trullix1-btn4':
        $phone1.css('background-position','0 -1305px');
        break;
      case 'trullix1-btn5':
        $phone1.css('background-position','0 -1740px');
        break;
      case 'trullix2-btn1':
        $phone2.css('background-position','0 0');
        break;
      case 'trullix2-btn2':
        $phone2.css('background-position','0 -436px');
        break;
      case 'trullix2-btn3':
        $phone2.css('background-position','0 -872px');
        break;
      case 'trullix2-btn4':
        $phone2.css('background-position','0 -1308px');
        break;
    }
  });

  $('.down-arrow').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    scrollToGotcha(3500);
  });

  if(window.location.hash === '#offer') {
    scrollToGotcha('fast');
  }
  
});

function resizeEvents() {
  sectionHeights();
}

// Set the heights of the YouTube video and 1st Section
function sectionHeights() {
  var winWidth = $(window).width();
  var winHeight = $(window).height();
  var $video = $('#youtube-video');
  var $section1 = $('#section1-mobile');
  if(winWidth <= 960) {
    resetBackgrounds();
    if(winWidth < winHeight) {
      // mobile portrait
      var winHeight = winHeight - 115;
      var vidHeight = winHeight * 0.40691; // 40.691% = 212 / 521
      var secHeight = winHeight * 0.59309; // 59.309% = 309 / 521
      $video.css('height', vidHeight + 'px');
      $section1.css('height', secHeight + 'px');
    } else if (winWidth > winHeight) {
      // mobile landscape
      var winHeight = winHeight - 115;
      $video.css('height', winHeight + 'px');
      $section1.css('height', '309px');
    }
  } else if(winWidth > 960) {
    var winHeight = winHeight - 115;
    $video.css('height', winHeight + 'px');
  }
}

// Reset the background positions to their original spot
function resetBackgrounds() {
  $('.trullix-phone').css('background-position', '');
  $('.section-img').css('background-position', '50% 0');
}

// youtube ready
function onYouTubeIframeAPIReady() {
  var vid = $('#youtube-video').attr('data-youtube');
  YouTubePlayer.attachPlayer(vid);
}

function scrollToGotcha(speed) {
  $('html, body').animate({
    scrollTop: ($('#gotcha').offset().top)
  }, speed);
}

// YouTube Player Embed API
// reference: https://developers.google.com/youtube/iframe_api_reference
YouTubePlayer = {
  player: '',
  poster: $('#youtube-video .poster'),
  endCard: $('#youtube-video .endcard'),
  // attach the player to the #player div
  attachPlayer: function(vid) {
    YouTubePlayer.player = new YT.Player('player', {
      videoId: vid,
      playerVars: { 
        controls: 1, 
        showinfo: 0, 
        disablekb: 1,
        wmode: 'opaque'
      },
      events: {
        'onReady': YouTubePlayer.listener,
        'onStateChange': YouTubePlayer.change
      }
    });
  },
  // If you click on the poster image, trigger the play event
  listener: function() {
    $('#youtube-video .poster').addClass('ready');
    $('#youtube-video .poster').on({
      click: function(e) {
        YouTubePlayer.play();
        var elem = document.getElementById("youtube-video");
        if(!elem.fullscreenElement && !elem.mozFullScreenElement && !elem.webkitFullscreenElement && !elem.msFullscreenElement) {
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
          }
        }
      }
    });
  },
  // Event handlers for actions related to the video player
  change: function(youtubeEvent) {
    var state = youtubeEvent.data;
    switch(state) {
      case -1: 
        // (unstarted)
        break;
      case 0:
        // (ended)
        if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
        YouTubePlayer.endCard.show();
        scrollToGotcha(3500);
        break;
      case 1:
        // (playing)
        break;
      case 2:
        // (paused)
        break;
      case 3:
        // (buffering)
        break;
      case 5:
        // (video cued)
        break;
      default: 
        // do nothing
    }
  },
  // Hide the poster image and play the video
  play: function() {
    YouTubePlayer.poster.hide();
    YouTubePlayer.player.playVideo();
  }
}