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

  function init() {
    filters();
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