var fs = fs || {};
fs.nav = fs.nav || {};
fs.nav.primary = function() {

  // Mobile Navigation functionality
  function mobileNav() {

    var $toggler = $('#toggle-nav');
    var $page = $('#main-content');
    var $wrapper = $('.wrapper');
    var $mobileNav = $('.mobile-nav');
    var $scrollMenu = $mobileNav.find('.scroll-menu');
    var $mobileNavBtns = $mobileNav.find('.mobile-nav-buttons');
    var $closeBtn = $('.close-mobile-nav');

    // Clicking the hamburger icon toggle
    $toggler.click(function(e) {
      e.preventDefault();
      e.stopPropagation(); // Required so clicking toggle doesn't cause click on parent container

      $scrollMenu.toggle();
      $mobileNavBtns.toggle();

      // Toggles classes that open/close the mobile nav
      $mobileNav.toggleClass('active');
      $wrapper.toggleClass('active');

      if ($mobileNav.hasClass('active')) {
        $scrollMenu.find('a:first').trigger('focus');
        $mobileNav.attr('aria-hidden','false');
        $wrapper.attr('aria-hidden','true');
        $closeBtn.show();
      } else {
        $toggler.trigger('focus');
        $mobileNav.attr('aria-hidden','true');
        $wrapper.removeAttr('aria-hidden');
        $closeBtn.hide();
      }

      // Set height of mobile nav's scrolling section to window height minus height of 3 buttons
      var scrollMenuHeight = ($(window).height() - $mobileNavBtns.height());
      $scrollMenu.css('height',scrollMenuHeight+'px');

      // Close the main search if open
      if ($page.hasClass('search-active')) {
        $('.main-search').hide();
        $page.removeClass('search-active');
        $('.search-menuitem').removeClass('search-active');
      }
    });

    // Update mobile nav on resize
    var resizeTimer;
    $(window).on('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeMobileNav(),250);
    });
    function resizeMobileNav() {
      if ($mobileNav.hasClass('active')) {
        if ($(window).width() >= 1020) {
          // Close mobile nav if resized to desktop
          $toggler.trigger('click');
        } else if ($(window).width() < 1020) {
          // Recalculate proper height for mobile nav's scrolling section
          $scrollMenu.css('height',($(window).height() - $mobileNavBtns.height())); 
        }
      }
    }

    // Clicking anywhere outside mobile nav closes it
    $wrapper.click(function(e) {
      if ($(this).hasClass('active')) {
        e.preventDefault();
        $toggler.trigger('click');
      }
    });
    $closeBtn.click(function(e) {
      e.preventDefault();
      if ($wrapper.hasClass('active')) {
        $toggler.trigger('click');
      }
    });
  }

  // Main Search functionality
  function searchToggle() {
    var $toggle = $('.search-menuitem');
    var $form = $('.main-search');
    var $input = $('#primary-search');
    var $page = $('#main-content');

    // Hide the form container
    function hideForm() {
      $form.hide();
      $page.removeClass('search-active');
      $toggle.removeClass('search-active');
    }

    // Clicking the search icon toggle
    $toggle.click(function(e) {
      e.preventDefault();
      if ($page.hasClass('search-active')) {
        // Close form if open
        hideForm();
      } else {
        // Open form if closed, then focus on search input
        $form.show(0,'',function() {
          $input.focus();
        });
        $page.addClass('search-active');
        $toggle.addClass('search-active');
      }
    });

    // Hitting the Escape key closes the form (if open) and focuses on toggle icon
    $('body').on('keyup',function(e) {
      if ($page.hasClass('search-active') && e.keyCode == 27) {
        hideForm();
        $toggle.focus();
      }
    });
    // Clicking in the main content area closes the search
    $('#main-content').on('click', function(e) {
      if ($page.hasClass('search-active')) {
        hideForm();
      }
    });
  }

  // Mobile Navigation Category expand/collapse functionality
  function mobileCatToggle() {
    // Clicking a category toggle in the mobile nav
    $( '.mobile-parentcat-trigger' ).click( function(e) {
      console.log( 'mobileCatToggle' );
      var $toggle = $(this);
      var $parentLi = $toggle.parent().parent('li');
      var $subCatMenu = $parentLi.find('.mobile-subcat');
      var $others = $('.mobile-nav-categories li.expanded').not($parentLi); // only needed if other expanded categories should be closed

      // Set aria-expanded attribute for screen readers
      if ($parentLi.hasClass('expanded')) {
        $toggle.attr('aria-expanded','false');
      } else {
        $toggle.attr('aria-expanded','true');
      }
      // Open/close the sub-category section
      $parentLi.toggleClass('expanded');
      $subCatMenu.slideToggle();
    });
  }

  // Primary Nav Mega Menu show/hide functionality
  function menuFocus() {
    // Focusing on a primary nav link opens its mega menu (needed for accessibility)
    $('a.primary-menuitem').not('.search-menuitem, #toggle-nav').on('focus', function(e) {
      var $link = $(this);
      var $menu = $link.siblings('.menu-panel');
      // Open the mega menu and give the link active state
      $link.addClass('active');
      $menu.addClass('shown');
      // Close other open mega menus
      $('a.primary-menuitem').not($link).removeClass('active');
      $('.menu-panel').not($menu).removeClass('shown');
    });
    // Focusing on the search icon toggle closes open mega menus
    $('.search-menuitem').on('focus',function(e) {
      $('a.primary-menuitem').removeClass('active');
      $('.menu-panel').removeClass('shown');
    });

    // mouseenter/mouseleave delay effects for mega menus
    // prevents flickering effect when moving between different mega menus
    // allows user to mouse over nav link quickly without opening mega menu
    var enterTimeout;
    $('.menu-wrap').mouseenter(function() {
      clearTimeout($(this).data('exitTimeout')); // clear the exitTimeout
      $('a.primary-menuitem.active').removeClass('active'); // remove active class if any top-level menu links were focused
      // if no mega menus are visible yet
      if (!$('.menu-panel').hasClass('shown') && !$('.menu-panel').is(':visible')) {
        var menuWrap = $(this);
        if (enterTimeout) {
          clearTimeout(enterTimeout);
          enterTimeout = null;
        }
        enterTimeout = setTimeout(function() {
          // after 200ms, if the menuWrap still is still hovered, show the mega menu
          if (menuWrap.is(':hover')) {
            menuWrap.find('.menu-panel').addClass('shown');
          }
        }, 200);
      // if other mega menus are already visible, show the mega menu immediately
      } else {
        $(this).find('.menu-panel').addClass('shown');
      }
    }).mouseleave(function() {
      // add exitTimeout as data attribute on the menuWrap
      // keeps mega menu visible for 300ms after menuWrap loses hover
      var menuWrap = $(this),
          exitTimeout = setTimeout(function() {
            menuWrap.find('.menu-panel').removeClass('shown');
          }, 300);
      menuWrap.data('exitTimeout', exitTimeout);
    });

  }

  function init() {
    mobileNav();
    searchToggle();
    mobileCatToggle();
    menuFocus();
  }
  init();

};
$(document).ready(function() {
  if ($('.navigation-container').length) {

    // remove class that enables hover effects if javascript is not loaded
    $('.primary-bar.noscript-nav').removeClass('noscript-nav');
    
    fs.nav.primary();

    // If a Super Hero is present, initialize Super Hero-related JS
    if ($('.super-hero').length) {
      fs.nav.superhero();
    }
  }
});
var fs = fs || {};
fs.nav = fs.nav || {};
fs.nav.superhero = function() {
  function superheroInit() {
    superHeroStretch();
    superHeroResize();
    if ($('.navigation-container').is('[data-sticky-nav]')) {
      superHeroScroll();
    // special class in case superhero is on a page without the sticky nav
    } else {
      if (!$('.super-hero').hasClass('unsticky-superhero')) {
        $('.super-hero').addClass('unsticky-superhero');
      }
    }
  }
  // Stretch the superhero to be the full height of the viewport
  function superHeroStretch() {
    if ($(window).width() >= 1020) {
      var $superHero = $('.super-hero');
      var winHeight = $(window).height();
      $superHero.css('height',winHeight);
    }
    if (!$('.wrapper').hasClass('super-hero-wrapper')) {
      $('.wrapper').addClass('super-hero-wrapper');
    }
  }
  // Reset the superhero's height on resize
  function superHeroResize() {
    var resizeTimer;
    $(window).on('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(superHeroStretch,250);
    });
  }
  // Superhero scroll and sticky nav effects
  function superHeroScroll() {

    $(window).scroll(function() {
      if ($(window).width() >= 1020) {

        var $win = $(window);
        var scrollPos = $win.scrollTop();
        var winHeight = $win.height();
        var $nav = $('.navigation-container');
        var $topBar = $nav.find('.top-bar');

        // set primary (white) nav to sticky when it is scrolled up to 50px away from top of viewport
        if (scrollPos >= (winHeight - 50)) {
          if (!$nav.hasClass('nav-sticky')) {
            $nav.addClass('nav-sticky');
          }
        } else {
          if ($nav.hasClass('nav-sticky')) {
            $nav.removeClass('nav-sticky');
          }
        }

        // show nav top (gray) nav when primary (white) nav is scrolled half-way up the superhero
        if (scrollPos >= (winHeight / 2)) {
          if (!$topBar.hasClass('top-bar-show')) {
            $topBar.addClass('top-bar-show');
          }
        } else {
          if ($topBar.hasClass('top-bar-show')) {
            $topBar.removeClass('top-bar-show');
          }
        }

        // as primary nav is scrolled over the superhero, fade out the superhero and perform parallax effect
        if (scrollPos < winHeight) {
          var opacityAdjust = 1 - (scrollPos / (winHeight - 100));
          var parallax = (scrollPos / 3) * -1;

          $('.super-hero').css('opacity',opacityAdjust);
          $('.super-hero-logo').css('top',parallax);
          $('.super-hero-overlay').css('margin-top',parallax);
          $('.super-hero').css('background-position','center '+parallax+'px');
        }

      }
    });

  }

  function init() {
    superheroInit();
  }
  init();
};