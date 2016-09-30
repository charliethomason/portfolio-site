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

  function filters() {

    $('#gallery-filter').submit(function(e) {
      e.preventDefault();
      var $filterSelect = $(this).find('.filters');
      var $selected = $filterSelect.find(':selected');
      var filter = $selected.val();

      $('.img-li').each(function() {
        var filters = $(this).attr('data-filters');
        if (filter == 'all') {
          $(this).show();
        } else {
          if (filters.indexOf(filter) > -1) {
            $(this).show();
          } else {
            $(this).hide();
          }
        }
      });
    });
  }

  function galleryView() {
    if (charlie.storageSupport() === true && sessionStorage.getItem('gallery-view')) {
      var viewType = sessionStorage.getItem('gallery-view');
      $('.gallery-wrap').removeClass('list grid').addClass(viewType);
      $('input[name="view"][value="'+viewType+'"]').prop('checked',true);
    }
    $('input[name="view"]').change(function() {
      if (this.value == 'grid') {
        $('.gallery-wrap').removeClass('list').addClass('grid');
        if (charlie.storageSupport() === true) {
          sessionStorage.setItem('gallery-view','grid');
        }
      } else if (this.value == 'list') {
        $('.gallery-wrap').removeClass('grid').addClass('list');
        if (charlie.storageSupport() === true) {
          sessionStorage.setItem('gallery-view','list');
        }
      }
    });
  }

  function init() {
    filters();
    galleryView();
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

charlie.birdGallery = function() {
  var $wrap = $('.gallery-page');
  var $hider = $('#hide-slideshow');
  function slideCreate() {
    $hider.show();
    $wrap.removeClass('bird-list').addClass('bird-slideshow');
    $('.img-section').removeClass('section-active');
    $('.img-section:first-child').addClass('section-active');
    if (charlie.storageSupport() === true) {
      sessionStorage.setItem('bird-gallery','slideshow');
    }
  }
  function slideDestroy() {
    $hider.hide();
    $('.img-section').removeClass('section-active');
    $wrap.removeClass('bird-slideshow').addClass('bird-list');
    if (charlie.storageSupport() === true) {
      sessionStorage.setItem('bird-gallery','list');
    }
  }
  function galleryView() {
    if (charlie.storageSupport() == true && sessionStorage.getItem('bird-gallery')) {
      var viewType = sessionStorage.getItem('bird-gallery');
      $('input[name="view"][value="'+viewType+'"]').prop('checked',true);
      if (viewType == 'slideshow') {
        slideCreate();
      } else if (viewType == 'list') {
        slideDestroy();
      }
    } else {
      if ($wrap.hasClass('bird-slideshow')) {
        slideCreate();
      }
    }
    $('input[name="view"]').change(function() {
      if (this.value == 'slideshow') {
        slideCreate();
      } else if (this.value == 'list') {
        slideDestroy();
      }
    });
  }
  function clickEvents() {
    $('.img-inpage').click(function(e) {
      if ($wrap.hasClass('bird-list')) {
        e.preventDefault();
        toggleLightbox(this);
      }
    });
    $('.img-close').click(function(e) {
      if ($wrap.hasClass('bird-list')) {
        e.preventDefault();
        e.stopPropagation();
        toggleLightbox($(this).parents('.img-section').find('.img-inpage'));
      }
    });
    $('.img-info').click(function(e) {
      if ($wrap.hasClass('bird-slideshow')) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('show-info');
      }
    });
    $hider.click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('input[name="view"][value="list"]').prop('checked',true);
      slideDestroy();
    });
    $('.img-section').on('swipeleft click', function(e) {
      nextBird(this);
    }).on('swiperight', function(e) {
      prevBird(this);
    });
  }
  function nextBird(bird) {
    $(bird).removeClass('section-active');
    if ($(bird).is(':last-child')) {
      $('.img-section:first-child').addClass('section-active');
    } else {
      $(bird).next('.img-section').addClass('section-active');
    }
  }
  function prevBird(bird) {
    $(bird).removeClass('section-active');
    if ($(bird).is(':first-child')) {
      $('.img-section:last-child').addClass('section-active');
    } else {
      $(bird).prev('.img-section').addClass('section-active');
    }
  }
  function toggleLightbox(target) {
    $(target).toggleClass('fixed-lightbox');
  }
  function init() {
    galleryView();
    clickEvents();
  }
  init();
}

charlie.storageSupport = function() {
  var test = 'test';
  try {
    sessionStorage.setItem(test,test);
    sessionStorage.removeItem(test);
    return true;
  } catch(e) {
    return false;
  }
}

$(document).ready(function() {
  charlie.basics();
  if ($('.gallery').length) {
    charlie.gallery();
  }
  if ($('.gallery-page').length) {
    if ($('.birds-wrap').length) {
      charlie.birdGallery();
    } else {
      charlie.galleryPage();
    }
  }
});