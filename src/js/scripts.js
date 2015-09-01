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
      $lightboxContent = $lightbox.find('.lightbox-box');
      $lightboxImg = $lightbox.find('.lightbox-img img'),
      $lightboxTitle = $lightbox.find('.lightbox-title'),
      $lightboxYear = $lightbox.find('.lightbox-year'),
      $lightboxMedium = $lightbox.find('.lightbox-medium'),
      $lightboxDescription = $lightbox.find('.lightbox-description'),
      $gallery = $('.gallery > ul');

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
      var $currentImg = $('#' + $lightbox.attr('data-id')),
          prevImg = $currentImg.parent('li').prev('li').find('.galleryImg');
      if (prevImg.length) {
        loadImageData(prevImg);
      }
    });
    $('.next-btn').click(function(e) {
      e.preventDefault();
      var $currentImg = $('#' + $lightbox.attr('data-id')),
          nextImg = $currentImg.parent('li').next('li').find('.galleryImg');
      if (nextImg.length) {
        loadImageData(nextImg);
      }
    });
  }

  function loadImageData(img,callback) {
    var $image = $(img),
        imgFile = $image.attr('href'),
        $info = $image.siblings('.info'),
        imgTitle = $info.find('.title').text(),
        year = $info.find('.year').text(),
        medium = $info.find('.medium').text(),
        description = $info.find('.description').text(),
        imgID = $image.attr('id');
    $lightboxImg.attr('src',imgFile);
    $lightboxTitle.text(imgTitle);
    $lightboxYear.text(year);
    $lightboxMedium.text(medium);
    $lightboxDescription.text(description);
    $lightbox.attr('data-id',imgID);
    if (callback) {
      callback();
    }
  }

  function openLightbox() {
    $gallery.hide();
    $lightbox.show();
  }

  function closeLightbox() {
    $lightbox.hide();
    $lightbox.attr('data-id','');
    $lightboxImg.attr('src','');
    $lightboxTitle.text('');
    $lightboxYear.text('');
    $lightboxMedium.text('');
    $lightboxDescription.text('');
    $gallery.show();
  }

  function init() {
    clickEvents();
  }
  init();

}

$(document).ready(function() {
  charlie.basics();
  if ($('.gallery').length) {
    charlie.gallery();
  }
});