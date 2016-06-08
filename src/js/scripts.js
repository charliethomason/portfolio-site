var charlie = charlie || {};

charlie.basics = function() {
  function hamburger() {
    $('#hamburger').click(function(e) {
      e.preventDefault();
      $('#main-nav ul').toggleClass('shown');
    });
  }
  function init() {
    hamburger();
  }
  init();
}

charlie.gallery = function() {

  var $lightbox = $('.lightbox'),
      $lightboxContent = $lightbox.find('.lightbox-content');
      $lightboxImg = $lightbox.find('.lightbox-img img'),
      $lightboxTitle = $('h1'),
      defaultTitle = $lightboxTitle.text(),
      $lightboxYear = $lightbox.find('.lightbox-year'),
      $lightboxMedium = $lightbox.find('.lightbox-medium'),
      $lightboxDescription = $lightbox.find('.lightbox-description'),
      $lightboxLocationWrap = $lightbox.find('.lightbox-location-wrap'),
      $lightboxLocation = $lightboxLocationWrap.find('.lightbox-location'),
      $loading = $('.lightbox-loading'),
      $sort = $('.sort-method'),
      $grid = $('.grid'),
      monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function clickEvents() {
    // $('.galleryImg').click(function(e) {
    //   e.preventDefault();
    //   loadImageData(this,openLightbox);
    // });
    // $('.info').click(function(e) {
    //   if ($(this).siblings('.galleryImg').length) {
    //     var img = $(this).siblings('.galleryImg');
    //     loadImageData(img,openLightbox);
    //   } else if ($(this).siblings('.galleryPage').length) {
    //     var page = $(this).siblings('.galleryPage').attr('href');
    //     window.open(page,'_self');
    //   }
    // });
    $('.close-btn').click(function(e) {
      e.preventDefault();
      closeLightbox();
    });
    $('.prev-btn').click(function(e) {
      e.preventDefault();
      loadPrevImg();
    });
    $('.next-btn').click(function(e) {
      e.preventDefault();
      loadNextImg();
    });
    $('.sort-method a').click(function(e) {
      e.preventDefault();
      gallerySort(this);
    });
    $('.lightbox-img').click(function(e) {
      e.preventDefault();
      fixedLightbox();
    });
  }

  function loadImageData(img,callback) {
    var $image = $(img),
        imgFile = $image.attr('href'),
        imgID = $image.attr('data-id'),
        $info = $image.siblings('.info'),
        imgTitle = $info.find('.title').text(),
        year = $info.find('.year').text(),
        medium = $info.find('.medium').text(),
        description = $info.find('.description').html();
    $('.grid:visible').hide();
    $('.sort-method:visible').hide();
    $lightboxContent.hide();
    $loading.show();
    $lightboxImg.attr('src',imgFile);
    $lightboxImg.attr('alt',imgTitle);
    $lightboxTitle.text(imgTitle);
    $lightboxMedium.text(medium);
    $lightboxDescription.html(description);
    $lightbox.attr('data-id',imgID);
    if ($info.find('.location').length) {
      var imgLocation = $info.find('.location').text();
      $lightboxLocation.text(imgLocation);
      $lightboxLocation.attr('href','http://maps.google.com/maps?q='+imgLocation);
      $lightboxLocationWrap.show();
    }
    if ($info.find('.month').length) {
      var month = $info.find('.month').text();
      var monthName = monthNames[(month - 1)];
      $lightboxYear.text(monthName + ' ' + year);
    } else {
      $lightboxYear.text(year);
    }
    location.href = '#' + imgID;
    if (callback) {
      callback();
    }
  }

  function openLightbox() {
    $lightbox.imagesLoaded(function() {
      $loading.hide();
      $lightboxContent.show();
      $('.lightbox:hidden').show();
    });
  }

  function closeLightbox() {
    $lightbox.hide();
    $lightbox.attr('data-id','');
    $lightboxImg.attr('src','');
    $lightboxImg.attr('alt','');
    $lightboxTitle.text(defaultTitle);
    $lightboxYear.text('');
    $lightboxMedium.text('');
    $lightboxDescription.text('');
    $lightboxLocation.text('');
    $lightboxLocation.attr('href','http://maps.google.com/maps?q=');
    $lightboxLocationWrap.hide();
    location.href = '#';
    $sort.show();
    $grid.show();
  }

  function loadPrevImg() {
    var $currentImg = $('.galleryImg[data-id="' + $lightbox.attr('data-id') + '"]'),
        prevImg = $currentImg.parent('li').prev('li.galleryImg-li').find('.galleryImg');
    if (prevImg.length) {
      loadImageData(prevImg,openLightbox);
    } else {
      var lastImg = $('.galleryImg:last');
      loadImageData(lastImg,openLightbox);
    }
  }

  function loadNextImg() {
    var $currentImg = $('.galleryImg[data-id="' + $lightbox.attr('data-id') + '"]'),
        nextImg = $currentImg.parent('li').next('li.galleryImg-li').find('.galleryImg');
    if (nextImg.length) {
      loadImageData(nextImg,openLightbox);
    } else {
      var firstImg = $('.galleryImg:first');
      loadImageData(firstImg,openLightbox);
    }
  }

  function hashOpen() {
    if (window.location.hash) {
      var urlHash = window.location.hash.replace('#','');
      if (urlHash === 'random') {
        randomArt();
      } else {
        var img = $('.galleryImg[data-id="' + urlHash + '"]');
        loadImageData(img,openLightbox);
      }
    }
  }

  function keyboardNav() {
    $(document).keydown(function(e) {
      if ($lightbox.is(':visible')) {
        switch(e.keyCode) {
          case 37:
            e.preventDefault();
            loadPrevImg();
            break;
          case 39:
            e.preventDefault();
            loadNextImg();
            break;
        }
      }
      if ($('.lightbox-img').hasClass('fixed-lightbox') && e.keyCode == 27) {
        e.preventDefault();
        fixedLightbox();
      }
    });
  }

  function randomArt() {
    var max = $('.galleryImg').length,
        min = 0,
        imageNum = Math.round(Math.random() * (max - min)) + min;
        img = $('.galleryImg').eq(imageNum);
    loadImageData(img,openLightbox);
  }

  function gallerySort(link) {
    if (!$(link).hasClass('active')) {

      var method = $(link).attr('id'),
          $imgLi = $grid.children('li.img-li');

      $sort.find('.active').removeClass('active');
      $(link).addClass('active');

      $imgLi.sort(function(a,b) {
        switch(method) {
          case 'sort-title':
            var an = $(a).find('.title').text();
                bn = $(b).find('.title').text();
            break;
          case 'sort-newest':
            var bn = a.getAttribute('data-year'),
                an = b.getAttribute('data-year');
            break;
          case 'sort-oldest':
            var an = a.getAttribute('data-year'),
                bn = b.getAttribute('data-year');
            break;
        }
        if (an > bn) {
          return 1;
        }
        if (an < bn) {
          return -1;
        }
        return 0;
      });

      $imgLi.detach().appendTo($grid);

    }
  }

  function fixedLightbox() {
    $('.lightbox-img').toggleClass('fixed-lightbox');
  }

  function init() {
    clickEvents();
    hashOpen();
    keyboardNav();
  }
  init();

}

charlie.galleryPage = function() {
  function clickEvents() {
    $('.img-inpage').click(function(e) {
      e.preventDefault();
      toggleLightbox(this);
    });
    $('.img-inpage h2').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
    $('.img-close').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleLightbox($(this).parents('.img-section').find('.img-inpage'));
    });
    $('.img-prev').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      loadPrevImg($(this).parents('.img-section').find('.img-inpage'))
    });
    $('.img-next').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      loadNextImg($(this).parents('.img-section').find('.img-inpage'));
    });
    $('.trigger-lightbox').click(function(e) {
      e.preventDefault();
      toggleLightbox($('.img-inpage:first'));
    });
  }
  function toggleLightbox(target) {
    $(target).toggleClass('fixed-lightbox');
  }
  function loadPrevImg($current) {
    var $prev = $current.parent('.img-section').prev('.img-section').find('.img-inpage');
    $current.removeClass('fixed-lightbox');
    if ($prev.length) {
      $prev.addClass('fixed-lightbox');
    } else {
      var $last = $('.img-inpage:last');
      $last.addClass('fixed-lightbox');
    }
  }
  function loadNextImg($current) {
    var $next = $current.parent('.img-section').next('.img-section').find('.img-inpage');
    $current.removeClass('fixed-lightbox');
    if ($next.length) {
      $next.addClass('fixed-lightbox');
    } else {
      var $first = $('.img-inpage:first');
      $first.addClass('fixed-lightbox');
    }
  }
  function keyboardNav() {
    $(document).keydown(function(e) {
      if ($('.fixed-lightbox').length) {
        var $current = $('.img-inpage.fixed-lightbox');
        if (e.keyCode == 27) {
          e.preventDefault();
          toggleLightbox($current);
        }
        if (e.keyCode == 37) {
          e.preventDefault();
          loadPrevImg($current);
        }
        if (e.keyCode == 39) {
          e.preventDefault();
          loadNextImg($current);
        }
      }
    });
  }
  function init() {
    clickEvents();
    keyboardNav();
  }
  init();
}

$(document).ready(function() {
  charlie.basics();
  if ($('.gallery').length) {
    charlie.gallery();
  }
  if ($('.gallery-page').length) {
    charlie.galleryPage();
  }
});