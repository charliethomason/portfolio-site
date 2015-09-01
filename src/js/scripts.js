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
      $lightboxTitle = $lightbox.find('.lightbox-title'),
      $lightboxYear = $lightbox.find('.lightbox-year'),
      $lightboxMedium = $lightbox.find('.lightbox-medium'),
      $lightboxDescription = $lightbox.find('.lightbox-description'),
      $loading = $('.lightbox-loading'),
      $gallery = $('.grid');

  function clickEvents() {
    $('.galleryImg').click(function(e) {
      e.preventDefault();
      loadImageData(this,openLightbox);
    });
    $('.close-btn').click(function(e) {
      e.preventDefault();
      closeLightbox();
    });
    $('.prev-btn').click(function(e) {
      e.preventDefault();
      var $currentImg = $('.galleryImg[data-id="' + $lightbox.attr('data-id') + '"]'),
          prevImg = $currentImg.parent('li').prev('li').find('.galleryImg');
      if (prevImg.length) {
        loadImageData(prevImg,openLightbox);
      } else {
        var lastImg = $('.galleryImg:last');
        loadImageData(lastImg,openLightbox);
      }
    });
    $('.next-btn').click(function(e) {
      e.preventDefault();
      var $currentImg = $('.galleryImg[data-id="' + $lightbox.attr('data-id') + '"]'),
          nextImg = $currentImg.parent('li').next('li').find('.galleryImg');
      if (nextImg.length) {
        loadImageData(nextImg,openLightbox);
      } else {
        var firstImg = $('.galleryImg:first');
        loadImageData(firstImg,openLightbox);
      }
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
        description = $info.find('.description').text();
    $('.grid:visible').hide();
    $lightboxContent.hide();
    $loading.show();
    $lightboxImg.attr('src',imgFile);
    $lightboxImg.attr('alt',imgTitle);
    $lightboxTitle.text(imgTitle);
    $lightboxYear.text(year);
    $lightboxMedium.text(medium);
    $lightboxDescription.text(description);
    $lightbox.attr('data-id',imgID);
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
    $lightboxTitle.text('');
    $lightboxYear.text('');
    $lightboxMedium.text('');
    $lightboxDescription.text('');
    location.href = '#';
    $gallery.show();
  }

  function hashOpen() {
    if (window.location.hash) {
      var imgHash = window.location.hash.replace('#',''),
          img = $('.galleryImg[data-id="' + imgHash + '"]');
      loadImageData(img,openLightbox);
    }
  }

  function init() {
    clickEvents();
    hashOpen();
  }
  init();

}

$(document).ready(function() {
  charlie.basics();
  if ($('.gallery').length) {
    charlie.gallery();
  }
});