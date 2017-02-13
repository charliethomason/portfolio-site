/*------------
FUNCTIONS
------------*/
// Move Account Value graph
function moveGraph(button) {
	var graph = $(button).data('graph-control');
	var graphSize = $('#' + graph).width();
	var viewable = $('#' + graph).parents('.graph-data-overflow').width();
	var graphScroll = graphSize - viewable;
	var direction = $(button).data('graph-nav');
	var dataOverflow = $('#' + graph).parents('.graph-data-overflow');
	if(direction === 'prev') {
		$(dataOverflow).animate({
			scrollLeft: "-=80"
		}, 300, function() {});
	} else {
		$(dataOverflow).animate({
			scrollLeft: '+=80'
		}, 300, function() {});
	}
}

// Modal functionality
function showModal(modalName) {
	var winHeight = $(window).height(),
		winWidth = $(window).width(),
		modalHeight = $(modalName).outerHeight(),
		modalWidth = $(modalName).outerWidth(),
		maskHeight = $(document).height(),
		scrollTop = $(window).scrollTop(),
		mobileWidth = winWidth * 0.9,
		mobileOffset = (mobileWidth / 2) * -1;

	$('#modal-screen').css({ 
		'width': winWidth, 
		'height': maskHeight 
	});
	$('#modal-screen').show();

	if(modalWidth > mobileWidth) {
		if($(modalName).hasClass('expanded-modal')) {
			$(modalName).css({
				'left': '50%',
				'margin-left': '-150px',
				'top':(((winHeight - modalHeight) / 2) + scrollTop),
				'width': '260px'
			});
			$(modalName).show();
		} else {
			$(modalName).css({
				'left': '50%',
				'margin-left': mobileOffset,
				'top':(((winHeight - modalHeight) / 2) + scrollTop),
				'width': mobileWidth
			});
			$(modalName).show();
		}
	} else {
		$(modalName).css({
			'left':'50%', 
			'margin-left':'-'+modalWidth/2+'px', 
			'top':(((winHeight - modalHeight) / 2) + scrollTop)
		});
		$(modalName).show();
	}

	$('#modal-screen, .close-modal, .goalmaker-close-button').click(function (e) {
        e.preventDefault();
        $('#modal-screen, .modal-content').hide();
    });

	$(document).keyup(function(e) { 
		if (e.keyCode == 27) {
			$('#modal-screen, .modal-content').hide();
		}
	});

	$(window).resize(function () {
	 	var	winHeight = $(window).height(),
			winWidth = $(window).width(),
		 	maskHeight = $(document).height(),
			modalHeight = $(modalName).outerHeight(),
			mobileWidth = winWidth * 0.9,
			mobileOffset = (mobileWidth / 2) * -1;

		$('#modal-screen').css({ 
			'width': winWidth, 
			'height': maskHeight 
		});
		if($(window).width() <= 799 && modalWidth > mobileWidth) {
			if($(modalName).hasClass('expanded-modal')) {
				$(modalName).css({
					'margin-left': '-150px',
					'width': '260px'
				});				
			} else {
				$(modalName).css({
					'margin-left':mobileOffset,
					'width':mobileWidth
				});
			}

		}
	});
}

// Clicking on +/- buttons on Contributions form adjusts right-side Est Retirement Income info
function updateContributions() {
	var graph = $('.graph > .graphAmount.load');
	if($(graph).height() === 65) {
		$(graph).css('height','80px');
	} else {
		$(graph).css('height','65px');
	}
	$('.goal-gap-text').toggle();
	$('.est-retirement-income-contrib').toggle();
}

// 'Est Retirement Income' number in Header animates incrementally drom $2,143 to $2,658 (for Contrib. Confirm. page)
function increaseAmountText() {
	var $counter = $('.amountText.amount'),
		startVal = $counter.text().replace('$','').replace(',',''),
		currentVal,
		endVal = 2658,
		prefix = '$';

	currentVal = startVal;
    var i = setInterval(function (){
        if (currentVal === endVal){
            clearInterval(i);
            $counter.css('color','green');
        } else {
            currentVal++;
            $counter.text(prefix+currentVal);
            $counter.text($counter.text().replace('$2','$2,'));
        }
    }, 5);

}

// Account Summary Account Value Bar Graph Animation
function growBars() {
	$('.graph-click-spot').each(function() {
		var barHeight = $(this).data('bar-height');
		$(this).animate({
			height: barHeight
		}, 300, function() {
			$(this).on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
				$(this).addClass('all-grown-up');
				if($(this).attr('id') === 'graph-click-spot-11') {
					moveLines();
				}
			});
		});
	});
}

// Account Summary Account Value Bar Graph Animation for Mobile
function mobileGrowBars() {
	var scroll = $(window).scrollTop() + $(window).height(),
		graphTop = $('.bar-graph-wrap').offset().top + 100;
	if(scroll > graphTop) {
		$('.graph-click-spot').each(function() {
			var barHeight = $(this).data('bar-height');
			$(this).animate({
				height: barHeight
			}, 50, function() {
				$(this).on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
					$(this).addClass('all-grown-up');
				});
			});
		});
		moveLines();
		$(window).off('scroll', mobileGrowBars);
	}
}

// Account Summary Account Value Line Graph Animation
function moveLines() {
	$('#line-graph-mask').animate({
		width: '0'
	}, 100, function() {});
}

// Show Investments & Performances Sticky Header
function showStickyThead() {
	var scroll = $(window).scrollTop(),
		$scrollTable = $('.scroll-table'),
		$nonScrollTable = $('.non-scroll-table'),
		tableTop = $scrollTable.offset().top,
		tableBottom = tableTop + $scrollTable.height(),
		nonScrollTableTop = $nonScrollTable.offset().top,
		nonScrollTableBottom = nonScrollTableTop + $nonScrollTable.height(),
		$stickyThead1 = $('#sticky-thead-1'),
		$stickyThead2 = $('#sticky-thead-2'),
		$mainTable = $('.historical-table-wrap'),
		$stickyTopCorner = $('#sticky-top-corner');
	if($(window).width() >= 600) {
		if($('#investments-tab-data').hasClass('hide-menu')) {
			// Historical tab
			if(scroll > tableTop) {
				if(!$stickyThead1.hasClass('shown')) {
					$stickyThead1.addClass('shown');
					$stickyTopCorner.addClass('shown');
					$stickyThead1.scrollLeft($mainTable.scrollLeft());
				}
			} else {
				$stickyThead1.removeClass('shown');
				$stickyTopCorner.removeClass('shown');
			}
			if(scroll > tableBottom) {
				$stickyThead1.removeClass('shown');
				$stickyTopCorner.removeClass('shown');
			}
		} else {
			// Custom Date tab
			if(scroll > nonScrollTableTop) {
				if(!$stickyThead2.hasClass('shown')) {
					$stickyThead2.addClass('shown');
				}
			} else {
				$stickyThead2.removeClass('shown');
			}
			if(scroll > nonScrollTableBottom) {
				$stickyThead2.removeClass('shown');
			}
		}
	}
}
// Set Investments & Performance table row heights
function tableRowHeights() {
	$('.scroll-table > tbody').children('tr:not(.summary)').each(function() {
		var height = $(this).children('.headcol').data('height'),
			$cols = $(this).children('td');
		$cols.each(function() {
			if($(this).hasClass('two-line-benchmark-heading')) {
				$(this).css({
					height: height + 'px',
					lineHeight: '16px'
				});
			} else if($(this).hasClass('headcol') && !$(this).hasClass('first-table-row') || $(this).hasClass('secondcol')) {
				$(this).css({
					height: (height + 1) + 'px',
					lineHeight: height + 'px'
				});
			} else {
				$(this).css({
					height: height + 'px',
					lineHeight: height + 'px'
				});
			}
		});
	});
}

/*------------
DOM READY
------------*/
$(function() {

/*--- MODAL / LIGHTBOX --*/

	// show modal
	$('.modal').click(function(e) { 
		e.preventDefault();
		e.stopPropagation();
		if($(this).attr('data-mobile-modal') && $(window).width() < 800) {
			var mobileModal = '#' + $(this).data('mobile-modal');
			showModal(mobileModal);
		} else {
			var modal = '#' + $(this).data('modal');
		    // For Goalmaker only
		    if($('.goalmaker-modal').is(':visible')) {
		    	$('.goalmaker-modal:visible').not(modal).hide();
		    }
    		showModal(modal);
		}
	});

/*--- ACCOUNT VALUE GRAPH ON ACCOUNT SUMMARY --*/

	//If the graph is scrolled manually, add/remove the inactive class on the arrow nav buttons accordingly
	$('.graph-data-overflow').scroll(function() {
		var currentScroll = $(this).scrollLeft();
		if(currentScroll === 0) {
			$('#graph-arrow-left').addClass('inactive');
		} else if(currentScroll >= 344) {
			$('#graph-arrow-right').addClass('inactive');
		} else {
			$('.graph-arrow').removeClass('inactive');
		}
	});

	//move graph
	$('.graph-arrow').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		moveGraph(this);
	});

	//click graph bar to show graph popup
	$('.graph-click-spot > span').click(function(e) {
		if($(window).width() <= 799) {
			e.preventDefault();
			e.stopPropagation();
			var $toggle = $(this).parent(),
				popup = '#' + $toggle.data('graph-popup');
			$('.graph-popup').not($(popup)).hide();
			$(popup).show();
			$('.graph-click-spot').not($toggle).removeClass('active');
			$toggle.toggleClass('active');
		}
	}).hover(function() {
		if($(window).width() >= 800) {
			var $toggle = $(this).parent(),
				popup = '#' + $toggle.data('graph-popup');
			$('.graph-popup').not($(popup)).hide();
			$(popup).toggle();
			$('.graph-click-spot').not($toggle).removeClass('active');
			$toggle.toggleClass('active');
		}
	});

/*--- DROPDOWNS, TABS, & TOGGLES --*/

	//dropdown select
	$('.dropdown-select li a').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		var selected = $(this).text();
		var menu = $(this).parents('.dropdown-select');
		var menuId = $(menu).attr('id');
		var toggle = $('a.dropdown-select-toggle[data-menu-toggle="'+menuId+'"]');
		$(toggle).text(selected).addClass('closed');
		$(menu).addClass('hide-menu');
	});


	//menu toggle
	$('.menu-toggle').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		var target = $(this).data('menu-toggle');

		// tab toggles
		if($(this).hasClass('tab-toggle')) {
			$(this).addClass('active');
			$('.tab-toggle').not(this).removeClass('active');
			$('#' + target).removeClass('hide-menu');
			$('.tab-data-wrap').not('#' + target).addClass('hide-menu');
		// Tooltip toggles
		} else if($(this).hasClass('tooltip-toggle')) {
			$('.tooltip-toggle:not(.closed)').not(this).addClass('closed');
			$('.tooltip-popup:not(.hide-menu)').not('#' + target).addClass('hide-menu');
			$(this).toggleClass('closed');
			$('#' + target).toggleClass('hide-menu');
		// fund summary toggles
		} else if($(this).hasClass('fund-summary-toggle')) {
			$(this).toggleClass('closed');
			$(this).parents('tr').toggleClass('open');
			$('#' + target).toggle();
			var summaryHeight = $('#' + target).find('.fund-summary').outerHeight();
			if(!$(this).hasClass('closed')) {
				$('#' + target).css('height',summaryHeight);
				$('#' + target).children('td').css('height',summaryHeight);
			}
		// all other toggles
		} else if($(this).hasClass('dropdown-toggle')) {
			$(this).toggleClass('closed');
			$('#' + target).toggleClass('hide-menu');
			$('.dropdown-toggle:not(.closed)').not(this).addClass('closed');
			$('.dropdown-menu:not(.hide-menu)').not('#' + target).addClass('hide-menu');
		} else if($(this).hasClass('single-accordion-open')) {
			if($(this).hasClass('closed')) {
				$(this).toggleClass('closed');
				$('#' + target).slideToggle();
				$('.accordion-toggle').not(this).addClass('closed');
				$('.accordion-data-wrap').not('#' + target).slideToggle();
				switch(target) {
					case 'investments-accordion-need-help-yes':
						$.cookie('manage-investments-need-help','yes');
						break;
					case 'investments-accordion-need-help-no':
						$.cookie('manage-investments-need-help','no');
						break;
				}
			}
		// Animated Menu Toggles
		} else if($(this).hasClass('animated-toggle')) {
			$(this).toggleClass('closed');
			$('#' + target).slideToggle('slow');
		} else {
			$(this).toggleClass('closed');
			$('#' + target).toggleClass('hide-menu');
		}
	});

	// Account Summary "My Investments" View by Investment/Asset Class/Contribution Type dropdown
	$('#investments-sort-select li a').click(function(e) {
		e.preventDefault();
		var selected = $(this).data('select-value');
		$('.accordion-investments-section').each(function() {
			$(this).addClass('hide-section');
		});
		$('#investments-view-by-' + selected).removeClass('hide-section');
	});

	// Sitemap Account Select dropdown
	$('#sitemap-account-select li a').click(function(e) {
		e.preventDefault();
		var selected = $(this).data('select-value');
		$('.bottom-site-map-wrap').addClass('hide-section');
		$('#sitemap-'+selected).removeClass('hide-section');
	});

/*--- CLOSE BUTTONS & CLOSING-RELATED FUNCTIONALITY --*/

	// Click to Close Popups (used for Calendar date picker tooltips)
	$('.click-to-close-popup').click(function() {
		$(this).addClass('hide-menu');
		$(this).siblings('.tooltip-toggle').addClass('closed');
	});

	// close icon closes graph and tooltip popups
	$('.close-popup').click(function(e) {
		if($(this).hasClass('graph-close')) {
			var graphClick = $(this).parents('.graph-click');
			$(graphClick).find('.graph-click-spot').removeClass('active');
			$(graphClick).find('.graph-popup').hide();
		} else if($(this).hasClass('tooltip-close')) {
			var tooltipWrap = $(this).parents('.tooltip-wrap');
			$(tooltipWrap).find('.tooltip-toggle').addClass('closed');
			$(tooltipWrap).find('.tooltip-popup').addClass('hide-menu');
		}
	});

	// clicking on graph popups or tooltip popups does not bubble up the DOM
	$('.graph-popup, .tooltip-popup').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	// Clicking anywhere on the document closes any open tooltip popups
	$(document).click(function() {
		$('.tooltip-popup:not(.hide-menu)').addClass('hide-menu');
		$('.tooltip-toggle:not(.closed)').addClass('closed');
	});

	// Clicking anywhere on the document closes any open dropdown menus
	$(document).click(function() {
		$('.dropdown-menu:not(.hide-menu)').each(function() {
			$(this).addClass('hide-menu');
			$(this).siblings('.dropdown-toggle').addClass('closed');
		});
	});

/*--- LEFT NAV & MOBILE NAV */

	// Open the Mobile Left Nav
	$('.mobile-left-nav-toggle').click(function(e) {
		e.preventDefault();
		var link = this;
		$('#inner-wrapper').animate({
			left: $(link).hasClass('open') ? '0' : '70%'
		},'fast', function() {
			$(link).toggleClass('open');
		});
	});
	// Closing the Mobile Left Nav
	$('.close-mobile-left-nav').click(function(e){
		e.preventDefault();
		$('#inner-wrapper').animate({
			left: '0'
		},'fast', function() {
			$('.mobile-left-nav-toggle').removeClass('open');
		});
	});

/*--- PAGE OPTIONS MENU --*/

	// clicking on the close icon collapses the page options menu
	$('#page-options-close > a').click(function(e) {
		e.preventDefault();
		$('#page-options-box').addClass('collapsed');
	});
	// clicking the wheel icon opens the page options menu
	$('#page-options-icon > a').click(function(e) {
		e.preventDefault();
		$('#page-options-box').removeClass('collapsed');
	});
	// clicking on a radio button changes an element on the page
	$('input.page-options-radio').change(function(e) {
		var selected = $(this).attr('value');
		switch(selected) {

			// Enrollment options
			case 'sidebar-normal':
				$('#enrollment1').show();
				$('#enrollment1-a, #enrollment1-b').hide();
				$.cookie('enrollment-sidebar','sidebar-normal');
				break;
			case 'sidebar-a':
				$('#enrollment1-a').show();
				$('#enrollment1, #enrollment1-b').hide();
				$.cookie('enrollment-sidebar','sidebar-a');
				break;
			case 'sidebar-b':
				$('#enrollment1-b').show();
				$('#enrollment1, #enrollment1-a').hide();
				$.cookie('enrollment-sidebar','sidebar-b');
				break;
			// Contributions options
			case 'contrib-simple':
				$('.complex-contributions-form-row').hide();
				$('.gray-arrow-right').removeClass('complex-form-arrow');
				$.cookie('contributions-version','contrib-simple');
				break;
			case 'contrib-complex':
				$('.complex-contributions-form-row').css('display','table-row');
				$('.gray-arrow-right').addClass('complex-form-arrow');
				$.cookie('contributions-version','contrib-complex');
				break;
		}
	});

/*--- INVESTMENTS & PERFORMANCE --*/

	//set table column widths based on data attr in table head
	$('table th').each(function() {
		var width = $(this).data('width');
		$(this).css('width',width);
	});

	// table scrolling
	$('.table-scroll.left').click(function(e) {
		e.preventDefault();
		$('.table-data-wrap.historical-table-wrap').animate({
			scrollLeft: "-=100"
		}, 300, function() {
			// done
		});
	});
	$('.table-scroll.right').click(function(e) {
		e.preventDefault();
		$('.table-data-wrap.historical-table-wrap').animate({
			scrollLeft: "+=100"
		}, 300, function() {
			// done
		});
	});

	// Scrolling the Historical Table sets .table-scroll buttons disabled state and forces sticky header scrolling
	$('.historical-table-wrap').scroll(function() {
		var $table = $(this),
			$tableHeads = $table.find('th.col:not(.secondcol)'),
			tableWidth = $table.width(),
			currentScroll = $table.scrollLeft(),
			width = 0;
		$tableHeads.each(function() {
			width += $(this).outerWidth(true);
		});
		var maxScroll = width - tableWidth;
		if(currentScroll === 0) {
			$('.table-scroll.left').addClass('inactive');
		} else if(currentScroll >= maxScroll) {
			$('.table-scroll.right').addClass('inactive');
		} else {
			$('.table-scroll').removeClass('inactive');
		}
	});

	// Investment Performance - Show Benchmarks
	$('#performance-show-benchmarks').change(function(e) {
		var label = $(this).siblings('label');
		if($(label).hasClass('checked')) {
			$(this).removeAttr('checked');
			$(label).removeClass('checked');
			$('.benchmark').toggleClass('hide-section');
		} else {
			$(this).attr('checked','checked');
			$(label).addClass('checked');
			$('.benchmark').toggleClass('hide-section');
		}
	});

	// Investment Performance - Only My Investments
	$('.performance-only-my-investments').change(function(e) {
		var label = $(this).next('label'),
			inputName = $(this).attr('name');
			table = $(this).data('table'),
			tableBody = $(table).find('tbody');
		$(this).attr('checked','checked');
		$(this).siblings('input:radio').removeAttr('checked');
		$(label).addClass('checked');
		$(this).siblings('label').not(label).removeClass('checked');
		$(tableBody).children('tr.not-my-investment-row').toggle();
	});

/*--- CONTRIBUTIONS --*/

	// Expand and collapse text/content and switch the toggle link text back and forth
	// Used in Contribution Accordions
	$('.show-more-toggle').click(function(e) {
		e.preventDefault();
		var target = '#' + $(this).data('show-more'),
			currentText = $(this).data('alt-show-text'),
			altText = $(this).data('alt-hide-text');
		$(target).toggleClass('hide-section');
		$(this).toggleClass('closed');
		if($(this).hasClass('closed')) {
			$(this).text(currentText);
		} else {
			$(this).text(altText);
		}
	});

	// Contribution page + and - button controls
	$('.contribution-adjust-increase').click(function(e) {
		e.preventDefault();
		var $myInput = $(this).siblings('.contribution-adjust-input'),
			currentVal = parseInt($myInput.val()),
			newVal,
			$estImpactLabel = $('#estimated-impact-x'),
			currentLabel = parseInt($estImpactLabel.text()),
			newLabel,
			$estImpactChange = $('#estimated-impact-increase-decrease'),
			$whiteScreen = $('.contributions-white-screen');
		if($whiteScreen.hasClass('shown')) {
			$whiteScreen.removeClass('shown');
		}
		if(currentVal >= 0) {
			newVal = currentVal + 1;
			$myInput.val(newVal + '%');
			updateContributions();
		}
	});
	$('.contribution-adjust-decrease').click(function(e) {
		e.preventDefault();
		var $myInput = $(this).siblings('.contribution-adjust-input'),
			currentVal = parseInt($myInput.val()),
			newVal,
			$estImpactLabel = $('#estimated-impact-x'),
			currentLabel = parseInt($estImpactLabel.text()),
			newLabel,
			$estImpactChange = $('#estimated-impact-increase-decrease'),
			$whiteScreen = $('.contributions-white-screen');
		if($whiteScreen.hasClass('shown')) {
			$whiteScreen.removeClass('shown');
		}
		if(currentVal > 0) {
			newVal = currentVal - 1;
			$myInput.val(newVal + '%');
			updateContributions();
		}
	});

	// Clicking the Contribution Accelerator label sets the checkbox to checked
	// This functionality also used on Investments & Performances
	$('.form-checkbox-label').click(function(e) {
		e.preventDefault();
		var labelId = $(this).attr('for');
		$('#'+labelId).trigger('click');
	});

	// Clicking "Edit Settings" link in Contribution Accelerator checkbox label doesn't bubble up DOM
	$('.form-checkbox-label a').click(function(e) {
		e.stopPropagation();
	});

	// Contribution Accelerator checkbox style/state functionality
	$('#contributions-auto-increase').change(function(e) {
		e.preventDefault();
		var label = $(this).siblings('label');
		if($(label).hasClass('checked')) {
			$(label).removeClass('checked');
			$(this).removeAttr('checked');
		} else {
			$(label).addClass('checked');
			$(this).attr('checked','checked');
		}
	});

	// Close Contributions Modals
	$('.contributions-modal .modal-button').click(function(e) {
		e.preventDefault();
		$('#modal-screen, .modal-content').hide();
	});

	// Clicking "Apply Changes" sets cookie
	$('#contributions-apply-changes').click(function() {
		$.cookie('contributions-apply-changes','yes');
	});

	// If "Apply Changes" has been clicked previously and cookie is set, redirect user to Pending page upon trying to access Landing
	// The "#nocookie" URL hash will force the user to still go to directly to the Contributions landing page, even if the cookie is present.
	$('a[href="contributions.html"]').click(function(e) {
		var applyChanges = $.cookie('contributions-apply-changes');
		if(applyChanges === 'yes' && window.location.hash !== "#nocookie" && window.location.hash !== "#removecookie") {
			e.preventDefault();
			window.location.href = 'contributions-pending.html';
		}
	});

/*--- MANAGE INVESTMENTS --*/

	// "No thanks, I can do it myself"
	$('#action-manage-investments-nothanks').click(function(e) {
		e.preventDefault();
		var $toggle = $('.accordion-toggle[data-menu-toggle="investments-accordion-need-help-no"]')
		$toggle.trigger('click');
		$.cookie('manage-investments-need-help','no');
	});

	// "I Need Help Managing My Investments" (link removed)
	$('.action-manage-investments-gethelp').click(function(e) {
		var $toggle = $('.accordion-toggle[data-menu-toggle="investments-accordion-need-help-yes"]');
		e.preventDefault();
		$toggle.trigger('click');
		if($(window).width() <= 799) {
			$(window).scrollTop($toggle.offset().top);
		} else {
			$(window).scrollTop($toggle.offset().top - 65);
		}
		$.cookie('manage-investments-need-help','yes');
	});

/*--- CLICKABLE JPG PAGES --*/

	// PERSONAL INFORMATION Beneficiary Information Toggle
	$('a#clickable-jpg-change-beneficiary-information').click(function(e) {
		e.preventDefault();
		$(".clickable-jpg").toggle();
	});

	// MAKE A TRANSFER Special Messages Box
	$('#clickable-jpg-transfers-message-toggle').click(function(e) {
		e.preventDefault();
		$(".clickable-jpg").toggle();
		$(".clickable-jpg-hotspot").toggleClass('open');
	});

/*--- RESPONSIVE JS & PAGE ONLOAD FUNCTIONALITY --*/

	//window resize function / responsive
	$(window).resize(function() {
		clearTimeout(this.id);
		this.id = setTimeout(doneResizing, 500);
		function doneResizing() {
			if($(window).width() <= 599) {
				// INVESTMENTS & PERFORMANCE TABLE
				if($('body').hasClass('investment-performance')) {
					$('td.row-fund-data').attr('colspan','2');
				}
			}
			if($(window).width() <= 799) {
				// PAGE OPTIONS
				$('#page-options-box').addClass('collapsed');
				// INVESTMENTS & PERFORMANCES STICKY HEADER
				$('.sticky-thead-wrapper').removeClass('shown');
				$('#sticky-top-corner').removeClass('shown');
			}
			if($(window).width() >= 600) {
				// INVESTMENTS & PERFORMANCE TABLE
				if($('body').hasClass('investment-performance')) {
					var tableSize = $('.historical-table-wrap').width();
					tableRowHeights();
					$('td.row-fund-data').attr('colspan','11');
					$('#sticky-thead-1').css('max-width', tableSize);
					$('.sticky-table-scroll.right').css('right',(tableSize * -1));
				}
			}
		}
	});

	$(window).load(function() {
		if($(window).width() <= 799) {
			// Page Options Box is collapsed on mobile
			$('#page-options-box').addClass('collapsed');
			// Mobile Nav sub-menu with active page link is auto-expanded 
			$('#mobile-left-nav-menu > ul').each(function() {
				if($(this).find('a.active').length) {
					$(this).removeClass('hide-menu');
					$('a.menu-toggle').filter('[data-menu-toggle='+ $(this).attr('id') +']').removeClass('closed');
				}
			});
		} else {
			// Left Nav sub-menu with active page link is auto-expanded
			$('#left-nav-menu > ul').each(function() {
				if($(this).find('a.active').length) {
					$(this).show();
					$('a.menu-toggle').filter('[data-menu-toggle='+ $(this).attr('id') +']').removeClass('closed');
				}
			});
		}
	});

	$(window).load(function() {
		// Scroll Account Value Graph To Far Right Side
		if($('.graph-data-overflow').length) {
			var graph = $('.graph-data-overflow');
			graph.scrollLeft(999);
		}
		// Dynamic Date Insertion
		if($('.js-todays-date').length) {
			if(typeof $.cookie('js-todays-date') === 'undefined') {
				var today = new Date(),
					dd = today.getDate(),
					mm = today.getMonth()+1,
					yyyy = today.getFullYear();
				if(dd < 10) {
					dd = '0' + dd;
				}
				if(mm < 10) {
					mm = '0' + mm;
				}

				today = mm+'/'+dd+'/'+yyyy;
				$.cookie('js-todays-date', today);
			}
			var cookiedate = $.cookie('js-todays-date');
			$('.js-todays-date').text(cookiedate);
		}
	});
	
});
$(document).ready(function() {

	// alert(document.referrer);

	// INVESTMENTS & PERFORMANCE
	if($('body').hasClass('investment-performance')) {
		var $stickyThead = $('#sticky-thead-1'),
			$mainTable = $('.historical-table-wrap'),
			tableSize = $mainTable.width();
		$(window).on('scroll', showStickyThead);
		$stickyThead.scroll(function() {
			$mainTable.scrollLeft($stickyThead.scrollLeft());
		});
		$mainTable.scroll(function() {
			$stickyThead.scrollLeft($mainTable.scrollLeft());
		});
		if($(window).width() >= 600) {
			tableRowHeights();
			$stickyThead.css('max-width', tableSize);
			$('.sticky-table-scroll.right').css('right',(tableSize * -1));
		} else if($(window).width() <= 599) {
			$('td.row-fund-data').attr('colspan', '2');
		}
	}

	// ACCOUNT SUMMARY
	if($('body').hasClass('account-summary')) {
		$('.graph-data-overflow').scrollLeft(999);
		if($(window).width() >= 800) {
			growBars();
		} else {
			$(window).on('scroll',mobileGrowBars);
		}
	}

	// MANAGE INVESTMENTS
	if($('body').hasClass('manage-investments') && $('.manage-investments-accordion').length) {
		var needHelp = $.cookie('manage-investments-need-help');
		if(needHelp === 'no') {
			$('.single-accordion-open[data-menu-toggle=investments-accordion-need-help-no]').trigger('click');
		}
	}

	// ENROLLMENT
	if($('body').hasClass('enrollment') && $('#page-options-box').length) {
		var $enrollOptions = $('input:radio[name=enrollment-sidebar]'),
			sidebar = $.cookie('enrollment-sidebar');
		$enrollOptions.filter('[value='+sidebar+']').trigger('click');
	}

	// CONTRIBUTIONS LANDING
	if($('#contributions-adjust-form').length) {
		var $contribOptions = $('input:radio[name=contributions-version]'),
			version = $.cookie('contributions-version');
		$contribOptions.filter('[value='+version+']').trigger('click');
		if(window.location.hash === "#accelerator") {
			$('a[data-modal="contributions-auto-increase-edit"]').trigger('click');
		} else if(window.location.hash === "#removecookie") {
			$.removeCookie('contributions-apply-changes');
		}
	}

	// CONTRIBUTIONS PENDING
	if($('#contributions-pending-table-1').length) {
		$('.amountText.amount').text('$2,658');
		$('#page-options-box').hide();
	}

	// CONTRIBUTIONS CONFIRMATION
	if($('.contributions-confirm-header').length) {
		increaseAmountText();
		$('#page-options-box').hide();
	}

	// INVESTMENTS & PERFORMANCE TABLE CODE DEMO PAGE
	// THIS CODE IS NOT PART OF THE ACTUAL PROTOTYPE
	if($('body').hasClass('ip-table-demo')) {
		$('input:radio[name=adjust-iframe-size]').click(function() {
		  var selected = $(this).val(),
		      $iframe = $('#conclusion-iframe');
		  switch(selected) {
		    case 'dt':
		      $iframe.css('max-width','920px');
		      break;
		    case 'tab':
		      $iframe.css('max-width','600px');
		      break;
		    case 'sp':
		      $iframe.css('max-width','350px');
		      break;
		  }
		});
	}
});