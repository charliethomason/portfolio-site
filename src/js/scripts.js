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
      $lightboxClose = $lightbox.find('.close-btn'),
      $lightboxImg = $lightbox.find('.lightbox-img img'),
      $lightboxTitle = $lightbox.find('.lightbox-title'),
      $lightboxYear = $lightbox.find('.lightbox-year'),
      $lightboxMedium = $lightbox.find('.lightbox-medium'),
      $lightboxDescription = $lightbox.find('.lightbox-description');

  function openImage() {
    $('.galleryImg').click(function(e) {
      e.preventDefault();
      var $this = $(this),
          imgFile = $this.attr('href'),
          $info = $this.siblings('.info'),
          imgTitle = $info.find('.title').text(),
          year = $info.find('.year').text(),
          medium = $info.find('.medium').text(),
          description = $info.find('.description').text();
      $lightbox.show();
      $lightboxImg.attr('src',imgFile);
      $lightboxTitle.text(imgTitle);
      $lightboxYear.text(year);
      $lightboxMedium.text(medium);
      $lightboxDescription.text(description);
    });
  }
  function closeLightbox() {
    $lightboxClose.click(function(e) {
      e.preventDefault();
      $lightbox.hide();
      $lightboxImg.attr('src','');
      $lightboxTitle.text('');
      $lightboxYear.text('');
      $lightboxMedium.text('');
      $lightboxDescription.text('');
    });
  }
  function init() {
    openImage();
    closeLightbox();
  }
  init();
}

$(document).ready(function() {
  charlie.basics();
  if ($('.gallery').length) {
    charlie.gallery();
  }
});