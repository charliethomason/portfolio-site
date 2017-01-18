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

  function clickEvents() {
    $('.single-img').click(function(e) {
      e.preventDefault();
      $(this).toggleClass('fixed-lightbox');
    });
  }

  function filters() {
    if ($("#gallery-filter").length) {
      $('#filters').change(function(e){
        e.preventDefault();
        var $filterSelect = $(this);
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
    if (!$('body').hasClass('birds-wrap') && !$('#content').hasClass('code')) {
      filters();
      galleryView();
      clickEvents();
    }
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
  function clickEvents() {
    $('.img-inpage').click(function(e) {
      e.preventDefault();
      toggleLightbox($(this));
    });
  }
  function toggleLightbox($current) {
    $current.toggleClass('fixed-lightbox');
  }
  function keyboardNav() {
    $(document).keydown(function(e) {
      if ($('.fixed-lightbox').length) {
        var $current = $('.img-inpage.fixed-lightbox');
        if (e.keyCode == 27) {
          e.preventDefault();
          toggleLightbox($current);
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