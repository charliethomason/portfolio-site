var charlie = charlie || {};
charlie.init = function() {
	function init() {
		charlie.basics();
		if (document.getElementById('page-gallery') !== null) {
			charlie.gallery();
		}
		if (document.getElementById('page-album') !== null) {
			charlie.album();
		}
	}
	init();
};
charlie.basics = function() {
	function hamburger() {
		var burger = document.getElementById('hamburger');
		var menu = document.querySelector('#main-nav ul');
		burger.addEventListener('click', function(e) {
			e.preventDefault();
			var shown = menu.getAttribute('data-show');
			if (shown === 'true') {
				menu.setAttribute('data-show', 'false');
			} else {
				menu.setAttribute('data-show', 'true');
			}
		});
	}
	function init() {
		hamburger();
	}
	init();
};
charlie.gallery = function() {
	function filters() {
		var select = document.getElementById('filters');
		var listEls = document.querySelectorAll('.gallery-grid li');
		select.addEventListener('change', function(e) {
			e.preventDefault();
			var selected = select.options[select.selectedIndex];
			var value = select.value;
			listEls.forEach(function(el) {
				var elFilters = el.getAttribute('data-filters');
				if (value === 'all' || elFilters.indexOf(value) > -1) {
					el.style.display = '';
				} else {
					el.style.display = 'none';
				}
			});
		});
	}
	function lightbox() {
		var listEls = document.querySelectorAll('.gallery-grid li');
		var magnifiers = document.querySelectorAll('.magnify');
		var lightbox = document.getElementById('lightbox-viewer');
		var lightboxContent = lightbox.querySelector('.lightbox-content');
		var lightboxImg = lightbox.querySelector('img');
		var closeBtn = lightbox.querySelector('.lightbox-close');
		magnifiers.forEach(function(btn) {
			var imgUrl = btn.previousElementSibling.getAttribute('data-img');
			var imgAlt = btn.previousElementSibling.getAttribute('alt');
			btn.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				lightboxImg.setAttribute('src', imgUrl);
				lightboxImg.setAttribute('alt', imgAlt);
				lightbox.style.display = '';
			});
		});
		closeBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeLightbox();
		});
		lightboxContent.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			closeLightbox();
		});
		lightboxImg.addEventListener('click', function(e) {
			e.stopPropagation();
		});
		function closeLightbox() {
			lightboxImg.setAttribute('src', 'javascript:void(0)');
			lightboxImg.setAttribute('alt', '');
			lightbox.style.display = 'none';
		}
	}
	function init() {
		filters();
		lightbox();
	}
	init();
};
charlie.album = function() {
	function lightbox() {
		var triggerLightbox = document.querySelector('.trigger-lightbox');
		var allImages = document.querySelectorAll('.img-inpage');
		var firstImg = allImages[0];
		var lastImg = allImages[allImages.length - 1];
		var closeLightbox = document.querySelectorAll('.img-close');
		var nextImg = document.querySelectorAll('.img-next');
		var prevImg = document.querySelectorAll('.img-prev');
		triggerLightbox.addEventListener('click', function(e) {
			e.preventDefault();
			toggleLightbox(firstImg);
		});
		allImages.forEach(function(img) {
			img.addEventListener('click', function(e) {
				e.preventDefault();
				toggleLightbox(img);
			});
		});
		closeLightbox.forEach(function(btn) {
			btn.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				toggleLightbox();
			});
		});
		nextImg.forEach(function(btn) {
			btn.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var currImg = document.querySelector('.fixed-lightbox');
				var nextImg = currImg === lastImg ? firstImg : currImg.parentNode.nextElementSibling.children[0];
				toggleLightbox(nextImg);
			});
		});
		prevImg.forEach(function(btn) {
			btn.addEventListener('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var currImg = document.querySelector('.fixed-lightbox');
				var prevImg = currImg === firstImg ? lastImg : currImg.parentNode.previousElementSibling.children[0];
				toggleLightbox(prevImg);
			});
		});
	}
	function toggleLightbox(target) {
		var hasLightbox = 'img-inpage fixed-lightbox';
		var noLightbox = 'img-inpage';
		document.querySelectorAll('.img-inpage').forEach(function(img) {
			if (target !== undefined && img !== target || target === undefined) {
				img.className = noLightbox;
			}
		});
		if (target !== undefined) {
			target.className = target.className === hasLightbox ? noLightbox : hasLightbox;
		}
	}
	function init() {
		lightbox();
	}
	init();
};
charlie.isReady = function() {
	if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
		charlie.init();
	} else {
		document.addEventListener('DOMContentLoaded', charlie.init);
	}
};
charlie.isReady();