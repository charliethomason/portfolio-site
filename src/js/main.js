var charlie = charlie || {};
charlie.init = function() {
	// basics
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
	function basics() {
		hamburger();
	}
	// grid
	function gridLightbox() {
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
		var event = new Event('change');
		select.dispatchEvent(event);
	}
	function grid() {
		gridLightbox();
		filters();
	}
	// albums
	function albumLightbox() {
		var triggerLightbox = document.querySelector('.trigger-lightbox');
		var allImages = document.querySelectorAll('.img-inpage');
		var firstImg = allImages[0];
		var lastImg = allImages[allImages.length - 1];
		var closeLightbox = document.querySelectorAll('.img-close');
		var nextBtn = document.querySelectorAll('.img-next');
		var prevBtn = document.querySelectorAll('.img-prev');
		allImages.forEach(function(img) {
			img.addEventListener('click', function(e) {
				e.preventDefault();
				toggleLightbox(img);
			});
		});
		if (triggerLightbox !== null) {
			triggerLightbox.addEventListener('click', function(e) {
				e.preventDefault();
				toggleLightbox(firstImg);
			});
		}
		if (closeLightbox !== null) {
			closeLightbox.forEach(function(btn) {
				btn.addEventListener('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					toggleLightbox();
				});
			});
		}
		if (nextBtn !== null) {
			nextBtn.forEach(function(btn) {
				btn.addEventListener('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					loadNextImg();
				});
			});
		}
		if (prevBtn !== null) {
			prevBtn.forEach(function(btn) {
				btn.addEventListener('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					loadPrevImg();
				});
			});
		}
		document.addEventListener('keyup', function(e) {
			if (document.querySelector('.fixed-lightbox') !== null) {
		        if (e.keyCode == 27) {
		         	e.preventDefault();
		         	e.stopPropagation();
		         	toggleLightbox();
		        }
		        if (document.getElementById('page-birds') === null) {
			        if (e.keyCode == 37) {
			         	e.preventDefault();
			         	e.stopPropagation();
			         	loadPrevImg();
			        }
			        if (e.keyCode == 39) {
			         	e.preventDefault();
			         	e.stopPropagation();
			         	loadNextImg();
			        }
			    }
			}
		});
		function loadPrevImg() {
			var currImg = document.querySelector('.fixed-lightbox');
			var prevImg = currImg === firstImg ? lastImg : currImg.parentNode.previousElementSibling.children[0];
			toggleLightbox(prevImg);
		}
		function loadNextImg() {
			var currImg = document.querySelector('.fixed-lightbox');
			var nextImg = currImg === lastImg ? firstImg : currImg.parentNode.nextElementSibling.children[0];
			toggleLightbox(nextImg);
		}
		function toggleLightbox(target) {
			var hasLightbox = 'img-inpage fixed-lightbox';
			var noLightbox = 'img-inpage';
			allImages.forEach(function(img) {
				if (target !== undefined && img !== target || target === undefined) {
					img.className = noLightbox;
				}
			});
			if (target !== undefined) {
				target.className = target.className === hasLightbox ? noLightbox : hasLightbox;
			}
		}
	}
	function album() {
		albumLightbox();
	}
	// single
	function singleLightbox() {
		var single = document.querySelector('.single-img');
		single.addEventListener('click', function(e) {
			e.preventDefault();
			var lightbox = single.getAttribute('data-lightbox');
			if (lightbox === 'true') {
				single.setAttribute('data-lightbox', 'false');
			} else {
				single.setAttribute('data-lightbox', 'true');
			}
		})
	}
	function single() {
		singleLightbox();
	}
	// init
	function init() {
		basics();
		if (document.getElementById('page-gallery') !== null) {
			grid();
		}
		if (document.getElementById('page-album') !== null || document.getElementById('page-birds') !== null) {
			album();
		}
		if (document.getElementById('page-single') !== null) {
			single();
		}
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