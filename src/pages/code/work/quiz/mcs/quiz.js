var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.investorQuiz = function(){
  function quizInit() {
    $('.quiz-question:first').addClass('quiz-question-first');
    $('.quiz-question:last').addClass('quiz-question-last');
    if ($('.quiz-wrapper').hasClass('quiz-always-open')) {
      $('.quiz-question').hide().removeClass('active-question');
      $('.quiz-question.quiz-question-first').show().addClass('active-question');
      owlInit();
    }
  }
  function toggleQuiz() {
    $('.take-quiz-btn').click(function(e) {
      e.preventDefault();
      if ($('.quiz-question-section').is(':hidden')) {
        startQuiz();
      }
    });
    $('.quiz-close').click(function(e) {
      e.preventDefault();
      endQuiz();
    });
    $('.quiz-restart').click(function(e) {
      e.preventDefault();
      startQuiz();
    });
  }
  function startQuiz() {
    resetQuestions();
    $('.quiz-question-heading, .quiz-step-number, .question-nav').show();
    $('.quiz-question').hide().removeClass('active-question');
    $('.quiz-question.quiz-question-first').show().addClass('active-question');
    $('.quiz-question-section').slideDown('fast',function() {
      $('.quiz-question-heading').focus();
    });
    owlInit();
  }
  function endQuiz() {
    $('.quiz-question-section').slideUp('fast');
    $('.quiz-question').hide().removeClass('active-question');
    resetQuestions();
  }
  function resetQuestions() {
    $('.quiz-results-page, .quiz-results, .quiz-restart').hide(); // hide results pages/elements
    $('.quiz-question-section').removeClass('results-shown'); // remove results-shown class from main quiz wrapper
    $('.quiz-question').removeClass('has-answer'); // remove has-answer classes
    $('.quiz-card').removeClass('quiz-card-selected quiz-card-unselected'); // reset selected cards
    $('.quiz-graph-option').removeClass('quiz-graph-selected').addClass('quiz-graph-unselected');
    $('input.conditional-slider-check').removeAttr('checked'); // reset radio buttons
    $('.conditional-slider-check-section .quiz-slider-section').hide(); // hide Q6 slider section
    $('.quiz-slider').each(function() { // reset sliders
      if (typeof noUiSlider !== 'undefined') {
        var slider = this;
        var slideStart = $(slider).data('start');
        slider.noUiSlider.set(slideStart);
      }
    });
    $('.view-all-funds-link').show();
    $('.quiz-question-label-default').show(); // show any default question labels that have an alternate
    $('.quiz-question-label-alt').hide(); // hide any question alternates that may have been shown
    $('.quiz-step-counter').text('1'); // reset step counter
    $('.question-nav').addClass('no-prev-question'); // set nav to be first question
    $('.question-next-btn').attr('disabled','disabled');
  }
  function questionNav() {
    $('.question-next-btn').click(function(e) {
      e.preventDefault();
      var allQs = $('.quiz-question');
      var currQ = $('.quiz-question.active-question');
      if (currQ.is('.quiz-question-last')) {
        compileResults();
      } else {
        var nextQ = allQs.eq(allQs.index(currQ) + 1);
        var nextNum = allQs.index(nextQ) + 1;
        $('.question-nav').removeClass('no-prev-question');
        $('.quiz-step-counter').text(nextNum);
        currQ.removeClass('active-question').fadeOut('fast',function() {
          nextQ.addClass('active-question').fadeIn('fast');
          if (nextQ.hasClass('has-answer') || nextQ.find('.two-slider-section').length) {
            enableNav();
          } else {
            $('.question-next-btn').attr('disabled','disabled');
          }
          if (nextQ.find('.quiz-card-select').length) {
            owlInit();
          }
          $('.quiz-step-number').focus();
        });
      }
    });
    $('.question-back-btn').click(function(e) {
      e.preventDefault();
      var allQs = $('.quiz-question');
      var currQ = $('.quiz-question.active-question');
      var prevQ = allQs.eq(allQs.index(currQ) - 1);
      var prevNum = allQs.index(prevQ) + 1;
      $('.quiz-step-counter').text(prevNum);
      currQ.removeClass('active-question').fadeOut('fast', function() {
        prevQ.addClass('active-question').fadeIn('fast');
        if (prevQ.hasClass('has-answer') || prevQ.find('.two-slider-section').length) {
          enableNav();
        }
        if (prevQ.find('.quiz-card-select').length) {
          owlInit();
        }
        $('.quiz-step-number').focus();
      });
      if (prevQ.is('.quiz-question-first')) {
        $('.question-nav').addClass('no-prev-question');
      }
    });
  }
  function cardSelect() {
    $('.quiz-card').click(function(e) {
      e.preventDefault();
      var card = $(this);
      var cardWrap = card.parents('.quiz-card-select');
      cardWrap.find('.quiz-card').each(function() {
        if ($(this).is(card)) {
          $(this).removeClass('quiz-card-unselected').addClass('quiz-card-selected');
          $(this).attr('aria-checked','true');
        } else {
          $(this).removeClass('quiz-card-selected').addClass('quiz-card-unselected');
          $(this).attr('aria-checked','false');
        }
      });
      cardWrap.parents('.quiz-question').addClass('has-answer');
      enableNav();
    });
  }
  function graphSelect() {
    $('.quiz-graph-option').click(function(e) {
      e.preventDefault();
      var option = $(this);
      var optionWrap = option.parents('.quiz-graph-wrap');
      optionWrap.find('.quiz-graph-option').each(function() {
        if ($(this).is(option)) {
          $(this).removeClass('quiz-graph-unselected').addClass('quiz-graph-selected');
          $(this).attr('aria-checked','true');
        } else {
          $(this).removeClass('quiz-graph-selected').addClass('quiz-graph-unselected');
          $(this).attr('aria-checked','false');
        }
      });
      optionWrap.parents('.quiz-question').addClass('has-answer');
      enableNav();
    });
  }
  function enableNav() {
    $('.question-next-btn[disabled]').removeAttr('disabled');
  }
  function sliderInit() {
    if ($('.quiz-slider').length && typeof noUiSlider !== 'undefined') {
      $('.quiz-slider').each(function() {
        var slider = this;
        var rangeMin = $(slider).data('min');
        var rangeMax = $(slider).data('max');
        var slideStart = $(slider).data('start');
        var sliderSection = $(slider).parents('.quiz-slider-section');
        var counter = sliderSection.find('.year-counter');
        noUiSlider.create(slider, {
          start: slideStart,
          step: 1,
          tooltips: true,
          range: {
            'min':rangeMin,
            'max':rangeMax
          },
          format: {
            to: function(value) {
              var intvalue = parseInt(value);
              if (intvalue === rangeMax) {
                intvalue = intvalue + '+';
              }
              return intvalue;
            },
            from: function(value) {
              return parseInt(value);
            }
          }
        });
        slider.noUiSlider.on('update',function(values, handle) {
          if (sliderSection.find('.quiz-question-label-alt').length) {
            if (values[handle] == 0) {
              sliderSection.find('.quiz-question-label-default').hide();
              sliderSection.find('.quiz-question-label-alt').show();
            } else {
              sliderSection.find('.quiz-question-label-default:hidden').show();
              sliderSection.find('.quiz-question-label-alt:visible').hide();
            }
          }
          counter.text(values[handle]);
        });
        $(slider).on('keydown',function(e) {
          var value = slider.noUiSlider.get();
          switch (e.which) {
            case 38:
              slider.noUiSlider.set(value+1);
              break;
            case 40:
              slider.noUiSlider.set(value-1);
              break;
          }
        });
      });
    }
  }
  function gt20Check() {
    $('input.conditional-slider-check').change(function() {
      var sliderSection = $(this).parents('.quiz-question').find('.quiz-slider-section');
      if ($(this).val() == 'yes') {
        sliderSection.slideDown('fast');
      } else {
        sliderSection.slideUp('fast');
      }
      $(this).parents('.quiz-question').addClass('has-answer');
      enableNav();
    });
  }
  function compileResults() {
    var multipleChoiceScores = 0;
    var graphScores = 0;
    var sliderScores = 0;
    var conditionalScores = 0;

    $('.quiz-card-select').each(function() {
      var dataVal = parseInt($(this).find('.quiz-card-selected').data('val'));
      multipleChoiceScores += dataVal;
    });

    $('.quiz-graph-wrap').each(function() {
      var dataVal = parseInt($(this).find('.quiz-graph-selected').data('val'));
      graphScores += dataVal;
    });

    $('.two-slider-section .quiz-slider-section').each(function() {
      var slider = $(this);
      var dataVal = parseInt(sliderScore(slider));
      sliderScores += dataVal;
    });

    $('.conditional-slider-check-section').each(function() {
      var section = $(this);
      var dataVal = parseInt(conditionalSliderScore(section));
      conditionalScores += dataVal;
    });

    var totalScore = multipleChoiceScores + graphScores + sliderScores + conditionalScores;
    interpretScore(totalScore);
  }


  function sliderScore(sliderSection) {
    var score = 0;
    var yearCount = parseInt(sliderSection.find('.year-counter').text());
    var slider = sliderSection.find('.quiz-slider');
    var ranges = slider.data('ranges').split(',');
    var values = slider.data('values').split(',');
    if (yearCount > ranges[0] && ranges.length > 0) {
      score = values[0];
    } else if (yearCount > ranges[1] && ranges.length >= 2) {
      score = values[1];
    } else if (yearCount > ranges[2] && ranges.length >= 3) {
      score = values[2];
    } else if (yearCount > ranges[3] && ranges.length >= 4) {
      score = values[3];
    } else if (yearCount > ranges[4] && ranges.length >= 5) {
      score = values[4];
    } else if (yearCount > ranges[5] && ranges.length >= 6) {
      score = values[5];
    } else {
      score = 0;
    }
    return score;
  }

  function conditionalSliderScore(conditionalSection) {
    var checkedVal = conditionalSection.find('input.conditional-slider-check:checked').val();
    var sliderSection = conditionalSection.find('.quiz-slider-section');
    if (checkedVal !== undefined) {
      if (checkedVal == 'yes') {
        return sliderScore(sliderSection);
      } else {
        return checkedVal;
      }
    }
  }

  function interpretScore(s) {
    var results = $('.quiz-results');
    var result;
    var matchedResults = [];
    if (s > 0) {
      results.each(function() {
        var dataVal = parseInt($(this).data('val'));
        if (s > dataVal) {
          matchedResults.push($(this));
        }
      });
      result = matchedResults[matchedResults.length - 1];
    } else {
      result = $('.quiz-results[data-val="0"]');
    }
    if (result.data('category') == 'Conservative') {
      $('.view-all-funds-link').hide();
    }
    result.show();
    displayResults(s);
  }
  function displayResults(s) {
    $('.quiz-question-heading, .quiz-step-number, .question-nav').hide();
    $('.quiz-question-last').removeClass('active-question').fadeOut('fast',function() {
      $('.quiz-results-page').fadeIn('fast');
      $('.quiz-question-section').addClass('results-shown');
      $('.quiz-restart').show();
      $('.quiz-question').removeClass('has-answer');
    });
  }
  function owlInit() {
    if (window.innerWidth < 768) {
      $('.quiz-card-select').addClass('owl-carousel');
      $('.quiz-card-select').owlCarousel({
        itemsMobile: [767,1],
        navigation: true,
        rewindNav: false
      });
      $('.quiz-card-select').each(function() {
        var quiz = $(this);
        var quizData = quiz.data('owlCarousel');
        if (quiz.find('.quiz-card-selected').length) {
          var selected = quiz.find('.quiz-card-selected').parent('.owl-item').index();
          quizData.goTo(selected);
        }
      });
    } else {
      if($('.owl-carousel').length){
        $('.owl-carousel').each(function() {
          var carouselData = $(this).data('owlCarousel');
          if (carouselData !== undefined) {
            carouselData.destroy();
          }
          $('.quiz-card-select').removeClass('owl-carousel');
        });
      }
    }
  }
  function resizeHandler() {
    var resizeTimeout;
    $(window).resize(function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(owlInit, 500);
    });
  }
  function init() {
    // only initialize these if the main quiz component is present
    if ($('.quiz').length) {
      quizInit();
      toggleQuiz();
      questionNav();
    }
    cardSelect();
    graphSelect();
    sliderInit();
    gt20Check();
    resizeHandler();
  }
  init();
};
$(document).ready(function() {
  if ($('.quiz').length || $('.quiz-question').length) {
    thv.mcs.investorQuiz();
  }
});