/** a JS file that shall be included */

var thv = thv || {};
thv.common = thv.common || {};
thv.common.navTabsObj = {};

thv.common.respTables = function(scope) {
    function init() {
        $(window).resize(function(){
            var winWidth = $(window).width();

            $('.resp-table').each(function(){
                updateRespTables($(this), winWidth);
            });
        });

        initRespTables();
    }

    function initRespTables(scope) {
        var tables;

        if(typeof scope !== 'undefined') tables = $(scope + ' .resp-table');
        else tables = $('.resp-table');

        tables.each(function(){
            updateRespTables($(this), $(window).width());
        });

        tables.find('.toggle-details a').click(function(e){
            e.preventDefault();
        });

        tables.find('.main').click(function(e){
            var
                curr = $(this),
                parent = curr.parent();

            if(curr.find('.toggle-details:visible').length > 0) {
                curr.toggleClass('open');
                parent.find('tr').eq(curr.index() + 1).toggleClass('open');
            }
        });
    }

    function updateRespTables(table, windowWidth){
        var
            hiddenCount = 0,
            headerCells = table.find('th'),
            dataCells = table.find('.main td'),
            details = table.find('.details td'),
            detailRows = details.find('.detail-row'),
            toggles = table.find('.toggle, .toggle-details');

        dataCells.show();
        headerCells.show();
        detailRows.hide();

        headerCells.each(function(i, v){
            var
                curr = $(v),
                threshold = curr.data().hide || 0;

            if(threshold == -1 || threshold >= windowWidth) {
                var index = i + 1;

                curr.hide();
                dataCells.filter(':nth-child(' + index + ')').hide();
                detailRows.filter(':nth-child(' + index + ')').show();

                hiddenCount++;
            }
        });

        if(hiddenCount == 0) {
            toggles.hide();
            table.find('.open').removeClass('open');
            table.addClass('no-pointer');
        }
        else {
            toggles.show();
            table.removeClass('no-pointer');
        } 

        details.attr('colspan', headerCells.length - hiddenCount);
    }

    init();

    return {
        updateRespTables: updateRespTables,
        initRespTables: initRespTables
    };
};

thv.common.navigateToTab = function(anchorText) {
    var getHeaderPadding = function() {
        var padding = 0;
        if( window.innerWidth < 768 ) { 
            padding = 10;
        } else if( window.innerWidth < 986 ) {
            padding = 155;
        } else {
            padding = 60;
        }
        
        return padding;
    };
    
    var poll = function(selector, delay, callback) {
        var counter = 0;
        setTimeout(function() {
            var checkExist = setInterval(function() {
                if( $(selector).length ) {
                   callback();
                   clearInterval(checkExist);
                } else if( counter === 20 ) {
                    clearInterval(checkExist);
                } else {
                    counter++;
                }
            }, 100);
        }, delay); 
    };
    
    var anchorSplit = anchorText.split('#');
    var targetTab = anchorSplit[1].replace('_', '');
    var targetInnerAnchor = anchorSplit[2];

    if( !targetInnerAnchor ) {
        $('html,body').scrollTop( $('#detail-tabs-container').offset().top );
        if(!$('.load-tab-toggle[href="#' + targetTab + '"]').parent().hasClass('active')){
            $('.load-tab-toggle[href="#' + targetTab + '"]:visible').click();
        }
    } else {
        if(!$('.load-tab-toggle[href="#' + targetTab + '"]').parent().hasClass('active')){
            $('.load-tab-toggle[href="#' + targetTab + '"]:visible').click();
        }
        poll("a[name='"+ targetInnerAnchor +"']", 500, function(){
            $('html,body').scrollTop( $("a[name='"+ targetInnerAnchor +"']").offset().top - getHeaderPadding() );
        });
    }
};

// Enable tab anchor navigation through URL
thv.common.processUrlTabNavigation = function() {
    if( window.location.hash && window.location.hash.indexOf('#_') === 0 ) {
        thv.common.navigateToTab(window.location.hash);
    }
};

// Enable tab links in the document
thv.common.processLinksTabNavigation = function() {
    $('a[href^="#_"]').click(function(e){
        e.preventDefault();
        thv.common.navigateToTab( $(this).attr('href') );
    });
};

thv.common.navTabs = function(){
    var isMobile = $('.tab-pane .load-tab-toggle').eq(0).is(':visible'),
        isEditMode = false,
        initTab = getParameterByName('initTab');

    initTab = (initTab) ? '#' + initTab : '';

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function loadTab(e) {
        var curr = $(this),
            dataUrl = curr.data().loadTarget,
            targetTab = $(curr.attr('href')),
            loadTarget = targetTab.find('.tab-load');

        e.preventDefault();

        if(!$.trim(loadTarget.html())) {
            targetTab.addClass('loading');
            loadTarget.load(dataUrl + window.location.search, function(){
                thv.common.tabsInit[targetTab.attr('id') + 'Init']();
                targetTab.removeClass('loading').addClass('loaded');
                thv.common.processLinksTabNavigation();
            });
        } else if(isEditMode && !targetTab.hasClass('js-init')) {
            thv.common.tabsInit[targetTab.attr('id') + 'Init'](isEditMode);
            targetTab.addClass('js-init');
        }

        if(isMobile && !curr.parent().hasClass('active')) {
            setTimeout(function(){
                $('html,body').scrollTop(targetTab.offset().top);
            }, 200);
        }
    }

    $('.tab-load').each(function(){
        if($.trim($(this).html())) {
            isEditMode = true;
            $('.loading-spinner').css('display', 'none !important');
            return false;
        }
    });

    $('.load-tab-toggle').click(loadTab);
    $('.tab-pane .load-tab-toggle').click(function(e){
        var curr = $(this),
            parent = curr.parent();

        if(parent.hasClass('active')) {
            e.stopPropagation();
            parent.removeClass('active in');
        } else {
            var tabIndex = curr.parent().index();
            console.log(tabIndex);
            console.log($('.details .nav-tabs li').eq(tabIndex));

            $('.details .nav-tabs li')
                .removeClass('active')
                .eq(tabIndex)
                .addClass('active');
        }
    });

    if(initTab && isMobile) {
        $('.tab-pane .load-tab-toggle[href="' + initTab + '"]')
            .first()
            .click();
    }
    else if(initTab) {
        $('.load-tab-toggle[href="' + initTab + '"]')
            .first()
            .click();
    }
    else if(!isMobile) $('.nav-tabs .load-tab-toggle').first().click();

    $(window).resize(function(){
        isMobile = $('.tab-pane .load-tab-toggle').eq(0).is(':visible');
    });

    return {
        isEditMode: isEditMode
    };
};

thv.common.tooltips = function(scope) {
    var
        helptext,
        tooltips,
        curr,
        first;

    if(typeof scope !== 'undefined') {
        helptext = $(scope).find('.help-text');
        tooltips = $(scope).find('.tool-tip, tool-tip-h2');
    }
    else {
        helptext = $('.help-text');
        tooltips = $('.tool-tip, .tool-tip-h2');
    }

    $('.tool-tip-close').on('click',function(e){
        e.stopImmeidatePropagation;
        toggleToolTips(first);
        return false;
    })

    function toggleToolTips(target) {
        target.toggleClass('toolTipDisplay');
                
        if(target.data().targetParent) {
            target
                .parent()
                .siblings('.help-text')
                .css( {left: '', right: ''} )
                .toggle();
        }
        else {
            target
                .siblings('.help-text')
                .css( {left: '', right: ''} )
                .toggleClass('helpTextDisplay');
        }
        updateTooltipAlign();
    }

    function initTooltipToggles() {

        tooltips.click(function(e) {

            e.preventDefault();
            if(e.target.className != 'tool-tip toolTipDisplay'){
                console.log($('.helpTextDisplay').length);
                curr = $(e.target);
                console.log(curr);


                if (curr.hasClass('toolTipDisplay')){
                    toggleToolTips(curr);

                    e.stopPropagation();
                    initTooltipClose();
                }else if($('.helpTextDisplay').length === 0 && !curr.hasClass('toolTipDisplay') ){
                    first = curr;
                    toggleToolTips(curr);
                    e.stopPropagation();
                    initTooltipClose();
                }else if (curr != first){

                    toggleToolTips($('.toolTipDisplay'));
                    toggleToolTips(curr);

                    first = curr;

                    e.stopPropagation();
                    $('html').click(function(e){
                        if( !($(e.target).is('.helpTextDisplay, .helpTextDisplay p')) ){
                            e.preventDefault();
                            
                            first
                                .siblings('.helpTextDisplay')
                                .removeClass('helpTextDisplay');

                            first.removeClass('toolTipDisplay');

                            $(this).unbind(e);
                        }
                        
                    }); 
                }
            }
        });

    }

    function initTooltipClose() {

        $('html').click(function(e){
            // console.log($(e.target).children());
            if( $(e.target).is('.helpTextDisplay p a') ){
                // console.log('linktext');
                toggleToolTips(first);

                $(this).unbind(e);
            }
            else if( !($(e.target).is('.helpTextDisplay, .helpTextDisplay p')) ){
                e.preventDefault();
                toggleToolTips(first);

                $(this).unbind(e);
            }
            
        });     
    }

    function updateTooltipAlign() {

        $('.help-text.helpTextDisplay').each(function(e){
            var
                curr = $(this),
                offset = curr.offset(),
                right = offset.left + curr.outerWidth(),
                windowWidth = $(window).width(),
                halfWidth = curr.outerWidth() * .5,
                padding = curr.parent().prev().offset().left;
                
            if((windowWidth < 768)||(curr.parents('#highlights').length)){
                if(right > windowWidth - padding) curr.css('right', '-110px');
                else if(offset.left < padding) curr.css('left', '159px');
            }
            if((windowWidth < 768)&&(curr.parents('.compare').length)){
                if(offset.left < padding) curr.css('left', '59px');
            }
            
        });
    }

    initTooltipToggles();
    
};

thv.common.tooltipsResize = function(){
    $(window).resize(function(){
        $('.help-text.helpTextDisplay')
            .css( {left: '', right: ''} )
            .removeClass('helpTextDisplay')
            .siblings('.toolTipDisplay')
            .removeClass('toolTipDisplay');
    });
};

thv.common.hasFund = function(){
    console.log('has fund');
};

thv.common.scrollAnims = function(){
    function initScollAnims() {
      var scrollTargets = $('.scroll-anim, .fund-details-list li.item');

      $(window).scroll(function(e){
        var
          scrollThreshold = $(window).height() * .9,
          scrollTop = $(window).scrollTop();

        if( $('#main-nav .navbar-toggle').css('display') == 'block' ) {
            scrollThreshold = $(window).height() * .95;
        }

        scrollTargets.each(function(){
          var curr = $(this);
          if(curr.is(':visible') && curr.offset().top < scrollTop + scrollThreshold) curr.addClass('active-scroll-transition');
        });
      });

      setTimeout(function(){ $(window).trigger('scroll'); }, 100);
    }

    initScollAnims();
};

$(document).ready(function() {
    if(!window.console){console={}; console.log = function(){};}
    thv.common.respTablesObj = thv.common.respTables();
    
    thv.common.tooltips();
    thv.common.tooltipsResize();
    thv.common.scrollAnims();
    
    if( $('#detail-tabs-container').length ) {
        thv.common.navTabsObj = thv.common.navTabs();
        thv.common.processLinksTabNavigation();
        thv.common.processUrlTabNavigation()
    }
});

var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.header = function(){
  function init() {
    $('select.fund-header-shares').on('change',function(){
      window.location = '//' + location.host + $(this).val();
    });
  }
  init();
}


$(document).ready(function() {
  if($('#fund-header').length) {
      thv.mcs.header();
  }
});

var thv = thv || {};
thv.common = thv.common || {};
thv.common.fundSummaryCards = {
    riskCards : {
            "aggressive": {
                "row":   0,
                "column":  0
            },
            "moderately-aggressive": {
                "row":   0,
                "column":  1
            },
            "moderate": {
                "row":   0,
                "column":  2
            },
            "moderately-conservative": {
                "row":   0,
                "column":  3
            },
            "conservative": {
                "row":   0,
                "column":  4
            },
        },

    fundCards : {
        "AA_MF": {
            "row":   3,
            "column":  0
        },
        "GF_MF": {
            "row":   2,
            "column":  2
        },
        "LCV_MF": {
            "row":   2,
            "column":  1
        },
        "SCS_MF": {
            "row":   1,
            "column":  1
        },
        "MCS_MF": {
            "row":   1,
            "column":  4
        },
        "LCV_MF": {
            "row":   2,
            "column":  0
        },
        "LCS_MF": {
            "row":   5,
            "column":  0
        },
        "PEME_MF": {
            "row":   5,
            "column":  1
        },
        "PWA_MF": {
            "row":   5,
            "column":  2
        },
        "EIP_MF": {
            "row":   3,
            "column":  3
        },
        "BF_MF": {
            "row":   3,
            "column":  1
        },
        "HY_MF": {
            "row":   4,
            "column":  0
        },
        "MA_MF": {
            "row":   4,
            "column":  1
        },
        "MAA_MF": {
            "row":   4,
            "column":  2
        },
        "MCA_MF": {
            "row":   4,
            "column":  3
        },
        "CB_MF": {
            "row":   3,
            "column":  2
        },
        "HYF_MF": {
            "row":   6,
            "column":  0
        },
        "IF_MF": {
            "row":   6,
            "column":  0
        },
        "MBF_MF": {
            "row":   7,
            "column":  3
        },
        "GB_MF": {
            "row":   7,
            "column":  0
        },
        "LMB_MF": {
            "row":   6,
            "column":  3
        },
        "MM_MF": {
            "row":   7,
            "column":  3
        }
    },

//ordered by equity percentage 
    fundEquity : {
        "95": {
            "row":   3,
            "column":  0
        },
        "50": {
            "row":   3,
            "column":  1
        },
        "5": {
            "row":   3,
            "column":  2
        },
        "70": {
            "row":   3,
            "column":  3
        },
        "0": {
            "row":   3,
            "column":  4
        },
        "100": {
            "row":   3,
            "column":  5
        },
        "30": {
            "row":   4,
            "column":  0
        },
        "57": {
            "row":   4,
            "column":  1
        },
        "77": {
            "row":   4,
            "column":  2
        },
        "37": {
            "row":   4,
            "column":  3
        },
        "90": {
            "row":   4,
            "column":  4
        },
        "65": {
            "row":   5,
            "column":  0
        },
        "75": {
            "row":   5,
            "column":  2
        }
    }
};
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.topTenChart = function(){

    function highChartsInit() {


        if ($('#top-ten-holdings').length) {

            Highcharts.setOptions({
                colors: ['#33cb99', '#efeeee']
            });

            // Create the chart
            $('#containerTopTen').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: '<span class="fund-percentage-lg-chart">' + topTenData[0].y + '%</span>',
                    useHTML: true,
                    floating: true,
                    align: 'center',
                    verticalAlign: 'middle',
                    y: -20,
                    x: 0
                },
                subtitle: {
                    text: '<span class="desc-lg-chart">Percentage <br> of total assets<span>',
                    useHTML: true,
                    floating: true,
                    align: 'center',
                    verticalAlign: 'middle'
                },
                // tooltip: {
                //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                // },
                plotOptions: {
                    pie: {
                        startAngle: 0,
                        endAngle: 360,
                        //center: ['50%', '50%'],
                        states: {
                            hover: { enabled: false }
                        }
                    },
                    series: {
                        dataLabels: { enabled: false }
                    }
                },
                series: [{
                        type: 'pie',
                        size: '76%',
                        innerSize: '80%',
                        data: topTenData
                    }],
                tooltip: { enabled: false }
            });

        } else if ($('#top-ten-states').length) {
                
            $('#containerTopTenStates').highcharts('Map', {
                title : {
                    text : ''
                },
                credits: {
                      enabled: false
                },
                legend: {
                    layout: 'horizontal',
                    borderWidth: 0,
                    floating: true,
                    verticalAlign: 'bottom',
                    y: 20
                },

                mapNavigation: {
                    enabled: false
                },

                colorAxis: {
                    min: 0,
                    max: 20,
                    startOnTick: true,
                    endOnTick: true,
                    tickInterval: 5,
                    dataClassColor: 'tween',
                    gridLineColor: 'white',
                    type: 'linear',
                    minColor: '#d0e0db',
                    maxColor: '#009865',
                    labels: {
                        format: '{value}%'
                    },
                    marker: {
                        color: 'grey'
                    }
                },
                colors: ['#009865', '#47B289'],
                series : [{
                    type: 'map',
                    allAreas: true,
                    nullColor: '#d0e0db',
                    data : topTenStatesData,
                    mapData: Highcharts.maps['countries/us/us-all'],
                    joinBy: ['name'],
                    dataLabels: {
                        enabled: false,
                        format: ' '
                    },
                    // name: {series.name}
                    borderWidth: 1,
                    borderColor: 'white'
                }],
                tooltip: {
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    borderColor: '#ccd3da',
                    borderRadius: 1,
                    headerFormat: '',
                    pointFormat: '<b>{point.name}</b> {point.value}%',
                },
            });
        }
    };


  function init() {
    setTimeout(function() {
        highChartsInit();
    }, 1200);
  }
  init();
}

$(document).ready(function() {
  if($('#containerTopTen').length) {
      thv.mcs.topTenChart();
  }
});
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.overview = function(){

  function descLimit() {
    if ($('#fund-overview').find('.desc').length) {
      $('#fund-overview .desc').each(function() {
        var $elem = $(this),
            $str = $elem.html(),
            charCount = $str.length,
            limit = 420,
            $viewMore = $('.view-more-wrapper').html(),
            $viewLess = $('.view-less-wrapper').html();
        if (charCount >= limit) {
          var $str1 = $str.substr(0,limit),
              $str2 = $str.substr(0, Math.min($str1.length, $str1.lastIndexOf(" "))),
              limitDiff = limit - $str2.length,
              newLimit = limit - limitDiff,
              $str3 = $str.substr(newLimit,charCount);
          
          $elem.html($str2 + $viewMore + '<span class="truncate sr-only">' + $str3 + '</span>' + $viewLess);
        }
      });
      $('body').on('click','.view-toggle a',function(e) {
        e.preventDefault();
        var $desc = $(this).parents('.desc');
        $desc.find('.view-toggle').toggle();
        $desc.find('.truncate').toggleClass('sr-only');
      });
    }
  }

  function toggleCTA(){
    var preFundList = sessionStorage.getItem('thv-funds');
    var fundList = JSON.parse(preFundList);
    // console.log(fundList[0].indexOf(thv.mcs.ticker) > -1);
    if(fundList && fundList[0] != null){
      var hasFund = fundList[0].indexOf(thv.mcs.ticker) > -1;
      if(hasFund){
        $('#fund-header p.user-own-shares').css('display','block');
        $('.fund-header-main-cta.btn-primary').html("BUY MORE SHARES");
        $('.btn-primary.buy-funds').html("BUY MORE SHARES");
      }
    }
  }

  function fundManagement() {
    $('.fund-management-toggle a').on('click',function(e) {
      e.preventDefault();
      var $parent = $(this).parent('.fund-management-toggle');
      $parent.toggleClass('open');
      $('.fund-managers-wrap').toggle();
      if ($parent.hasClass('open')) {
        $(this).attr('aria-expanded','true');
      } else {
        $(this).attr('aria-expanded','false');
      }
    });
  }

  function init() {
    descLimit();
    fundManagement();
    toggleCTA();
  }
  init();
}

$(document).ready(function() {
  if($('#fund-overview').length) {
    thv.mcs.overview();
    thv.mcs.youtubePlayer();
  }
});

var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.diversification = function(){

  if ($('#diversification').length) {
    var colorsColors;
    if(digitalData.pageInfo.siteSection2 == 'Fixed Income Category Landing' || digitalData.pageInfo.siteSection2 =='Equity Category Landing'){
      colorArr = ['#009865', '#1D596C', '#32CB98', '#72B7BC', '#33AD84', '#4a7a89', '#5bd5ad', '#8ec5c9', '#7fcbb2', '#8eacb5', '#98e5cb', '#b8dbdd'];
    }
    else{
      colorsColors = {"Large Cap Equity": "#046a38","Global Core": "#046a38","U.S. Equity": "#046a38","US Large Cap Equity": "#046a38","Large Cap Equity": "#046a38","Large Cap Value": "#00965e","Large Cap Growth": "#40c1ac","Mid Cap Core": "#d4c304","Mid Cap Value": "#385e9d","Mid Cap Growth": "#a4c8e1","Mid Cap Equity": "#d4c304","Small Cap Core": "#6a3460","Small Cap Value": "#a2789c","Small Cap Growth": "#948794","Multi-Cap Core": "#005a70","US Mid/Small Cap Equity": "#9bd3dd","Small Cap Equity": "#6a3460","International Equity": "#893c47","International Debt": "#6a3735","Sector": "#cf7f00","Natural Resources": "#cf7f00","Real Estate": "#f1b434","Real Estate Operating Companies": "#f1b434","Real Estate Services": "#f1b434","Municipal Bonds": "#6C4931","Opportunistic Fixed-Income": "#6C4931","Opportunistic Fixed Income": "#6C4931","Opportunistic Equity": "#b9975b","Preferred Securities": "#A2A9A8","Securitized Debt": "#5b6770","Short Term Bonds": "#bd472a","Investment Grade Credit": "#babd8b","Government": "#43695b","Government Bonds": "#43695b","High Yield Bonds": "#774212","Multi-Sector Income": "#967126","Cash": "#0E0D05","Floating-Rate Bank Loans": "#3C3433"};
      
      var colorArr = []
      for(var t = 0; t < diversificationData.length; t++){
        for(var i in colorsColors){
          if(i == diversificationData[t].x){
              colorArr.push(colorsColors[i])
          }
        }
      }
    }
  }

  function highChartsInit() {

    Highcharts.setOptions({
      colors: colorArr
    });

    $('#containerDiversification').highcharts({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        events: {
          load: chartDone()
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: '<span class="fund-percentage-lg-chart">' + diversificationData[0].y + '<sup>%</sup></span>',
        useHTML: true,
        floating: true,
        align: 'center',
        verticalAlign: 'top',
        y: 170,
        style: {
          'color': '#656565'
        }
      },
      subtitle: {
        text: '<span class="desc-lg-chart">' + diversificationData[0].x + '</span>',
        useHTML: true,
        floating: true,
        align: 'center',
        verticalAlign: 'middle',
        style: {
          'color': '#656565'
        }
      },
      tooltip: {
        enabled: false
        // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false
          },
          startAngle: 0,
          endAngle: 360,
          center: ['50%', '50%'],
          innerSize:'77%',
          borderWidth: 0,
          states: {
            hover: {
              brightness:0,
              halo: {
                opacity:0.5
              }
            }
          }
        },
        series: {
          point: {
            events: {
              mouseOver: function() {
                $('#diversification .diversification-list li').eq(this.index).addClass('hovered');
                displayFundInfo(this.index);
              },
              click: function() {
                $('#diversification .diversification-list li').eq(this.index).addClass('hovered');
                displayFundInfo(this.index);
              },
              mouseOut: function() {
                $('#diversification .diversification-list li').eq(this.index).removeClass('hovered');
              }
            }
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Fund Diversification',
        data: diversificationData
      }]
    });

  }

  function chartDone() {
    //$(window).resize();
  }

  function fundColorApply() {
    $('#diversification .diversification-list li').each(function(i) {
      if (i >= colorArr.length) {
        i = $(this).index() - colorArr.length;
      }
      $(this).css('border-color',colorArr[i]);
      $(this).find('.fund-color').css('background-color',colorArr[i]);
    });
  }

  function fundHighlight() {
    $('#diversification .diversification-list li').on('mouseenter click', function(e) {
      var chartNum = $('#containerDiversification').attr('data-highcharts-chart');
      var chart = Highcharts.charts[chartNum];
      var pointIndex = $(this).index();
      chart.series[0].data[pointIndex].setState('hover');
      displayFundInfo(pointIndex);
    }).on('mouseleave', function(e) {
      var chartNum = $('#containerDiversification').attr('data-highcharts-chart');
      var chart = Highcharts.charts[chartNum];
      var pointIndex = $(this).index();
      chart.series[0].data[pointIndex].setState('');
    });
  }

  function displayFundInfo(index) {
    var chartNum = $('#containerDiversification').attr('data-highcharts-chart');
    var chart = Highcharts.charts[chartNum];
    $('#containerDiversification .fund-percentage-lg-chart').html(chart.series[0].data[index].y + '<sup>%</sup>');
    $('#containerDiversification .desc-lg-chart').text(chart.series[0].data[index].x);
  }

  function init() {
    fundColorApply();
    setTimeout(function() {
      highChartsInit();
      fundHighlight();
    }, 1200);
  }
  if ($('#diversification').length) {
    init();
  }
}

$(document).ready(function() {
  if($('#containerDiversification').length) {
      thv.mcs.diversification();
  }
});
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.betaRisk = function(){

  function betaGraph() {
    var graph = $('.betaGraph'),
        barWidth = graph.width(),
        risk = graph.find('.risk'),
        beta = +(risk.find('span.beta').text()),
        val = (beta*100);
    if (val >=0 && val <= 200){
      var w = 200-val, 
          pathWidth = (barWidth*w)/200,
          position = barWidth-pathWidth,
          riskPosition = {
              left: position
          }
      risk.css(riskPosition);    
    } 
  }
  function init() {
    betaGraph();
  }
  init();
  
  $(window).on('resize', function(){
    betaGraph();
  });

}

$(document).ready(function() {
  if($('#beta-risk').length) {
    thv.mcs.betaRisk();
  }
});
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.riskAndVolatility = function(){

  /* Hack for 3yr/5yr/10yr tabs to have correct aria-expanded attribute,
     because nested tabs aren't supported in Bootstrap */
  function yearToggle() {
    $('a[href="#riskVolatility"]').on('shown.bs.tab', function(e) {
      setTimeout(function(){
          if ($('#riskVolatility').find('.year-toggle').length) {
            $('.year-toggle > li').each(function() {
              if ($(this).hasClass('active')) {
                $(this).find('a').attr('aria-expanded','true');
              } else {
                $(this).find('a').attr('aria-expanded','false');
              }
            });
          }
      }, 1000);
    });
  }

  function init() {
    yearToggle();
  }
  init();
}

$(document).ready(function() {
  if($('#riskVolatility').length) {
      thv.mcs.riskAndVolatility();
  }
});

var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.qualityRating = function() {

    function initCharts() {

        var scope = $('#quality-rating-distribution');

        if (scope.length) {
            // colors 
            Highcharts.setOptions({
                colors: ['#33cb99', '#efeeee']
            });

            // Create the charts
            var chart1 = new Highcharts.Chart({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    height: 280,
                    renderTo: 'containerHQ'
                    
                },
                title: {
                    text: '<span class="fund-percentage-lg-chart">' + Number(hqData[0].y).toFixed(1) + '%</span>',
                    useHTML: true,
                    floating: true,
                    align: 'center',
                    y: 115,
                },
                subtitle: {
                    text: '<span class="desc-lg-chart">' + sub_title1 + '<span>',
                    useHTML: true,
                    floating: true,
                    align: 'center',
                    y:150
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: 0,
                        endAngle: 360,
                        center: ['50%', '50%']
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    innerSize: '90%',
                    data: hqData,
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    series: {
                        dataLabels: {
                            enabled: false
                        }
                    }
                }],
                tooltip: {
                    enabled: false
                }

            });
            var chart2 = new Highcharts.Chart({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    height: 280,
                    renderTo: 'containerHY'
                    
                },
                title: {
                    text: '<span class="fund-percentage-lg-chart">' + Number(hyData[0].y).toFixed(1) + '%</span>',
                    useHTML: true,
                    floating: true,
                    align: 'center',
                    y: 115
                },
                subtitle: {
                    text: '<span class="desc-lg-chart">' + sub_title2 + '<span>',
                    useHTML: true,
                    floating: true,
                    align: 'center',
                    y: 150
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: 0,
                        endAngle: 360,
                        center: ['50%', '50%']
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    innerSize: '90%',
                    data: hyData,
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    series: {
                        dataLabels: {
                            enabled: false
                        }
                    }
                }],
                tooltip: {
                    enabled: false
                }
            });
            var chart3 = new Highcharts.Chart({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    height: 280,
                    renderTo: 'containerNR'
                    
                },
                title: {
                    text: '<span class="fund-percentage-lg-chart">' +  Number(nrData[0].y).toFixed(1) + '%</span>',
                    useHTML: true,
                    floating: true,
                    align: 'center',
                    y: 115
                },
                subtitle: {
                    text: '<span class="desc-lg-chart">' + sub_title3 + '<span>',
                    useHTML: true,
                    floating: true,
                    align: 'center',
                    y: 150
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: 0,
                        endAngle: 360,
                        center: ['50%', '50%']
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    innerSize: '90%',
                    data: nrData,
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    series: {
                        dataLabels: {
                            enabled: false
                        }
                    }
                }],
                tooltip: {
                    enabled: false
                }
            });
            var chart4 = new Highcharts.Chart({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    height: 280,
                    renderTo: 'containerETF'
                    
                },
                title: {
                    text: '<span class="fund-percentage-lg-chart">' + Number(etfsData[0].y).toFixed(1) + '%</span>',
                    useHTML: true,
                    floating: true,
                    align: 'center',
                    y: 115
                },
                subtitle: {
                    text: '<span class="desc-lg-chart">' + sub_title4 + '<span>',
                    useHTML: true,
                    floating: true,
                    align: 'center',
                    y: 150
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: 0,
                        endAngle: 360,
                        center: ['50%', '50%']
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    innerSize: '90%',
                    data: etfsData,
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    series: {
                        dataLabels: {
                            enabled: false
                        }
                    }
                }],
                tooltip: {
                    enabled: false
                }
            });

        };

    } // end initCharts

    function qrChartInit() {
        setTimeout(function() {
          initCharts();
        }, 1200);

        // console.log('qualityRating init');
    }

    qrChartInit();

}; // end of object => thv.mcs.qualityRating


var thv = thv || {};
thv.common = thv.common || {};
thv.common.tabsInit = {};

thv.common.tabsInit.performanceInit = function(isEditMode){
    console.log('performance');
    if(!isEditMode) {
        thv.common.respTablesObj.initRespTables('#performance');
        thv.common.tooltips('#performance');
        thv.mcs.performance();
    }
    else {
        setTimeout(function(){
            thv.mcs.performance();
        }, 1000);
    }
};

thv.common.tabsInit.holdingsInit = function(isEditMode){
    thv.mcs.diversification();
    thv.mcs.topTenChart();
    thv.mcs.qualityRating();
    setTimeout(function(){
        console.log('holdings');
        thv.mcs.fundHoldings();
    }, 1000);
    if(!isEditMode) {
        thv.common.respTablesObj.initRespTables('#holdings');
        thv.common.tooltips('#holdings');
    }
    // setTimeout(function() {
    //    $(window).resize(); // Window resize fixes highcharts map layouts
    // }, 2000);
};

thv.common.tabsInit.riskVolatilityInit = function(isEditMode){
    console.log('riskVolatility');
    thv.mcs.betaRisk();
    thv.mcs.riskAndVolatility();
    if(!isEditMode){
        thv.common.tooltips('#riskVolatility');
        thv.common.respTablesObj.initRespTables('#riskVolatility');
    }
    setTimeout(function() {
        $(window).resize(); // Window resize fixes highcharts map layouts
    }, 1000);
};

thv.common.tabsInit.distributionYieldsInit = function(isEditMode){
    if(!isEditMode){
        thv.common.respTablesObj.initRespTables('#distributionYields');
        thv.common.tooltips('#distributionYields');
    }
       
    console.log('distributionYields');
};

thv.common.tabsInit.morningstarInit = function(isEditMode){
    console.log('morningstar');
    thv.common.tooltips('#morningstar');
};

thv.common.tabsInit.feesExpensesInit = function(isEditMode){
    if(!isEditMode)
       thv.common.tooltips('#feesExpenses');
        console.log('feesExpenses');
    if(typeof thv.mcs.feesAndExpenses !== 'undefined') thv.mcs.feesAndExpenses();
};

thv.common.tabsInit.initAll = function(isEditMode){
    thv.common.tabsInit.performanceInit(isEditMode);
    thv.common.tabsInit.holdingsInit(isEditMode);
    thv.common.tabsInit.riskVolatilityInit(isEditMode);
    thv.common.tabsInit.distributionYieldsInit(isEditMode);
    thv.common.tabsInit.morningstarInit(isEditMode);
    thv.common.tabsInit.feesExpensesInit(isEditMode);
};

var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.homePage = function(){
  function pinNav() {
    fakewaffle.responsiveTabs(['sm']);
    $('a.accordion-toggle').addClass('collapsed');
    $('.panel .accordion-toggle.collapsed').attr('aria-expanded','false');
    $('#pinNav a').click(function(e) {
      e.preventDefault();

      if($(this).parent().hasClass('active')) {
        $('.tab-pane.active').removeClass('active');
        $('.nav-tabs.responsive .active a').attr('aria-expanded', 'false');
        $('.nav-tabs.responsive .active').removeClass('active');
        $('.accordion-toggle').not('collapsed').addClass('collapsed');
        $('.panel-collapse.in').removeClass('in');
        $('.panel-body.active').removeClass('active');
        e.stopPropagation();

        $('.tab-content').css('max-height', '');
      }
      else {
        $('.tab-content').css('max-height', '5000px');
        setTimeout(function(){
          $(window).trigger('scroll');
        }, 500);
      }
      if(parseInt($('body').css('width')) < 980 && parseInt($('body').css('width')) > 768) {
        $('html, body').animate({
          scrollTop: $('#pinNav').offset().top-120
        }, 2000, 'swing');
      } else if(parseInt($('body').css('width')) > 979 && !$('.navbar').hasClass('affix') ) {
        $('html, body').animate({
          scrollTop: $('#pinNav').offset().top-30
        }, 2000, 'swing');
      } else if(parseInt($('body').css('width')) > 979 && $('.navbar').hasClass('affix') ) {
        $('html, body').animate({
          scrollTop: $('#pinNav').offset().top-30
        }, 2000, 'swing');
      }

    });

    $('#collapse-pinNav .panel-default').on('shown.bs.collapse', function(){
      if($('.hero img').css('min-width') === '2px') {
        setTimeout(function(){
          $(window).trigger('scroll');
        }, 500);
        $('html,body').animate({
          scrollTop: $('.accordion-toggle').not('.collapsed').offset().top
        }, 500);
      }
    });
  }

  function init() {
    pinNav();
  }

  function initCarousel() {
    var homeCarousel = $('#home-carousel');

    homeCarousel.owlCarousel({
        paginationSpeed: 500,
        slideSpeed: 200,
        rewindSpeed: 500,
        singleItem: true,
        beforeInit: function(){
          if($('#home-carousel > div').length < 2)
            $('.home-carousel-wrapper .carousel-arrow').hide();
        }
    });

    $('.home-carousel-wrapper .carousel-arrow.left').click(function(e){
        e.preventDefault();
        if(!$(this).hasClass('inactive')) homeCarousel.trigger('owl.prev');
    });

    $('.home-carousel-wrapper .carousel-arrow.right').click(function(e){
        e.preventDefault();
        if(!$(this).hasClass('inactive')) homeCarousel.trigger('owl.next');
    });
  }

  init();
  initCarousel();
  //initScollAnims();
}

$(document).ready(function() {
  if($('#home-page').length) {
    thv.mcs.homePage();
    var titleTextImageLink = $('.titleTextImageLink .light-green-bg');
    if($(titleTextImageLink).length){
        $(titleTextImageLink).parent().css({'background-color':'#f4f8f6'});
    }
  }
});
var thv = thv || {};
thv.mcs = thv.mcs || {};

thv.mcs.performance = function(){
    var
        fundColors = [
            'rgb(0, 152, 101)',
            'rgb(91, 103, 112)',
            'rgb(210, 203, 68)',
            'rgb(114, 183, 188)',
            'rgb(0, 101, 50)',
            'rgb(50, 203, 152)',
            'rgb(14, 33, 52)',
            'rgb(152, 229, 203)',
            'rgb(231, 233, 224)'
        ],
        activeIndexes = [
            [0],
            [0],
            [0]
        ];

    function getTooltipMarkup(obj, activeIndex) {
        if(activeIndex == 2) {
            return '<p>' + obj.series.name + '</p><p>' + obj.x + ' Calendar Year</p><p>Total Returns: ' + obj.y.toFixed(2) + '%</p>';
        }
        else {
            return '<p>' + obj.series.name + '</p><p>' + obj.x + ' Return: ' + obj.y.toFixed(2) + '%</p>';
        }
    }

    //selector does not add space before .performance-chart be careful
    function initPerformanceChart(data, activeIndexes, selector, activeIndex) {
        var
            activeData = [],
            activeColors = [],
            target = $(selector + '.performance-chart');

        for(var i = 0, len = activeIndexes.length; i < len; i++) {
            var currentIndex = activeIndexes[i];

            activeData.push({
                name: data.series[currentIndex].name,
                data: data.series[currentIndex].data
            });

            activeColors.push(fundColors[activeIndexes[i]]);
        }

        target.first().highcharts({
            chart: {
                type: 'column',
                renderTo: target.get(0)
            },
            tooltip: {
                useHTML: true,
                formatter: function(){
                    console.log(this);
                    return getTooltipMarkup(this, activeIndex);
                }
            },
            colors: activeColors,
            title: { text: null },
            legend: { enabled: false },
            xAxis: {
                categories: data.xAxis.categories,
                minorTickLength: 0,
                tickLength: 0
            },
            yAxis: {
                tickInterval: 10,
                title: {
                    text: null
                },
                labels: {
                    format: '{value}%'
                }
            },
            plotOptions: {
              column: {
                maxPointWidth: 20,
                states: {
                    hover: {
                        brightness: .1
                    }
                }
              }
            },
            credits: {
                enabled: false
            },
            series: activeData
        });
    }

    function initPerformanceKey(data, selector, activeIndex) {
        for(var i = 0, len = data.series.length; i < len; i++) {
            var elem = $(document.createElement('span'))
                .html(function(){
                    if(typeof data.series[i].lipper !== 'undefined')
                        return data.series[i].name + '<sup>' + data.series[i].lipper + '</sup>';
                    else return data.series[i].name;
                })
                .appendTo(selector + '.chart-key:first')
                .click(function(){
                    var
                        clickedFund = $(this),
                        clickedIndex = clickedFund.index();

                    if(clickedIndex !== 0) {
                        if(clickedFund.hasClass('active')) {
                            var removeIndex = activeIndexes[activeIndex].indexOf(clickedIndex);
                            if(removeIndex > -1) activeIndexes[activeIndex].splice(removeIndex, 1);
                            clickedFund.removeClass('active');
                            initPerformanceChart(data, activeIndexes[activeIndex], selector, activeIndex);
                        }
                        else {
                            if($('#main-nav .navbar-toggle:visible').length) {
                                clickedFund.siblings('.active').each(function(){
                                    var
                                        activeFund = $(this),
                                        activeFundIndex = activeFund.index();

                                    if(activeFundIndex !== 0) {
                                        var removeIndex = activeIndexes[activeIndex].indexOf(activeFundIndex);
                                        if(removeIndex > -1) activeIndexes[activeIndex].splice(removeIndex, 1);
                                        activeFund.removeClass('active');
                                    }
                                });
                            }
                            clickedFund.addClass('active');
                            activeIndexes[activeIndex].push(clickedIndex);
                            initPerformanceChart(data, activeIndexes[activeIndex], selector, activeIndex);
                        }
                    }
                });

            if(i == 0) elem.addClass('active');
        }

        initPerformanceChart(data, activeIndexes[activeIndex], selector, activeIndex);
    }

    if(typeof trailingReturnsData !== 'undefined' && trailingReturnsData.series) initPerformanceKey(trailingReturnsData, '.trailing-returns ', 0);
    if(typeof trailingReturnsQuarterlyData !== 'undefined' && trailingReturnsQuarterlyData.series) initPerformanceKey(trailingReturnsQuarterlyData, '.trailing-returns-quarterly', 1);
    if(typeof calendarYearData !== 'undefined' && calendarYearData.series) initPerformanceKey(calendarYearData, '.calendar-year ', 2);

    $('#performance .table-toggle a:first-child').click(function(e){
        var clickedToggle = $(this);
        e.preventDefault();
        clickedToggle.addClass('active').next().removeClass('active');
        clickedToggle
            .parent()
            .next()
            .removeClass('table-active');
    });

    $('#performance .table-toggle a:last-child').click(function(e){
        var clickedToggle = $(this);
        e.preventDefault();
        clickedToggle.addClass('active').prev().removeClass('active');
        clickedToggle.parent().next().addClass('table-active');
    });

    $('.expand-calendar').click(function(){
        $('.expand-mobile').addClass('expand');
        $('.collapse-calendar').addClass('active');
        $(this).removeClass('active');
    });

    $('.collapse-calendar').click(function(){
        $('.expand-mobile').removeClass('expand');
        $('.expand-mobile.open, .expand-mobile + .details.open').removeClass('open');
        $('.expand-calendar').addClass('active');
        $(this).removeClass('active');
    });

    $('#performance .table-toggle a:first-child').first().click(function(e){
        if(typeof trailingReturnsData !== 'undefined' && trailingReturnsData.series) initPerformanceChart(trailingReturnsData, activeIndexes[0], '.trailing-returns ', 0);
        if(typeof trailingReturnsQuarterlyData !== 'undefined' && trailingReturnsQuarterlyData.series) initPerformanceChart(trailingReturnsQuarterlyData, activeIndexes[1], '.trailing-returns-quarterly', 1);
    });

    $('#performance .table-toggle a:first-child').last().click(function(e){
        if(typeof calendarYearData !== 'undefined' && calendarYearData.series) initPerformanceChart(calendarYearData, activeIndexes[2], '.calendar-year ', 2);
    });

    $('select.quarter-end').change(function(){
        if($(this).val() == 'quarter') {
            $('.trailing-returns').addClass('show-quarter');
            initPerformanceChart(trailingReturnsQuarterlyData, activeIndexes[1], '.trailing-returns-quarterly', 1);
        }
        else {
            $('.trailing-returns').removeClass('show-quarter');
            initPerformanceChart(trailingReturnsData, activeIndexes[0], '.trailing-returns ', 0);
        }
    });

    function ieSize() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE");
        var version = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));

        if ( msie && version == "9") {
            $('.resp-table').each(function(index) {
                    var replace = $(this).html().replace(/td>\s+<td/g,'td><td'); 
                    $(this).html(replace);
            });
        }
    };

    ieSize();
};

var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.contentTemplate = function(){

  function mobilePrintHide() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Silk|Opera Mini/i.test(navigator.userAgent);
    if (isMobile && $('.documentDistribution').length) {
      $('.documentDistribution li.print').hide();
    }
  }

  function paginationHide() {
    if ($('.relatedPages').length && $('.relatedPages .pagination').children().length === 0) {
      $('.relatedPages .pagination').hide();
    }
  }

  function faqToggleMobile() {
    $('.faq-page .relatedPages').addClass('hidden-sm');
    $('.faq-page .linebreak').addClass('visible-sm');
    $('.faq-page .text .block-list').addClass('visible-sm');
    $('.faq-page .text .block-list ul').addClass('collapse');
    $('.faq-page .text .block-list h4').on('click', function(){
      $(this).attr('aria-expanded', $('.faq-page .text .block-list ul').collapse('toggle').attr('aria-expanded'));
    });
  }
  
  function relatedLinksSetup() {
    $('.relatedLinks .rel-desktop').addClass('hidden-sm');
    $('.relatedLinks .rel-mobile').addClass('visible-sm');
    
    $('.relatedLinks .rel-collapsible h4').on('click', function(){
      $(this).attr('aria-expanded', $('.relatedLinks .rel-collapsible ul').collapse('toggle').attr('aria-expanded'));
    });
  }

  function textLinkPhone(){
    $('.textLink p a').each(function(){ 
      if($(this)[0].href.substring(0,4) ==='tel:'){ 
        $(this).addClass('phone');
      }else{
        $(this).removeClass('phone');
      }
    });
    if (window.innerWidth > 980){
      $('.phone').bind('click', false);
    }
  }
  function mobileArticleHero() {
    if($('.content-template div.relatedPages li.primaryArticle .mobile-full').css('margin-left') === '-20px'){
      var cw = $('#main-content').css('width');
      $('.content-template div.relatedPages li.primaryArticle .mobile-full').css('width', cw);
    } else {
      $('.content-template div.relatedPages li.primaryArticle .mobile-full').css('width', '100%');
    }
  }
  // Add a class for Document Center pages
  function documentCenter() {
    if ($('.documentCenterTable').length) {
      $('.content-template').addClass('document-center-page');
    }
  }

  // Add a class for Forms pages
  function accordionForms() {
    if ($('.content-full-width-page').length && $('.accordion').length) {
      $('.content-template').addClass('accordion-forms-page');
    }
  }

  // Add a class for fund managers page pages
  function accordionFundManagers() {
    var hash = window.location.hash.slice(1),
      hashArr = hash.split('#'),
      anchorName = hashArr[1],
      group = hashArr[0].replace('_','');

    if ($('.container-fluid.right-rail').length && $('.accordion').length && hash !='') {
      $('.panel-collapse').eq(0).addClass('in');
      
      for(var i = 0; i < $('.anchor-reset').length; i++){
        if($('.anchor-reset').eq(i).attr('name') == anchorName){
          var offset = $('.anchor-reset').eq(i).offset();
          $(window).scrollTop(offset.top);
          return false;
        }
      }
    }
  }

  $(window).resize(function(){
    mobileArticleHero();
  });
  function init() {
    mobileArticleHero();
    mobilePrintHide();
    paginationHide();
    faqToggleMobile();
    relatedLinksSetup();
    textLinkPhone();
    documentCenter();
    accordionForms();
    accordionFundManagers();
  }
  init();
}

$(document).ready(function() {
  if ($('.content-template').length) {
    thv.mcs.contentTemplate();
    thv.mcs.youtubePlayer();
  }
});
var thv = thv || {};
thv.common = thv.common || {};
thv.common.respImg = function(){
    var resizeTimeout = null;

    function replaceImgSrcs() {
        var
            respImgs = $('img[data-mobile-rendition]'),
            checkVal = respImgs.first().css('min-width'),
            mq = 0;

        if(checkVal === '1px') mq = 1;
        else if(checkVal === '2px') mq = 2;

        $('img[data-mobile-rendition]').each(function(){
            var
                curr = $(this),
                currSrc = curr.attr('src'),
                currData = curr.data();

            if(mq === 0 && currData.desktopRendition && currSrc !== currData.desktopRendition) {
                curr.attr('src', currData.desktopRendition);
            }
            else if(mq === 1 && currData.tabletRendition && currSrc !== currData.tabletRendition) {
                curr.attr('src', currData.tabletRendition);
            }
            else if(mq === 2 && currData.mobileRendition && currSrc !== currData.mobileRendition) {
                curr.attr('src', currData.mobileRendition);
            }
        });
    }

    replaceImgSrcs();
    $(window).resize(function(){
        if(resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(replaceImgSrcs, 500);
    });
};

$(function(){
    thv.common.respImg();
});

var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.youtubePlayer = function(){

  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Silk|Opera Mini/i.test(navigator.userAgent);

  function youtubeInit() {
    $('iframe#youtube-mobile-player').hide();

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  function youtubeMobile() {
    $('.video-poster').hide();
    $('div#player').hide();
  }

  function init() {
    if ($('#youtube-video').length) {
      if (isMobile) {
        youtubeMobile();
      } else {
        youtubeInit();
      }
    }
  }
  init();
}

YouTubePlayer = {
  player: '',
  poster: $('.video-poster'),
  // attach the player to the #player div
  attachPlayer: function(vid) {
    YouTubePlayer.player = new YT.Player('player', {
      videoId: vid,
      playerVars: { 
        showinfo: 0,
        rel: 0
      },
      events: {
        'onReady': YouTubePlayer.listener,
        'onStateChange': YouTubePlayer.change
      }
    });
  },
  // If you click on the poster image, trigger the play event
  listener: function() {
    YouTubePlayer.poster.on({
      click: function(e) {
        e.preventDefault();
        YouTubePlayer.play();
      }
    });
  },
  // Event handlers for actions related to the video player
  change: function(youtubeEvent) {
    var state = youtubeEvent.data;
    switch(state) {
      case -1: 
        // (unstarted)
        break;
      case 0:
        // (ended)
        break;
      case 1:
        // (playing)
        break;
      case 2:
        // (paused)
        break;
      case 3:
        // (buffering)
        break;
      case 5:
        // (video cued)
        break;
      default: 
        // do nothing
    }
  },
  // Hide the poster image and play the video
  play: function() {
    YouTubePlayer.poster.hide();
    YouTubePlayer.player.playVideo();
  }
}

function onYouTubeIframeAPIReady() {
  var vid = $('#youtube-video').attr('data-youtube');
  YouTubePlayer.attachPlayer(vid);
}
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.primaryLanding = function(){


  function accordionSM(item) {
    var winWidth = $(window).width();
    if (winWidth < 768) {
      item.wrapAll("<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'> ");
    } //else item.parent().unwrap();
    
  }

  function init() {
    $('.titleTextLinkIconCta').each(function(){
      var accountName = $(this).find('.row').data('thvAccount').replace(/[^a-zA-Z ]/g, "").toLowerCase();
      
      accountName = accountName.split(' ')[0];
      $(this).addClass(accountName);
      
      $(this).find('.panel-title a').attr('href', '#collapse-'+accountName);
      $(this).find('.panel-collapse').attr('id', 'collapse-'+accountName);
      $(this).find('.panel-collapse').attr('aria-labelledby', 'heading-'+accountName);

      $(this).find('.panel-heading').on('click', function(){ 
        console.log($(this).find('a').attr('aria-expanded'));
        if($(this).find('a').attr('aria-expanded') === 'false') {
          $(this).closest('.panel').parent().css('background-color', '#f6f6f6');
        }
        else $(this).closest('.panel').parent().css('background-color', '#ffffff');
      });

    }); 
    accordionSM($('.titleTextLinkIconCta'));
  }
  init();
  
}

$(document).ready(function(){
  if($('.primary-landing-page').length) {
      thv.mcs.primaryLanding();
  }
});
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.secondaryLanding = function() {

    var scope = $(" .secondary-landing-body ");

    if (scope.length) {

        function runSL() {
            console.log(" runSL ");

            /* owl slider */
            var cardSlider = $("#cardSlider");

            /* init owl slider */
            function initMobileslider() {
                $("#cardSlider").owlCarousel({
                    navigation: false, // Show next and prev buttons
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    singleItem: true
                });
            }

            /* conditonal owl for slider check */
            if (cardSlider.length) {
                console.log('slider');

                initMobileslider();
            }


            /* dynamic styling */
            function runStyles() {

                var firstels = $(".iconTitleDescription:first");

                $(".text > .right-rail > a.block").before("<br>");

                $(".panel").last().css('webkit-box-shadow', 'none');
            }

            runStyles();

        } /* end of run secondary landing function wrapper  */

        /* set even card heights based on tallest card*/
        function setCardHeight() {
            var cardheights= [];

            $('.accountCards .card').each(function() {
                $(this).css('height', 'auto');
                if($(this).height() > 0) {
                    cardheights.push($(this).height());
                }
            })
            var maxheight = Math.max.apply(null, cardheights);

            $('.accountCards .card').height(maxheight);

            // console.log(cardheights);

            // var currentTallest = 0,
            //      currentRowStart = 0,
            //      rowDivs = new Array(),
            //      $el,
            //      topPosition = 0;

            //  $('.accountCards .card').each(function() {

            //    $el = $(this);
            //    topPosition = $el.position().top;
               
            //    if (currentRowStart != topPosition) {

            //      // we just came to a new row.  Set all the heights on the completed row
            //      for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            //        rowDivs[currentDiv].height(currentTallest);
            //      }

            //    } else {

            //      // another div on the current row.  Add it to the list and check if it's taller
            //      rowDivs.push($el);
            //      currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);

            //   }
               
            //   // do the last row
            //    for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            //      rowDivs[currentDiv].height(currentTallest);
            //    }
            //    console.log(currentTallest);
               
            //  })
        } /* end of function to set even card heights */

        /* init function */
        function initSL() {
            console.log(" initSL ");
            runSL();
            setCardHeight();

            $(window).resize(function(){

                if( window.innerWidth < 767 ){

                    setTimeout(function () { setCardHeight(); }, 500);
                    // console.log('slider active');
                }
                else setCardHeight();
            });

        }

        initSL();

    } else {

        /* not a secondary landing page */
    }

} /* end of object  */

$(document).ready(function() {

    thv.mcs.secondaryLanding();
});

var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.fundSprite = function(){

    function fundColorApply(elm) {
        var fundColors = ['#32cc99', '#427483', '#d3cb43'];

        $(elm).each(function() {
            $(this).find($('.fund-color')).each(function(i) {
              if (i >= fundColors.length) {
                i = $(this).index() - fundColors.length;
              }
              $(this).css('border-color',fundColors[i]);
              $(this).css('background-color',fundColors[i]);
            });
        })
    }

    function getSpriteCard(card, row, col) {
        var left, top;

        left = (col * 187) + 45;
        top = (row * 187) + 50;

        // $("img." + card ).attr("src", "/etc/designs/thrivent/mcs/clientlib-site/img/fund-highlight-card-sprite.svg?id=" + id + "#svgView(viewBox(" + left + ',' + top + ", 105, 105))");
        // $("iframe." + card ).attr("src", "/etc/designs/thrivent/mcs/clientlib-site/img/fund-highlight-card-sprite.svg?id=" + id + "#svgView(viewBox(" + left + ',' + top + ", 105, 105))");

        $('.fund-card.' + card).each(function(){
            if(!$(this).hasClass('hidden') && !$(this).hasClass('android-bg')){
                $(this).attr("src", "/etc/designs/thrivent/mcs/clientlib-site/img/fund-highlight-card-sprite.svg#svgView(viewBox(" + left + ',' + top + ", 105, 105))");
            }
        });
    };

    function displayfundCard(fundKey) {    
        var fundKeyCards = thv.common.fundSummaryCards.fundCards;

        if(fundKeyCards[fundKey]){
            getSpriteCard(fundKey, fundKeyCards[fundKey].row, fundKeyCards[fundKey].column);
        }else {
            console.log("no Target Allocation sprite card for this fund")
        };
    };

    function displayRiskCard(riskCategory) {
        var fundRiskCards = thv.common.fundSummaryCards.riskCards;
        if(fundRiskCards[riskCategory]) {
            getSpriteCard(riskCategory, fundRiskCards[riskCategory].row, fundRiskCards[riskCategory].column);
        } else{
            console.log("no Risk Category sprite card for this fund")
        };
    }


    //fund comparison page only
    function fundEquityCard(fundEquity) {
        var fundEquityCards = thv.common.fundSummaryCards.fundEquity;
        var equityClass = 'equity' + fundEquity;

        if(fundEquityCards[fundEquity]){
            getSpriteCard(equityClass, fundEquityCards[fundEquity].row, fundEquityCards[fundEquity].column);
        }else {
            console.log('no fund equity card');
        }
    }

    //fund comparison page only
    function setEquityClass(elm) {
        var fundEquity = $(elm).data("thvFundEquityPercentage");
        // console.log(fundEquity);
        $(elm).addClass('equity' + fundEquity);
        fundEquityCard(fundEquity);
    }


    function setDataClass(elm) {
        $(elm).find('.fund-card').each(function(){
           var riskCategory, fundKey;

            if($(this).hasClass('risk-graphic')){
                riskCategory = $(this).data("thvRiskCategory").toLowerCase().replace(/\s/g, "-");
                $(this).addClass(riskCategory);
                displayRiskCard(riskCategory);
            };

            if($(this).hasClass('attribute-graphic')){
                fundKey = $(this).data("thvFundKey");
                $(this).addClass(fundKey);

                hideMoneyMarketFund($(this));

                if($('.fund-details-card.compare').length){
                    console.log('equity');
                    setEquityClass($(this));
                }else {
                    displayfundCard(fundKey);
                }
            };
        });
    };

    function hideMoneyMarketFund(elm) {
        if(elm.hasClass('MM_MF')) {
            if(elm.parent().hasClass('card-wrapper')){
                elm.parent().find('.fund-desc').hide();
            }
            else elm.parent().next().hide(); 
        }
    }

    function init() {
        var svgPreload = $("<img src='/etc/designs/thrivent/mcs/clientlib-site/img/fund-highlight-card-sprite.svg'/>");
            svgPreload.css('display','none');
            svgPreload.appendTo($('body'));
            
        var ua = navigator.userAgent;
        var android = ua.indexOf("Android") >= 0;
        var iphone = ua.indexOf("iPhone") >= 0;
        var safari = (ua.indexOf('Safari') != -1 && ua.indexOf('Chrome') == -1);

        if (android || iphone){
            $(".android-bg").removeClass('hidden');
            $("img.fund-card").addClass('hidden');
            // console.log("android/iOS/Safari9");
        }else if (safari) {
            // $("iframe.safari-bg").removeClass('hidden');
            // $("img.fund-card").addClass('hidden');
            $(".android-bg").removeClass('hidden');
            $("img.fund-card").addClass('hidden');
        };

        $('.fund-highlights-graphics').each(function() {
            fundColorApply($(this));
            setDataClass($(this));
        });

        // print svg for Safari only
        var beforePrint = function() { 
            if(safari) {
                $("iframe.fund-card.safari-bg").removeClass('hidden');
                $(".android-bg").addClass('hidden');
                $('.fund-highlights-graphics').each(function() {
                    setDataClass($(this));
                });

            }
        };
        var afterPrint = function() {
            if(safari){
                $("iframe.fund-card.safari-bg").addClass('hidden');
                $(".android-bg").removeClass('hidden');
            }
        };
        if (window.matchMedia) {
            var mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(function(mql) {
                if (mql.matches) {
                    beforePrint();
                } else {
                    afterPrint();
                }
            });
        }
        window.onbeforeprint = beforePrint;
        window.onafterprint = afterPrint;

    }

    init();
}

$(document).ready(function(){
  if($('.fund-highlights-graphics').length) {
      thv.mcs.fundSprite();
  }
});
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.fundLanding = function(){

  function showFundCards() {
    $('.fund-listing').find('a.view-fund-cards').each(function(){
      $(this).on('click', function(){ 
        if(!$(this).next('.fund-list-cards').hasClass('in')) { 
          $(this).closest('.fund-listing').css('background-color', '#f6f6f6');
          var str = $(this).text().replace('view', 'close');
          $(this).text(str);
          setTimeout(function(){
            $(window).trigger('scroll');
          }, 500);
        } else {
          $(this).closest('.fund-listing').css('background-color', '#ffffff');
          var str = $(this).text().replace('close', 'view');
          $(this).text(str);
        }
      });
    });
  }

  function accordionSM(item) {
    var winWidth = $(window).width();
    if (winWidth < 768) {
      item.wrapAll("<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'> ");
    } 
  }

  function init() {
    $('.fund-listing').each(function(){
      var fundCat = $(this).data('thvFundCategory').toLowerCase();
      fundCat = fundCat.replace(/\s/g, "-");
      $(this).addClass(fundCat);
      $(this).find('a.view-fund-cards').attr('href', '#fund-list-'+fundCat);
      $(this).find('.fund-list-cards').attr('id', 'fund-list-'+fundCat);
      var bgURL = 'url(\'/etc/designs/thrivent/mcs/clientlib-site/img/'+fundCat+'-icon.png\')';
      //console.log('bgURL', bgURL);
      $(this).find('.fund-list-content').css('background-image', bgURL);

      //accordion init
      $(this).find('.panel-heading').attr('id', 'heading-'+fundCat).css('background-image', bgURL);
      $(this).find('.panel-title a').attr('href', '#collapse-'+fundCat).attr('aria-controls','collapse-'+fundCat);
      $(this).find('.panel-collapse').attr('id', 'collapse-'+fundCat);
      $(this).find('.panel-collapse').attr('aria-labelledby', 'heading-'+fundCat);

    }); 

    $('.fund-details-card').each(function(){
        //set SVG height for cards with iframe
        $('iframe.fund-card').contents().find("svg").attr('height', '75px');
    });
    accordionSM($('.fundListing'));
    showFundCards();
  }
  init();
  
}

$(document).ready(function(){
  if($('.fundListing').length) {
      thv.mcs.fundLanding();
  }
});
    
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.relatedFunds = function(){

    function relatedFundsCarousel(item) { 
      var owl = item;
      var windowWidth = $(window).width();
        
        if (windowWidth < 768){
            owl.addClass('owl-carousel');
            
            owl.owlCarousel({
                itemsTablet: [767,3]
            });
        } else {
            if($('.owl-carousel').length){
                var carouslData = $(".owl-carousel").data('owlCarousel');
                carouslData.destroy();
                owl.removeClass('owl-carousel');
            }
            
        }
      
    }

    function cardHoverState(card) {
        var curr = card;
        var hoverArea = curr.find('.redirect-fund-details');
        hoverArea.hover(function(){
            hoverArea.parents('.fund-details-card').addClass('hover');
            
        },function(){
            hoverArea.parents('.fund-details-card').removeClass('hover');
        });
    }

    function init() {
        var start = $('.fund-details-card').length;
        if($('.fund-comparison-body').length == 0){
            $('.fund-details-list').each(function(index){
                relatedFundsCarousel($(this));
                if($(this).find($('.tool-tip')).length > 0){
                    $(this).parent().css('z-index',start--);
                }
            });

            $('.fund-details-card').each(function(index){
                cardHoverState($(this));
                    $(this).parent().css('z-index',start--);
            });
        }
        
        $(window).resize(function(){
            $('.fund-details-list').each(function(){
                relatedFundsCarousel($(this));
            });
        });
        
        // preload svg
        // var svgPreload = $("<img src='/etc/designs/thrivent/mcs/clientlib-site/img/fund-highlight-card-sprite.svg'/>");
        // svgPreload.css('display','none');
        // svgPreload.appendTo($('body'));

        $('.fund-highlights-graphics').each(function(){

            //set SVG height for cards with iframe
            $('iframe.fund-card').contents().find("svg").attr('height', '75px');
            
            // setDataClass($(this));
            
            // var ua = navigator.userAgent;
            // if( (ua.indexOf("Android") >= 0) || (ua.indexOf("iPhone") >= 0) ){
            //     // $('div.fund-card').removeClass('hidden');
            //     // $('label.android-bg').removeClass('hidden');
            //     $('.android-bg').removeClass('hidden');
            //     $('img.fund-card').addClass('hidden');
            // } else {
                
            //     var fundKey = $(this).find('.attribute-graphic').data('thvFundKey');
            //     var fundEquity = $(this).find('.attribute-graphic').data('thvFundEquityPercentage');
            //     var riskCategory = $(this).find('.risk-graphic').data('thvRiskCategory').toLowerCase().replace(/\s/g, "-");
                
            //     if($('.fund-comparison-page').length){
            //         console.log('equity');
            //         fundComparisonCard(fundKey, fundEquity, riskCategory);
            //     }else {
            //         displaySpriteCard(fundKey, riskCategory);
            //     }
            // }
  
            // fundColorApply($(this));
        
        });
        
        $('.redirect-fund-details').each(function(){
           var url = $(this).data('redirect');
            $(this).on('click',function(){
               window.location.href = url; 
            });

        });

    }
    init();
    
}
    


$(document).ready(function() {
  if ($('.fund-details-list').length) {
    thv.mcs.relatedFunds();

  }
});
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.highlights = function(){

    //===========HIGHLIGHTS MODULE===========

    function highlightsData() {
    	$.ajax({
    	  method: "GET",
    	  dataType: "json",
    	  url: thv.mcs.navdata
    	})
    	.done(function(data) {
            // console.log(data);
    	    var idx;
    	    var thvFund = $(".highlights-content").data("thvFund");
    	    var thvShare = $(".highlights-content").data("thvShare");

    	    for ( var i=0; i<data.length; i++ ){
    	        if( (data[i]["shareType"] === thvShare) && ( data[i]["fundName"].lastIndexOf(thvFund, 0) === 0 ) ){
    	            idx = i;
    	        }
    	    };

            if(data && data[idx]){
                // console.log("[highlighs.js]" + typeof data[idx]["pop"]);
        	    $('#price-data').text('$' + data[idx]["pop"].toFixed(2));
        	    $('#nav-data').text('$' + data[idx]["nav"].toFixed(2));
                if(data[idx]["navChange"] > 0){
                    $('#day-change-data').text('$' + parseFloat(data[idx]["navChange"]).toFixed(2));
                } else {
                    $('#day-change-data').text('-$' + parseFloat(Math.abs(data[idx]["navChange"])).toFixed(2));
                }
        	    
                $('p.date:first-of-type').text("( as of " + data[idx]["marketDate"] + ")");
            };
    	})
    };

    function handleScrollGrowthOf10k() {
        var
          scrollThreshold = $(window).height() * .8,
          scrollTop = $(window).scrollTop();

        if($('#containerGrowth10K').offset().top < scrollTop + scrollThreshold) {
            growthOf10k();
            $(window).off('scroll', handleScrollGrowthOf10k);
        }
    }

    //[GROWTH OF $10K HIGHCHARTS GRAPH]
    function growthOf10k() {
        Highcharts.setOptions({
            colors: ['#34cb98']
        });

        $('#containerGrowth10K').highcharts('StockChart', {
            rangeSelector : {
                enabled: false
                // selected : 1
            },
            navigator: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            title : {
                text : null
            },
            xAxis: {
              lineColor: 'transparent',
              minorTickLength: 0,
              tickLength: 0
            },
            yAxis: {
                tickInterval: 10000,
                tickAmount: 4,
                opposite: false,
                labels: {
                    formatter: function () {
                        return "$" + Highcharts.numberFormat(this.value/1000, 0,'','') + "k";
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#f2f2f2'
                },
                {
                    color: '#ffffff',
                    width: 0,
                    value: 2,
                    id: 'plotline-1'
                }],
            },
            series: [{
                name : "${'thv.mcs.products.funds.highlights.value'@i18n, context='html'}",
                data : growthData,
                 }],
            plotOptions: {
                line: {
                    marker: {
                        fillColor: '#ffffff',
                        symbol:'circle',
                        radius: 4,
                        lineColor:'#d3cb43',
                        lineWidth: 2,
                    }
                },
                series: {
                        states: {
                            hover: {
                                halo: {
                                    size: 0
                                }
                            }
                        }
                    }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderColor: '#ccd3da',
                borderWidth: 1,
                crosshairs: [{
                    width: 1,
                    color: '#d0d0cc'
                }],
                shape: 'callout',
                shared: false,
                useHTML: true,
                formatter : function(){
                    var serie = this.series;

                    var tooltipText = "<div class='row'><span class='graph-tooltip-label'>Date:</span><span class='graph-tooltip-value'>" + Highcharts.dateFormat('%m/%e/%Y', this.x) + "</span></div>"; 

                        tooltipText += "<div class='row'><span class='graph-tooltip-label'>Value:</span><span class='graph-tooltip-value'>$" + Highcharts.numberFormat(this.y, 2, '.', ',') + "</span></div>";

                        // MDR-1874 : Remove the return for now.
                        //tooltipText += "<div class='row'><span class='graph-tooltip-label'>Return:</span><span class='graph-tooltip-value'>" + this.point.percent + '%</span></div>';

                    return tooltipText;
                }
            }
        });
    };


  function init() {
    // preload svg
    // var svgPreload = $("<img src='/etc/designs/thrivent/mcs/clientlib-site/img/fund-highlight-card-sprite.svg'/>");
    // svgPreload.css('display','none');
    // svgPreload.appendTo($('body'));
    
    highlightsData();           //display data for Public Offering Price, Net Asset Value, and Daily NAV Change
    $(window).on('scroll', handleScrollGrowthOf10k);
  }

  init();
}

$(document).ready(function() {

  if($('.highlights').length) {
      thv.mcs.highlights();
      thv.mcs.fundHoldings();
  }
});
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.fundComparison = function(){
  var newURL;
  var selectedFunds = [];
  var btnURL = $('.comparison-cta a').attr('data-link');

  var start = $('div.fund-cards-container').children('div').last().children('.fund-details-list').children('li').length;

  $('div.fund-cards-container').children('div').last().attr('style','z-index:1');

  $('div.fund-cards-container').children('div').last().children('.fund-details-list').children('li').each(function(index){
      if($(this).find($('.tool-tip')).length > 0){
          $(this).css('z-index',start - index);
      }
  });

  function selectFundCards() {
    $('.fund-details-card').each(function(){
      $(this).on('click', function(){
        console.log('click');
        var ticker = $(this).data("thvFundKey");
        if($(this).hasClass('selected')){
          $(this).removeClass('selected');

          updateSelection();
          if(!selectedFunds.length){
            $('.comparison-cta a').attr('data-link', btnURL);
            if(history.replaceState){
              history.replaceState('','','?');
            }else{
              window.location.hash = ' ';
            }
          }
        }else if(!$(this).hasClass('selected') && selectedFunds.length < 4 ){
          $(this).addClass('selected');
          updateSelection();
        };
      });
    });
  }

  var updateSelection = function() {
    selectedFunds = [];
    var selectString = 'selectfund=';

    $('.fund-details-list').find('.selected').each(function(){
      var fund = $(this).data("thvFundKey");
      console.log(fund);
      selectedFunds.push(fund);
      selectString = selectString + fund +',';
      updateLinks(selectString);
    });
    compareButton();
    console.log(selectedFunds.length);
  }

  function parseURL(){
    console.log('parse');
    var searchString;
    if(window.location.hash){
      searchString = window.location.hash.substring(12);
    } else {
      searchString = window.location.search.substring(12);
    }

    if(searchString.length){
      var fundSymbols = searchString.split(',');
      selectedFunds = fundSymbols;
    };

    $('.fund-details-card').each(function(){ 
      for(var i in selectedFunds) {
        if($(this).data("thvFundKey") == selectedFunds[i]){
          $(this).addClass('selected');
        };
      }
    });
    compareButton();
  }


  function updateLinks(selectString){
    // newURL = btnURL + viewString.slice(',', -1);
    selectString = selectString.slice(',', -1);
    var viewString = selectString.replace("select", "?view");
    newURL = btnURL + viewString;
    if(history.replaceState){
      history.replaceState('','', '?' + selectString);
      $('.comparison-cta a').attr('data-link', newURL);
    }else{
      window.location.hash = '#' + selectString;
    }
    $('.comparison-cta a').attr('data-link', newURL);
  }

  //   function updateLinks(selectString, viewString){
  //   selectString = selectString.slice(',', -1);
  //   viewString = viewString.slice(',', -1);
  //   console.log("length:" + length);
  //   if(history.replaceState){
  //     history.replaceState('','', + '?' + selectString);
  //     newURL = btnURL + '?' + viewString;
  //   }else{
  //     window.location.hash = '?#' + selectString;
  //     newURL = btnURL + '?#' + viewString;
  //   }
  //   $('.comparison-cta a').attr('href', newURL);
  // }

  function ctaScroll() {
    $('.comparison-cta').affix({
      offset: {
        top: 70
      }
    });
  };

  function scrollNav() {
    $(window).scroll(function(){
      // add/remove stikcy header
        if($(this).scrollTop() > 70) {
          console.log('test');
          var offset = $('#main-nav').height();
          $('.comparison-cta').addClass('sticky affix');
          $('.comparison-cta .compare-funds').removeClass('default');
          if (window.innerWidth > 767) {
            $('.comparison-cta').css('top', offset - 5); console.log('desktop');
          } else {
            $('.comparison-cta').css('top', 0); console.log('mobile');
          };
        } else {
          $('.comparison-cta').removeClass('affix');
          $('.comparison-cta, .compare-funds').removeClass('sticky');
          console.log('nosticky');        
        }
        compareButton();
    });
  }

  // function stickyNav() {
  //   if($(this).scrollTop() > 70) {
  //     console.log('test');
  //     var offset = $('#main-nav').height();
  //     $('.comparison-cta').addClass('sticky affix');
  //     $('.comparison-cta .compare-funds').removeClass('default');
  //     if (window.innerWidth > 767) {
  //       $('.comparison-cta').css('top', offset - 5); console.log('desktop');
  //     } else {
  //       $('.comparison-cta').css('top', 0); console.log('mobile');
  //     };
  //   } else {
  //     $('.comparison-cta').removeClass('affix');
  //     $('.comparison-cta, .compare-funds').removeClass('sticky');
  //     console.log('nosticky');        
  //   }
  // }

  function resizeNav() {
    $(window).resize(function(){
      if($(this).scrollTop() > 70) {
        console.log('test');
        var offset = $('#main-nav').height();
        $('.comparison-cta').addClass('sticky affix');
        $('.comparison-cta .compare-funds').removeClass('default');
        if (window.innerWidth > 767) {
          $('.comparison-cta').css('top', offset - 5); console.log('desktop');
        } else {
          $('.comparison-cta').css('top', 0); console.log('mobile');
        };
      } else {
        $('.comparison-cta').removeClass('affix');
        $('.comparison-cta, .compare-funds').removeClass('sticky');
        console.log('nosticky');        
      }
      compareButton();
    });
  }




  function compareButton() {
    var scrollStyle;
    if($('.comparison-cta').hasClass('sticky')){
      scrollStyle = 'sticky';
    }else{
      scrollStyle = 'default'
    };

    $('.comparison-cta .compare-funds')
      .addClass('selected')
      .removeClass(scrollStyle)
      .removeAttr('disabled');
    $('.comparison-cta .compare-funds.selected').click(function(e){
      var fundLinks = $('.comparison-cta a').attr('data-link');
      $(this).attr('href', fundLinks);
    });
    if(!selectedFunds.length || selectedFunds.length ===1) {
      $('.comparison-cta').removeClass('selection-error');
      $('.comparison-cta .compare-funds')
        .removeClass('selected')
        .addClass(scrollStyle)
        .attr('disabled', 'disabled');

    }else if(selectedFunds.length >= 4){
      $('.comparison-cta').addClass('selection-error');
    }else if(selectedFunds.length > 1) {
      $('.comparison-cta').removeClass('selection-error');
    }
  }


  function init() {
    
    $('.fund-list-category').each(function(){
      var fundCat = $(this).data('thvFundCategory').toLowerCase();
      fundCat = fundCat.replace(/\s/g, "-");
      $(this).addClass(fundCat);
      var bgURL = 'url(\'/etc/designs/thrivent/mcs/clientlib-site/img/'+fundCat+'-icon.png\')';
      $(this).css('background-image', bgURL);
    });

    if( $(document).scrollTop() > 0 ){
      var offset = $('#main-nav').height();
      $('.comparison-cta').addClass('sticky affix');
      $('.comparison-cta .compare-funds').removeClass('default');
      if (window.innerWidth > 767) {
        $('.comparison-cta').css('top', offset - 5);
      };
      compareButton();
    }

    // function getSpriteCard(card, id, row, col) {
    //     var left, top;

    //     left = (col * 187) + 45;
    //     top = (row * 187) + 50;

    //     $("img." + card ).attr("src", "/etc/designs/thrivent/mcs/clientlib-site/img/fund-highlight-card-sprite.svg?id=" + id + "#svgView(viewBox(" + left + ',' + top + ", 105, 105))");
    //     $("iframe." + card ).attr("src", "/etc/designs/thrivent/mcs/clientlib-site/img/fund-highlight-card-sprite.svg?id=" + id + "#svgView(viewBox(" + left + ',' + top + ", 105, 105))");
    // };

    // function fundComparisonCard(id, fundEquity) {
    //     var fundSummaryCards = thv.common.fundSummaryCards;

    //     if(fundSummaryCards.fundCards_fundComparison[fundEquity]){
    //         getSpriteCard(fundEquity, fundEquity, fundSummaryCards.fundCards_fundComparison[fundEquity].row, fundSummaryCards.fundCards_fundComparison[fundEquity].column);
    //     };
    // }

    // //for android sprites
    // function setAndroidDataClass() {
    //   $('.fund-details-card').find('.android-bg.attribute-graphic').each(function(){
    //     var fundEquity = $(this).data("thvFundEquityPercentage");
    //     var equityClass = 'equity' + fundEquity;
    //     $(this).addClass(equityClass);
    //     fundComparisonCard(equityClass, fundEquity);
    //   });
    // }

    // // setAndroidDataClass();

    if(window.location.search.substring(1,10) != 'viewfund='){
      parseURL();
      compareButton();
      updateSelection();
      selectFundCards();
      ctaScroll();
      scrollNav();
      resizeNav();
    }
  }
  init();
  
}

$(document).ready(function(){
  if($('.fundComparison').length) {

    // if(!history.replaceState && window.location.search){
    //   console.log('search');
    //   var funds = window.location.search.substring(8);
    //   window.location.href = window.location.href.replace('?', '#');
    // }
    
    thv.mcs.fundComparison();
  }
});
  
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.viewFunds = function(){

  var addToCompareString = null;
  var currentFundID = 0;

  function viewFundsCarousel(item) { 
    var windowWidth = window.innerWidth;
    var owl = item; 
      
      if (windowWidth < 768){
          owl.addClass('owl-carousel');          
          owl.owlCarousel({
              itemsTablet: [767,1],
              afterAction : afterAction
          });

      } else { 
          if($('.owl-carousel').length){ 
              var carouslData = $(".owl-carousel").data('owlCarousel');
              carouslData.destroy();
              owl.removeClass('owl-carousel');
          }
      }    
     
      function afterAction(){
        //console.log(this.owl.currentItem);
        currentFundID = this.owl.currentItem;
        if($('.sticky-bg').hasClass('affix')) {getCurrentCardInfo(currentFundID);}
      }
  }

  function hideShowBtn() {
    var numberOfCards = $('.compared-cards').find('.fund-details-card').length; 
    // if (numberOfCards) {$('.switchToSelect').removeClass('hide');}
    // else {$('.switchToSelect').addClass('hide');}
    if (numberOfCards == 3) { //when there are four cards selected, do not show AddToCompare button slide
      var windowWidth = window.innerWidth;
      var addToCompare = $('.compared-cards').children('.add-to-compare');
      if (windowWidth < 768) {
        addToCompareString = $("<div />").append(addToCompare.clone()).html();
        // console.log(addToCompareString);
        addToCompare.remove();
      } else {$('.add-to-compare').hide();}
    } 
  }

  String.prototype.splice = function(
      index,
      howManyToDelete
      ){
      var characterArray = this.split( "" );
      Array.prototype.splice.apply(
          characterArray,
          arguments
      );
      return(
          characterArray.join( "" )
      );
  };

  function deleteFund() {
    var cardLefted = $('.compared-cards .fund-details-card').length;

    $('.compared-cards .fund-details-card').find('.btn-delete').each(function(){

      $(this).on('click', function(){ 
        var curr = $(this).parents('.fund-details-card');
        var fund = curr.data("thvFundKey");
        if ($('.owl-carousel').length) { 
          curr = curr.parent('.owl-item');
        }

        //update URL      
        if(history.replaceState){
          var string = window.location.search;
          string = string.splice(string.indexOf(fund), fund.length+1);
          history.replaceState('','', string);
        }else{
          var string = window.location.hash;  
          string = string.splice(string.indexOf(fund), fund.length+1); 
          window.location.hash = string;
        }
        cardLefted--;
        
        //updated carousel slides and update pagination
        if ($('.owl-carousel').length) {
          //delete current fund
          $(".owl-carousel").data('owlCarousel').removeItem(currentFundID);
          getCurrentCardInfo(currentFundID);
          if (cardLefted == 2) { // addToCompare btn reset
            $(".owl-carousel").data('owlCarousel').addItem(addToCompareString);
          }
        } else {
          curr.remove();
          if (!$('.compared-cards').children('.add-to-compare').length) {$('.compared-cards').append(addToCompareString);}
          $('.add-to-compare').show();
        }

        var windowWidth = window.innerWidth;
        if (windowWidth < 768)
        comparedCardsHeight();

      });
    });

  }

  function deleteFundSticky() {
    //delete from sticky nav in mobile 

    var cardLefted = $('.compared-cards .fund-details-card').length;

    $('.sticky-delete-btn').on('click', function(e){

        var fund = $('.compared-cards .owl-item:eq('+currentFundID+')').find('.fund-details-card').data('thvFundKey');
        // var string = window.location.search;  
        // string = string.splice(string.indexOf(fund), fund.length+1); 
      
        // if(history.replaceState){
        //   history.replaceState('','', string);
        // }else{
        //   window.location.hash = string;
        // }

        if(history.replaceState){
          var string = window.location.search;  
          string = string.splice(string.indexOf(fund), fund.length+1); 
          history.replaceState('','', string);
        }else{
          var string = window.location.hash;  
          string = string.splice(string.indexOf(fund), fund.length+1); 
          window.location.hash = string;
        }

        $(".owl-carousel").data('owlCarousel').removeItem(currentFundID);
        cardLefted--;
        if (cardLefted == 2) { // addToCompare btn reset
          $(".owl-carousel").data('owlCarousel').addItem(addToCompareString);
        }
        getCurrentCardInfo(currentFundID);

    });
    comparedCardsHeight();
  }

  function addToCompareBtn() {
    
    //redirect to select fund page with selected funds
    // $('.add-to-compare a, .switchToSelect, .add-to-compare-btn').on('click', function(e){
    //   e.preventDefault();
    //   var href = $(this).attr('href'); 
    //   var string = window.location.search; 
    //   // string = string.replace("view", "select");
    //   string = href + string.replace("#view", "?select"); 
    //   $(this).attr('href', string);
    //   window.location.replace(string);
    // });
  $('.add-to-compare a, .switchToSelect, .add-to-compare-btn').on('click', function(e){
      e.preventDefault();
      var string;
      var href = $(this).attr('href'); 
      if(history.replaceState){
        string = window.location.search;
        string = href + string.replace("view", "select"); 
        $(this).attr('href', string);
        window.location.replace(string);
      } else {
        string = window.location.hash; 
        // string = string.replace("view", "select");
        string = href + string.replace("#view", "?select"); 
        $(this).attr('href', string);
        window.location.replace(string);
      }

    });
  }

  function setEmailURL(){
    $('.documentDistribution li.email a').click(function(){
      var fundString;
      if(history.replaceState){
        fundString = window.location.search;
      }else {
        fundString = window.location.hash; 
      }
      var baseURL = $('.documentDistribution li.email a').attr('href');
      console.log('email');
      var shareURL = baseURL + fundString;
      $('.documentDistribution li.email a').attr('href', shareURL);
    })
  }

  //temporary funciton - OK to delete on site build:  
  function setURLState(){
    var selectedFunds = [];
    var viewString = '?viewfund=';
    if(window.location.search.substring(0,10) === viewString){
      var searchString = window.location.search.substring(6).replace("&wcmmode=disabled", "");

      if(searchString.length){
        var fundSymbols = searchString.split(',');
        selectedFunds = fundSymbols;
        for(var i in selectedFunds){
          viewString = viewString  +','+ selectedFunds[i];
        }
        viewString = viewString.replace("=,", "=");
        // console.log(viewString);
        if(history.viewString){
          history.replaceState('','', viewString);
        }else{
          window.location.hash = viewString;
        }
      } else {
        if(history.viewString){
          history.replaceState('','','?');
        } else {
          window.location.hash = ' ';
        };
      }
    }
  };

  function resizeStickyHeader() {
    //if (windowWidth > 767) {
      $('.sticky-header').each(function(){
        var affixWidth = $('.fundComparison').children('.compare').outerWidth();

        $(this).css('width', affixWidth + 'px');
      });
    //}
  }

  function getCurrentCardInfo(currentFundID) {
    //console.log('getCurrentCardInfo');
    var currentFund = $('.compared-cards .compare:eq('+currentFundID+')');
    if(!currentFund.hasClass('add-to-compare')) {
      var currentFundName = currentFund.find('.fund-name').text();
      var currentFundURL = currentFund.find('.sticky-header a').attr('href');
      
      var stickyHeader = "<div class='sticky-header affix'><h2 class='fund-name'><a class='block' href='"+currentFundURL+"'>"+currentFundName+"</a></h2><a class='sticky-delete-btn btn-delete' ><img src='/etc/designs/thrivent/mcs/clientlib-site/img/btn-delete.png'></a><a class='btn-primary' href='http://cdn.shape.com/sites/shape.com/files/styles/384xany/public/to-do-rot-329x390.jpg'>Buy Funds</a></div>";
    } else {
      var stickyHeader = "<div class='sticky-header affix'><a class='add-to-compare-btn block' href='/content/thrivent/mcs/en/mutual-funds/fund-comparison.html'>Add a fund to compare</a></div>";
    }
    if($('.sticky-bg').hasClass('affix')) {
      if($('.sticky-bg').next().hasClass('sticky-header')) {
        $('.sticky-bg').next('.sticky-header').replaceWith(stickyHeader);
      } else  $('.sticky-bg').after(stickyHeader);
    }
    resizeStickyHeader();
    deleteFundSticky();
    addToCompareBtn();
  }

  function comparedCardsHeight() {
    var tempHeight = $('.fundComparison').children('.compare').outerHeight();
    $('.compared-cards').css('height', tempHeight);
  }

  function stickyNav() {
    // console.log('stickyNav');
    // add/remove stikcy header
      var scroll = $(this).scrollTop();
      var windowWidth = window.innerWidth;
      var headerHeight = $('.header').height();
      var titleHeight = $('.fund-comparison-page .parbase').outerHeight();
      var scrollDist = headerHeight+titleHeight+20;
      var disclosuresOffset = $('.disclosures').offset().top;

      if(windowWidth > 767){
        if(scroll > 145 ) { //console.log(scroll, 'scrollshow');
          $('.fundComparison .sticky-header, .fundComparison .sticky-bg').addClass('affix');
        } else {
          $('.fundComparison .sticky-header, .fundComparison .sticky-bg').removeClass('affix');
          
        }
        if($('.sticky-bg').next().hasClass('sticky-header')) {
          $('.sticky-bg').next().remove();
        }

      } else if(windowWidth < 768){
        var linkHeight = $('.fund-comparison-page .switchToSelect').outerHeight();
        scrollDist = scrollDist +linkHeight;
        if(scroll > scrollDist) {
          $('.fundComparison .sticky-header, .fundComparison .sticky-bg').addClass('affix');
          // $('.compared-cards .sticky-header.affix').css('top', scroll-scrollDist);
          
          if(!$('.sticky-bg').next().hasClass('sticky-header')) {
            getCurrentCardInfo(currentFundID);           

          }
          //resizeStickyHeader();

        } else {
          $('.sticky-bg').next('.sticky-header').remove();  
          $('.fundComparison .sticky-header, .fundComparison .sticky-bg').removeClass('affix');
        }
        comparedCardsHeight();
      }
  }

  function init() {
    var ua = navigator.userAgent;
    if(ua.indexOf("Android") >= 0) {
      $('.fundComparison').addClass('android-style');
    }
    if(ua.indexOf('Chrome')>= 0) {$('.fundComparison').addClass('chrome-style');}

    hideShowBtn();
    viewFundsCarousel($('.compared-cards'));
    resizeStickyHeader();
    stickyNav();

    $(window).resize(function(){
      viewFundsCarousel($('.compared-cards'));
      if((!$('.sticky-bg').hasClass('affix'))&&($('.sticky-bg').next().hasClass('sticky-header'))) { $('.sticky-bg').next('.sticky-header').remove();}
      stickyNav();
      resizeStickyHeader();
      comparedCardsHeight();
    });

    $(window).scroll(function(){
      stickyNav();   
    });

    // setURLState();  //temporary funciton - OK to delete on site build
    deleteFund();
    addToCompareBtn();
    setEmailURL();
    
    //update hash to match search for ie9 on page load
    if(!history.replaceState){
      var selection = window.location.search;
      selection = selection.replace("?", "");
      window.location.hash = selection;
    }

    // print contextual help
    var beforePrint = function() {
        $('.contextual-help-print').removeClass('hidden');
    };
    var afterPrint = function() {
        $('.contextual-help-print').addClass('hidden');
    };
    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (mql.matches) {
                beforePrint();
            } else {
                afterPrint();
            }
        });
    }
    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;

    $('.btn-primary.buy-funds').on('click', function(e){
      e.preventDefault();
      var fundData = $(this);
      var poptions = 'purchase|' + fundData.data('ticker') + '|shares';
      var tidx = sessionStorage.getItem('tidx');
      (tidx == null) ? tidx = undefined : tidx;
      dstnavigate('purchase', {cz:fundData.data('param-cz'),tidx:tidx,navoptions:poptions,newwindow:true},$(this).attr('href'));
    });
  }
  init();
  
}

$(document).ready(function(){
  if($('.fundComparison .compared-cards').length) {
      thv.mcs.viewFunds();
      thv.mcs.relatedFunds();
  }
});
    

var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.fundHoldings = function(){

  var fund = thv.mcs.preTicker,
      basePath = thv.mcs.moneyMarketUrl,
      //basePath = '/content/thrivent/mcs/en/internal/moneyMarket',
      classA = false,
      classS = false,
      currentDay,
      asOfDate,
      chartSummary = [];

  Highcharts.setOptions({
      colors: ['#34cb98'],
      lang:{
        rangeSelectorZoom:''
      }
  });

  if(fund == "(AMMXX)"){
    classA = true;
  } else if(fund == "(AALXX)") {
    classS = true;
  };

  function holdingsData() {
    var url = basePath + '/data.json';
    $.get(url , function(data){
      if(classA){
        seriesData(data.A);
      }
      if(classS){
        seriesData(data.S);
      }
    })
    .fail(function(data) {
      console.log('holdings data fail');
    })
  };

  function seriesData(activity) {
    currentDay = (new Date(activity.currentDate).getTime());
    var builder = [{
          "data": [
            [0, 0]
          ]
        },{
          "data": [
            [0, 0]
          ]
        }];
    //set date and download from json data values        
    $('#portfolio-statistics .as-of-date, #shadow-nav-date').text('(as of ' + activity.currentDate + ')');
    $('#shadow-nav-value').text('$' + (activity.currentShadowNav).toFixed(4));
    $("#csvDownload").attr('href', basePath + '/' + activity.currentCsvFile);

    if($('.load-tab-toggle[href="#holdings"]').parent().hasClass('active')){
      $.each(activity.datasets, function (i, dataset) {
        var data;
        if(!dataset.series){
          //Add X values
          dataset.data = Highcharts.map(dataset.data, function (val, j) {
            var timeStamp = (new Date(activity.xData[j]).getTime());
            return [timeStamp, val];
          });
          data = dataset.data;
          singleSeries(i, data);
        } else {
          $.each(dataset.series, function(i, dataset) {
            builder[i].data = Highcharts.map(dataset.data, function (val, j) {
              var timeStamp = (new Date(activity.xData[j]).getTime());
              return [timeStamp, val];
            });
          })
          doubleSeries(builder);
        }
      }); //end each
    }
  };

  $(chartSummary).each(function(i, el) {
    $(el.container).mouseleave(function() {
      for (i = 0; i < chartSummary.length; i++)
        chartSummary[i].tooltip.hide();
    })
  });

  function syncMobile(j){
    var mobileDate = $('.graph-tooltip-value.date').text();
    var mobileNet = '$' + parseFloat(chartSummary[1].series[0].data[0].series.yData[j], 10).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").toString();
    var mobileShadow = '$' + parseFloat(chartSummary[2].series[0].data[0].series.yData[j], 10).toFixed(4).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
    var mobileWeekly = (chartSummary[0].series[0].data[0].series.yData[j] * 100).toFixed(2) + '%';
    var mobileDaily = (chartSummary[0].series[1].data[0].series.yData[j] * 100).toFixed(2) + '%';

    $('.mobile-values .date .value').text(mobileDate);
    $('.mobile-values .net .value').text(mobileNet);
    $('.mobile-values .daily .value').text(mobileDaily);
    $('.mobile-values .weekly .value').text(mobileWeekly);
    $('.mobile-values .shadow .value').text(mobileShadow);
  }

  function syncTooltip(container, p) {
    var i = 0,
      j = 0,
      data;
    for (; i < chartSummary.length; i++) {
      //if (container.id != chartSummary[i].container.id) {
        data = chartSummary[i].series[0].data;
        for (; j < data.length; j++) {
          if (data[j].x === p) {
            if(chartSummary[i].series[0].data[j].y != null){
              syncMobile(j);
              chartSummary[i].tooltip.refresh([chartSummary[i].series[0].data[j]]);
            }
          }
        }
        j = 0;
      }
    //}
    $('#container1 .highcharts-markers.highcharts-tracker')[1].css('visibility','hidden');
  };

   //Synchronize zooming
  function syncExtremes(e) {
    var thisChart = this.chart;
    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
      for (i=0; i < chartSummary.length; i++) {
        if (chartSummary[i] !== thisChart) {
          if (chartSummary[i].xAxis[0].setExtremes) { // It is null while updating
            chartSummary[i].xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
          }
        }
      };
    };
  }

  function doubleSeries(series) {
    chartSummary[0] = new Highcharts.StockChart({
      chart: {
        renderTo: 'container1',
        defaultSeriesType: 'line',
        height: 200,
        zoomType: null,
        pinchType: null,
        panning: false
      },
      rangeSelector: {
        enabled: true,
        inputEnabled: false,
        buttons: [{
          type: 'month',
          count: 6,
          text: '6m'
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        }, {
          type: 'month',
          count: 1,
          text: '1m'
        }]/*,
        selected: 2*/
      },
      navigator: {
          enabled: false
      },
      scrollbar: {
          enabled: false
      },
      credits: {
          enabled: false
      },
      title : {
          text : null
      },
      xAxis: {
        type: 'datetime',
        ordinal: false,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        labels: {
          format: '{value:%m-%d-%y}',
        },
        tickInterval: 86000000,
        showLastLabel: true,
        startOnTick: true,
        //endOnTick: true,
        events: {
          setExtremes: syncExtremes
        },
        labels: {
          useHTML: true,
          rotation: 0,
          reserveSpace: true,
          style: {
            overflow: 'visible !important',
            'text-overflow': 'unset !important',
          },
          formatter : function(){
            if(this.isFirst){
              var first = "<span class='xMinValue'>" + Highcharts.dateFormat('%m/%d/%Y', this.value) + "</span>";
              return first;
            } else
            if(this.isLast){
              var last = "<span class='xMaxValue'>" + Highcharts.dateFormat('%m/%d/%Y', this.value) + "</span>";
              return last;
            } else {
              var empty = "<span></span>"
              return empty;
            }
          }
        }
      },
      yAxis: {
        tickPositions: [0, .25, .5],
        opposite: false,
        showLastLabel: true,
        labels: {
          formatter: function () {
              return (this.value * 100) +'%';
          }
        }
      },
      plotOptions: {
        line: {
          marker: {
            fillColor: '#ffffff',
            symbol:'circle',
            radius: 4,
            lineColor:'#d3cb43',
            lineWidth: 2,
          }
        },
        series: {
          point: {
            events: {
              mouseOver: function() {
                syncTooltip(this.series.chart.container, this.x);
              }
            }
          },
          states: {
            hover: {
              halo: {
                size: 0
              }
            }
          }
        }
      },
      series: [{
        data: series[1].data
        },
        {
          data: series[0].data
        }
      ],
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderColor: '#ccd3da',
        borderWidth: 1,
        crosshairs: [{
            width: 1,
            color: '#d0d0cc'
        }],
        shape: 'callout',
        useHTML: true,
        formatter : function(){
          //pulling from DOM as the built in functions have no scoping to specific graphs
          var tooltipText = "<div class='row'><span class='graph-tooltip-label'>Date</span><span class='graph-tooltip-value date'>" + Highcharts.dateFormat('%m/%d/%Y', this.x) + "</span></div>"; 
          tooltipText += "<div class='row'><span class='graph-tooltip-label'>" + $('.mobile-values .weekly .vLabel').text() + "</span><span class='graph-tooltip-value'>" + $('.mobile-values .weekly .value').text() + "</span></div>";
          tooltipText += "<div class='row'><span class='graph-tooltip-label'>" + $('.mobile-values .daily .vLabel').text() + "</span><span class='graph-tooltip-value'>" + $('.mobile-values .daily .value').text() + "</span></div>";
          return tooltipText;
        }
      }
    });
     hideZoomBar(chartSummary[0]);
    $('#container1').highcharts().yAxis[0].setExtremes(0, 0.5);
  }

  function singleSeries(b, series) {
    chartSummary[b] = new Highcharts.StockChart({
      chart: {
        renderTo: 'container' + (b + 1),
        defaultSeriesType: 'line',
        height: 200,
        zoomType: null,
        pinchType: null,
        panning: false
      },
      rangeSelector: {
        enabled: true,
        inputEnabled: false,
        buttons: [{
          type: 'month',
          count: 6,
          text: '6m'
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        }, {
          type: 'month',
          count: 1,
          text: '1m'
        }]/*,
        selected: 2*/
      },
      navigator: {
          enabled: false
      },
      scrollbar: {
          enabled: false
      },
      credits: {
          enabled: false
      },
      title : {
          text : null
      },
      xAxis: {
        type: 'datetime',
        ordinal: false,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        tickInterval: 86400000,
        //showLastLabel: true,
        startOnTick: true,
        //endOnTick: true,
        events: {
          setExtremes: syncExtremes
        },
        labels: {
          useHTML: true,
          rotation: 0,
          reserveSpace: true,
          style: {
            overflow: 'visible !important',
            'text-overflow': 'unset !important',
          },
          formatter : function(){
            if(this.isFirst){
              var first = "<span class='xMinValue'>" + Highcharts.dateFormat('%m/%d/%Y', this.value) + "</span>";
              return first;
            } else
            if(this.isLast){
              var last = "<span class='xMaxValue'>" + Highcharts.dateFormat('%m/%d/%Y', this.value) + "</span>";
              return last;
            } else {
              var empty = "<span></span>"
              return empty;
            }
          }
        }
      },
      yAxis: {
        tickAmount: 3,
        showLastLabel: true,
        opposite: false,
        labels: {
          formatter: function () {
            return '$' + this.axis.defaultLabelFormatter.call(this);
          }            
        }
      },
      plotOptions: {
        line: {
          marker: {
            fillColor: '#ffffff',
            symbol:'circle',
            radius: 4,
            lineColor:'#d3cb43',
            lineWidth: 2
          }
        },
        series: {
          point: {
            events: {
              mouseOver: function() {
                syncTooltip(this.series.chart.container, this.x);
              }
            }
          },
          states: {
            hover: {
              halo: {
                size: 0
              }
            }
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderColor: '#ccd3da',
        borderWidth: 1,
        crosshairs: [{
            width: 1,
            color: '#d0d0cc'
        }],
        shape: 'callout',
        useHTML: true,
        formatter : function(){
          if(b == 1){
            var tooltipText = "<div class='row'><span class='graph-tooltip-label'>Date</span><span class='graph-tooltip-value'>" + Highcharts.dateFormat('%m/%d/%Y', this.x) + "</span></div>"; 

              tooltipText += "<div class='row'><span class='graph-tooltip-label'>Net Flows</span><span class='graph-tooltip-value'>$" + Highcharts.numberFormat(this.y, 0, '.', ',') + "</span></div>";

            return tooltipText;
          } else {
            var tooltipText = "<div class='row'><span class='graph-tooltip-label'>Date</span><span class='graph-tooltip-value'>" + Highcharts.dateFormat('%m/%d/%Y', this.x) + "</span></div>"; 

              tooltipText += "<div class='row'><span class='graph-tooltip-label'>Market-Based NAV</span><span class='graph-tooltip-value'>$" + Highcharts.numberFormat(this.y, 4, '.', ',') + "</span></div>";

            return tooltipText;
          }
        }
      },
      series: [{
        data: series
      }],
    });
    hideZoomBar(chartSummary[b]);
    if(b == 2){
      //set extremes for shadow nav
      chartSummary[2].yAxis[0].setExtremes(-2, 2);
      //after all 3 graphs are loaded, fire off the month zoom view
      chartSummary[1].rangeSelector.clickButton(0,{},true);
      var monthBtns = $(".nav-zoom .nav-tabs li");
      monthBtns.removeClass();
      monthBtns.eq(2).addClass('active');
      monthBtns.eq(5).addClass('active');
      monthBtns.eq(8).addClass('active');
      //after all 3 graphs are loaded select current day
      $.each(chartSummary[1].series[0].data, function(i){
        if (currentDay == chartSummary[1].series[0].data[i].x){
          $.each(chartSummary, function(c){
            if(chartSummary[c].series[0].data[i].y != null){
              syncMobile(i);
              chartSummary[c].tooltip.refresh([chartSummary[c].series[0].data[i]]);
            }
          });
        }
      });
      var clipSize = chartSummary[2].clipRect.renderer.width;
      var newClip = clipSize + 10;
      for (i = 0; i < chartSummary.length; i++){
        chartSummary[i].clipRect.attr({width: newClip});
      }
    } 
  };

  function hideZoomBar(chart) {
      chart.rangeSelector.zoomText.hide();
      $.each(chart.rangeSelector.buttons, function () {
          this.hide();
      });
      $(chart.rangeSelector.divRelative).hide();
  };

  $('.zoomBtn').on('click tap', function(event){
    event.preventDefault();
    $('.zoomBtn').parent().removeClass('active');
    var hcTarget = $(event.currentTarget).parents(".chart").find('[id*="container"]');
    if($(this).hasClass('oneMonth')){
      $('.oneMonth').parent().addClass('active');
      hcTarget.highcharts().rangeSelector.clickButton(2,{},true);
    } else
    if($(this).hasClass('threeMonth')){
      $('.threeMonth').parent().addClass('active');
      hcTarget.highcharts().rangeSelector.clickButton(1,{},true);
    } else
    if($(this).hasClass('sixMonth')){
      $('.sixMonth').parent().addClass('active');
      hcTarget.highcharts().rangeSelector.clickButton(0,{},true);
    }
  });

  function init() {
    holdingsData();
  }

  init();
}
//
//Fires off from tabInit.js when holdings tab is opened
//

/*
search from hash on page load and hashchange
sort
show total
pagination
show range
noresults
spellcheck
show links if fund
show icon if pdf
header search (talk to george)
authorable (talk to kapil about pagination label)
back button
wrap in module
mobile
show graphics if fund
deep link fund links
hide results while loading
*/
'use strict';

var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.search = function () {

	var SearchResults = React.createClass({
		displayName: 'SearchResults',

		render: function render() {
			if (this.props.totalResults > 0) {
				var resultNodes = this.props.results.map(function (item, index) {
					var resultLinks, resultGraphic, typeIcon;

					if (item.content_type == 'content-fund' && item.graphData) {
						var gd = $.parseJSON(item.graphData),
						    firstLabel,
						    secondLabel,
						    thirdLabel,
						    marketCap,
						    marketStyle,
						    rateSensitivity,
						    creditQuality,
						    secondaryGraph,
						    graphClass = 'secondary-graphic';

						if (gd.fundAllocationMix) {
							if (gd.fundAllocationMix == 'Investment Style Box') graphClass += ' box-graphic';else if (gd.fundAllocationMix == 'Market Cap Style Bar Graph') graphClass += ' bar-graphic';else graphClass += ' circle-graphic';
						}

						if (gd.attributeGraphicTitle) {
							if (gd.firstAllocationLabel) firstLabel = React.createElement(
								'p',
								null,
								React.createElement(
									'span',
									null,
									gd.firstAllocationLabel
								),
								React.createElement(
									'span',
									null,
									gd.firstAllocationPercentage + '%'
								)
							);
							if (gd.secondAllocationLabel) secondLabel = React.createElement(
								'p',
								null,
								React.createElement(
									'span',
									null,
									gd.secondAllocationLabel
								),
								React.createElement(
									'span',
									null,
									gd.secondAllocationPercentage + '%'
								)
							);
							if (gd.thirdAllocationLabel) thirdLabel = React.createElement(
								'p',
								null,
								React.createElement(
									'span',
									null,
									gd.thirdAllocationLabel
								),
								React.createElement(
									'span',
									null,
									gd.thirdAllocationPercentage + '%'
								)
							);
							if (gd.valueMarketCapitalization) marketCap = React.createElement(
								'p',
								null,
								React.createElement(
									'strong',
									null,
									gd.labelMarketCapitalization + ': '
								),
								React.createElement(
									'span',
									null,
									gd.valueMarketCapitalization
								)
							);
							if (gd.valueStyle) marketStyle = React.createElement(
								'p',
								null,
								React.createElement(
									'strong',
									null,
									gd.labelStyle + ': '
								),
								React.createElement(
									'span',
									null,
									gd.valueStyle
								)
							);
							if (gd.valueInterestRateSensitivity) rateSensitivity = React.createElement(
								'p',
								null,
								React.createElement(
									'strong',
									null,
									gd.labelInterestRateSensitivity + ': '
								),
								React.createElement(
									'span',
									null,
									gd.valueInterestRateSensitivity
								)
							);
							if (gd.valueCreditQuality) creditQuality = React.createElement(
								'p',
								null,
								React.createElement(
									'strong',
									null,
									gd.labelCreditQuality + ': '
								),
								React.createElement(
									'span',
									null,
									gd.valueCreditQuality
								)
							);

							secondaryGraph = React.createElement(
								'div',
								{ className: graphClass },
								React.createElement('div', { className: 'graphic' }),
								React.createElement(
									'h4',
									null,
									React.createElement(
										'span',
										null,
										gd.attributeGraphicTitle
									),
									React.createElement(
										'sup',
										null,
										gd.attributeGraphicFootnote
									)
								),
								React.createElement(
									'div',
									{ className: 'graph-details' },
									firstLabel,
									secondLabel,
									thirdLabel,
									marketCap,
									marketStyle,
									rateSensitivity,
									creditQuality
								)
							);
						}

						resultLinks = React.createElement(
							'div',
							{ className: 'fund-links' },
							React.createElement(
								'a',
								{ href: item.url + '?initTab=performance#detail-tabs-container' },
								'Performance'
							),
							React.createElement(
								'a',
								{ href: item.url + '?initTab=holdings#detail-tabs-container' },
								'Holdings'
							),
							React.createElement(
								'a',
								{ href: item.url + '?initTab=riskVolatility#detail-tabs-container' },
								'Risk & Volatility'
							),
							React.createElement(
								'a',
								{ href: item.url + '?initTab=distributionYields#detail-tabs-container' },
								'Distributions & Yields'
							),
							React.createElement(
								'a',
								{ href: item.url + '?initTab=morningstar#detail-tabs-container' },
								'Morningstar'
							),
							React.createElement(
								'a',
								{ href: item.url + '?initTab=feesExpenses#detail-tabs-container' },
								'Fees & Expenses'
							)
						);

						resultGraphic = React.createElement(
							'div',
							{ className: gd.fundKey + ' ' + gd.riskPotentialCategory.toLowerCase().replace(/ /g, '-') + " fund-graphic" },
							React.createElement(
								'div',
								{ className: 'primary-graphic' },
								React.createElement('div', { className: 'graphic' }),
								React.createElement(
									'h4',
									null,
									React.createElement(
										'span',
										null,
										gd.riskGraphicTitle
									),
									React.createElement(
										'sup',
										null,
										gd.riskGraphicFootnote
									)
								),
								React.createElement(
									'p',
									null,
									gd.riskPotentialCategory
								)
							),
							secondaryGraph
						);
					} else if (item.content_type == 'content-pdf') {
						typeIcon = React.createElement('img', { src: '/etc/designs/thrivent/mcs/clientlib-site/img/pdf-icon.png' });
					}

					return React.createElement(
						'li',
						{ key: index, className: item.content_type },
						React.createElement(
							'h3',
							null,
							React.createElement(
								'a',
								{ href: item.url },
								typeIcon,
								item.title
							)
						),
						React.createElement(
							'p',
							null,
							item.description
						),
						resultLinks,
						resultGraphic
					);
				});

				return React.createElement(
					'ul',
					{ className: 'results' },
					resultNodes
				);
			} else return React.createElement('ul', { className: 'results', style: { display: 'none' } });
		}
	});

	var SortContainer = React.createClass({
		displayName: 'SortContainer',

		handleSortClick: function handleSortClick(e) {
			e.preventDefault();
			this.props.onSortUpdate($(e.target).index());
		},
		render: function render() {
			if (this.props.totalResults > 1) {
				var sortOptions = this.props.sortOptions.map((function (item, index) {
					var className = index == this.props.sort ? 'active' : null;
					return React.createElement(
						'a',
						{ key: index, className: className, onClick: this.handleSortClick, 'data-sort': item.sort, href: '#' },
						item.text
					);
				}).bind(this));

				return React.createElement(
					'span',
					{ className: 'sort' },
					React.createElement(
						'span',
						null,
						searchContent.sortByLabel
					),
					React.createElement(
						'span',
						null,
						sortOptions
					)
				);
			} else return React.createElement('span', { className: 'sort', style: { display: 'none' } });
		}
	});

	var ResultCount = React.createClass({
		displayName: 'ResultCount',

		render: function render() {
			if (this.props.totalResults > 0) return React.createElement(
				'span',
				null,
				'Showing results ',
				this.props.startIndex,
				'-',
				this.props.endIndex,
				' of ',
				this.props.totalResults
			);else return React.createElement('span', { style: { display: 'none' } });
		}
	});

	var SearchInput = React.createClass({
		displayName: 'SearchInput',

		handleChange: function handleChange(e) {
			this.props.onSearchUpdate(e.target.value);
		},
		handleSearchClick: function handleSearchClick(e) {
			e.preventDefault();
			_satellite.setVar('internalSearchKeyword', decodeURIComponent(this.props.query));
			_satellite.track('trackInternalSearch');
			this.props.onSearchSubmit();
		},
		handleSearchEnter: function handleSearchEnter(e) {
			if (e.which == 13) {
				e.preventDefault();
				_satellite.setVar('internalSearchKeyword', decodeURIComponent(this.props.query));
				_satellite.track('trackInternalSearch');
				this.props.onSearchSubmit();
			}
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'search-wrapper' },
				React.createElement(
					'label',
					{ htmlFor: 'reactSearch', className: 'hidden' },
					'Search'
				),
				React.createElement('input', { id: 'reactSearch', onKeyDown: this.handleSearchEnter, type: 'search', value: decodeURIComponent(this.props.query), onChange: this.handleChange }),
				React.createElement(
					'a',
					{ onClick: this.handleSearchClick, href: '#' },
					React.createElement('img', { alt: 'search', src: '/etc/designs/thrivent/mcs/clientlib-site/img/search-icon.jpg' })
				)
			);
		}
	});

	var Pagination = React.createClass({
		displayName: 'Pagination',

		handlePageChange: function handlePageChange(i, className, e) {
			//console.log(arguments, this.props.pageIndex, this.props.pageCount, typeof this.props.pageIndex);
			e.preventDefault();
			if (className == null || className.indexOf('active') + className.indexOf('disabled') === -2) {
				if (i > -1) this.props.onPageUpdate(i + 1); //clicked page number link
				else if (i == -1) this.props.onPageUpdate(1); //clicked first page link
					else if (i == -2) this.props.onPageUpdate(this.props.pageIndex - 1); //clicked left arrow
						else if (i == -3) this.props.onPageUpdate(this.props.pageIndex + 1); //clicked right arrow
							else if (i == -4) this.props.onPageUpdate(this.props.pageCount); //clicked last page link
			}
		},
		render: function render() {
			if (this.props.pageCount > 1) {
				var pageLinks = [],
				    firstLinkClass,
				    lastLinkClass,
				    leftArrowClass,
				    rightArrowClass;

				if (this.props.pageIndex == 1) {
					firstLinkClass = 'first-page-link disabled';
					leftArrowClass = 'left-arrow disabled';
				} else {
					firstLinkClass = 'first-page-link';
					leftArrowClass = 'left-arrow';
				}

				if (this.props.pageIndex == this.props.pageCount) {
					lastLinkClass = 'last-page-link disabled';
					rightArrowClass = 'right-arrow disabled';
				} else {
					lastLinkClass = 'last-page-link';
					rightArrowClass = 'right-arrow';
				}

				for (var i = 0, len = this.props.pageCount; i < len; i++) {
					var className = i == this.props.pageIndex - 1 ? 'active' : null;
					pageLinks.push(React.createElement(
						'a',
						{ key: i, href: '#', onClick: this.handlePageChange.bind(this, i, className), className: className },
						i + 1
					));
				};

				return React.createElement(
					'div',
					{ className: 'results-pagination' },
					React.createElement(
						'a',
						{ href: '#', onClick: this.handlePageChange.bind(this, -1, firstLinkClass), className: firstLinkClass },
						'First'
					),
					React.createElement('a', { href: '#', onClick: this.handlePageChange.bind(this, -2, leftArrowClass), className: leftArrowClass }),
					React.createElement(
						'div',
						{ className: 'page-links' },
						pageLinks
					),
					React.createElement('a', { href: '#', onClick: this.handlePageChange.bind(this, -3, rightArrowClass), className: rightArrowClass }),
					React.createElement(
						'a',
						{ href: '#', onClick: this.handlePageChange.bind(this, -4, lastLinkClass), className: lastLinkClass },
						'Last'
					)
				);
			} else return React.createElement('ul', { className: 'results-pagination', style: { display: 'none' } });
		}
	});

	var NoResults = React.createClass({
		displayName: 'NoResults',

		render: function render() {
			if (this.props.totalResults == 0 && this.props.query) return React.createElement(
				'p',
				{ className: 'no-results' },
				searchContent.noResult
			);else return React.createElement('p', { className: 'no-results', style: { display: 'none' } });
		}
	});

	var SpellCheck = React.createClass({
		displayName: 'SpellCheck',

		render: function render() {
			if (this.props.spellcheckQuery) return React.createElement(
				'p',
				{ className: 'spellcheck' },
				React.createElement(
					'span',
					null,
					searchContent.spellCheck,
					' "'
				),
				React.createElement(
					'a',
					{ onClick: this.props.onSpellCheckClick, href: '#' },
					React.createElement(
						'span',
						null,
						this.props.spellcheckQuery
					),
					React.createElement(
						'span',
						{ className: 'sr-only' },
						searchContent.spellCheckAlt
					)
				),
				React.createElement(
					'span',
					null,
					'"?'
				)
			);else return React.createElement('p', { className: 'spellcheck', style: { display: 'none' } });
		}
	});

	var SearchContainer = React.createClass({
		displayName: 'SearchContainer',

		loadResults: function loadResults(hash) {
			var storedResults = sessionStorage.getItem(hash);

			if (this.xhr && this.xhr.readyState != 4) this.xhr.abort();

			if (storedResults) this.loadResultsFromSession(hash, storedResults);else this.loadResultsFromServer(hash);
		},
		loadResultsFromSession: function loadResultsFromSession(hash, storedResults) {
			//console.log('load results from session');
			var storedResults = $.parseJSON(storedResults),
			    spellcheck = storedResults.spellcheck,
			    updateMessage = searchContent.resultUpdateMessage.replace('##', this.state.resultIndex + 1).replace('@@', this.state.resultIndex + this.resultsPerPage).replace('@search', this.state.query).replace('@sort', this.sortOptions[this.state.sort].text),
			    stateUpdates = {
				results: storedResults.response.docs,
				totalResults: storedResults.response.numFound,
				loadStatus: 'loaded',
				accessibilityText: updateMessage
			};

			if (spellcheck && spellcheck.collations && spellcheck.collations.length) {
				stateUpdates.spellcheckQuery = spellcheck.collations[1].collationQuery;
			} else stateUpdates.spellcheckQuery = '';

			this.setState(stateUpdates);
		},
		loadResultsFromServer: function loadResultsFromServer(hash) {
			//console.log('load results from server');
			var options = {
				q: this.state.query,
				start: this.state.resultIndex,
				rows: this.resultsPerPage
			};

			//console.log(this.state.sort);
			if (this.sortOptions[this.state.sort].sort !== 'default') options.sort = this.sortOptions[this.state.sort].sort;

			this.setState({ loadStatus: 'loading' });

			this.xhr = $.getJSON(searchContent.serviceURL + '?&fl=title%2Cdescription%2Curl%2Ccontent_type%2CgraphData&wt=json&indent=true', options).done((function (data) {
				var spellcheck = data.spellcheck,
				    updateMessage = searchContent.resultUpdateMessage.replace('##', this.state.resultIndex + 1).replace('@@', this.state.resultIndex + this.resultsPerPage).replace('@search', this.state.query).replace('@sort', this.sortOptions[this.state.sort].text),
				    stateUpdates = {
					results: data.response.docs,
					totalResults: data.response.numFound,
					loadStatus: 'loaded',
					accessibilityText: updateMessage
				};

				if (spellcheck && spellcheck.collations && spellcheck.collations.length) {
					stateUpdates.spellcheckQuery = spellcheck.collations[1].collationQuery;
				} else stateUpdates.spellcheckQuery = '';

				sessionStorage.setItem(hash, JSON.stringify(data));
				this.setState(stateUpdates);
			}).bind(this));
		},
		xhr: null, //this is set to the jqXHR object from the results json request and is used to cancel it if another request is made before the first completes.
		updateHash: function updateHash(forceUpdate) {
			var preQuery = decodeURIComponent(this.state.query);
			location.hash = this.state.sort + '/' + encodeURIComponent(preQuery) + '/' + this.state.pageIndex;
			if (forceUpdate) $(window).trigger('hashchange');
			//console.log('updatehash', (new Date()).getTime());
		},
		onPageUpdate: function onPageUpdate(pageIndex) {
			//console.log('onPageUpdate', pageIndex);
			$('html,body').scrollTop($('.search').offset().top);
			this.setState({
				pageIndex: pageIndex,
				resultIndex: (pageIndex - 1) * this.resultsPerPage,
				requestUpdate: true
			});
		},
		onSpellCheckClick: function onSpellCheckClick(e) {
			e.preventDefault();
			//console.log(this.state.spellcheckQuery);
			this.setState({
				pageIndex: 1,
				resultIndex: 0,
				query: encodeURIComponent(this.state.spellcheckQuery),
				requestUpdate: true
			});
		},
		onSearchUpdate: function onSearchUpdate(val) {
			this.setState({ query: encodeURIComponent(val) });
		},
		onSearchSubmit: function onSearchSubmit() {
			this.setState({
				pageIndex: 1,
				resultIndex: 0,
				requestUpdate: true
			});
		},
		onSortUpdate: function onSortUpdate(val) {
			this.setState({ sort: val, requestUpdate: true });
		},
		componentDidUpdate: function componentDidUpdate() {
			if (this.state.requestUpdate) {
				//console.log(this.state.query, this.state.sort, this.state.results);
				this.updateHash(this.state.forceUpdate);
				this.setState({ requestUpdate: false, forceUpdate: false });
			}
		},
		componentDidMount: function componentDidMount() {
			$(window).on('hashchange', (function (e) {
				//update state in case hashchange came from back button
				//unfortunately redundant because if event didnt
				//come from back/forward button it just sets state
				//to what it has just been set to,
				//potentially optimized by checking to see if state actually changed
				//before update but probably not worth because it creates
				//potential cases where the user presses back/forward and
				//nothing changes
				//console.log('hashchange', (new Date()).getTime());
				this.setState(this.getHashState());
				this.loadResults(location.hash);
			}).bind(this));

			if (this.state.query) this.setState({ requestUpdate: true, forceUpdate: true });
		},
		sortOptions: [{ text: searchContent.sortByRelevanceLabel, sort: 'default' }, { text: searchContent.sortByDateLabel, sort: 'created desc' }],
		resultsPerPage: 10,
		getHashState: function getHashState(stateObj) {
			var hash = location.hash.substring(1),
			    newState = stateObj ? stateObj : {};

			if (hash && hash != '#') {
				//console.log('setting state from hash');
				var hashParts = hash.split('/');

				if (hashParts.length == 1) newState.query = decodeURIComponent(hashParts[0]);else if (hashParts.length == 2) {
					newState.query = decodeURIComponent(hashParts[1]);
					newState.sort = parseInt(hashParts[0]);
				} else if (hashParts.length == 3) {
					newState.pageIndex = parseInt(hashParts[2]);
					newState.resultIndex = (newState.pageIndex - 1) * this.resultsPerPage;
					newState.query = decodeURIComponent(hashParts[1]);
					newState.sort = parseInt(hashParts[0]);
				}
			}

			return newState;
		},
		getInitialState: function getInitialState() {
			var initialState = {
				query: '',
				spellcheckQuery: '',
				sort: 0,
				results: [],
				resultIndex: 0,
				pageIndex: 1, //1 indexed
				totalResults: -1,
				loadStatus: 'loaded',
				requestUpdate: false,
				forceUpdate: false,
				searchPerformed: false,
				accessibilityText: ''
			};

			initialState = this.getHashState(initialState);

			return initialState;
		},
		render: function render() {
			var searchInfoClass = this.state.totalResults === 0 ? 'search-info inactive' : 'search-info',
			    pageEndResultIndex = this.resultsPerPage + this.state.resultIndex,
			    endIndex = pageEndResultIndex < this.state.totalResults ? pageEndResultIndex : this.state.totalResults;

			return React.createElement(
				'div',
				{ className: this.state.loadStatus },
				React.createElement(
					'h1',
					null,
					searchContent.title
				),
				React.createElement(SearchInput, { onSearchSubmit: this.onSearchSubmit, onSearchUpdate: this.onSearchUpdate, query: decodeURIComponent(this.state.query) }),
				React.createElement(NoResults, { query: decodeURIComponent(this.state.query), totalResults: this.state.totalResults }),
				React.createElement(SpellCheck, { onSpellCheckClick: this.onSpellCheckClick, spellcheckQuery: decodeURIComponent(this.state.spellcheckQuery) }),
				React.createElement(
					'div',
					{ className: searchInfoClass },
					React.createElement(ResultCount, { startIndex: this.state.resultIndex + 1, endIndex: endIndex, totalResults: this.state.totalResults }),
					React.createElement(SortContainer, { totalResults: this.state.totalResults, sort: this.state.sort, sortOptions: this.sortOptions, onSortUpdate: this.onSortUpdate })
				),
				React.createElement(
					'div',
					{ className: 'loading-spinner' },
					React.createElement('img', { src: '/etc/designs/thrivent/mcs/clientlib-site/img/loading.gif' })
				),
				React.createElement(
					'div',
					{ className: 'sr-only', 'aria-live': 'polite' },
					this.state.accessibilityText
				),
				React.createElement(SearchResults, { totalResults: this.state.totalResults, results: this.state.results }),
				React.createElement(
					'div',
					{ className: searchInfoClass },
					React.createElement(ResultCount, { startIndex: this.state.resultIndex + 1, endIndex: endIndex, totalResults: this.state.totalResults }),
					React.createElement(Pagination, { onPageUpdate: this.onPageUpdate, pageIndex: this.state.pageIndex, pageCount: Math.ceil(this.state.totalResults / this.resultsPerPage) })
				)
			);
		}
	});

	var init = function init() {
		React.render(React.createElement(SearchContainer, null), $('.react-search').get(0));
	};

	init();
}; //end search module

$(function () {
	if ($('.search-page').length) {
		thv.mcs.search();
	}

	$('#main-nav .nav-search .navbar-right').on('submit', function (e) {
		var curr = $(this),
		    searchLink = curr.find('a').attr('href'),
		    val = encodeURIComponent($(this).find('.form-control').val());

		e.stopPropagation();
		e.preventDefault();

		if (val.toLowerCase() !== 'search') {
			_satellite.setVar('internalSearchKeyword', val);
			_satellite.track('trackInternalSearch');
			window.location = searchLink + '#' + val;
		}
	});
});
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.forms = function(){


  function init() {
    var firstAccordion = $('.accordion').first();
    firstAccordion.find('h4.panel-title a').attr('aria-expanded', 'true').removeClass('collapsed');
    firstAccordion.find('.panel-collapse').addClass('in');
  }
  init();
  
}

$(document).ready(function(){
  if($('.accordion').length) {
      //thv.mcs.forms();
  }
});
    
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.leadGen = (function(){
    function initHappyJs(){
        (function happyJS($) {
            function trim(el) {
                return (''.trim) ? el.val().trim() : $.trim(el.val());
            }
            $.fn.isHappy = function isHappy(config) {
                var fields = [], item;
                var pauseMessages = false;

                function isFunction(obj) {
                    return !!(obj && obj.constructor && obj.call && obj.apply);
                }
                function defaultError(error) { //Default error template
                    var msgErrorClass = config.classes && config.classes.message || 'unhappyMessage';
                    return $('<span id="' + error.id + '" class="' + msgErrorClass + '" role="alert">' + error.message + '</span>');
                }
                function getError(error) { //Generate error html from either config or default
                    if (isFunction(config.errorTemplate)) {
                        return config.errorTemplate(error);
                    }
                    return defaultError(error);
                }
                function handleSubmit() {
                    var  i, l;
                    var errors = false;
                    for (i = 0, l = fields.length; i < l; i += 1) {
                        if (!fields[i].testValid(true)) {
                            errors = true;
                        }
                    }
                    if (errors) {
                        if (isFunction(config.unHappy)) config.unHappy();
                        return false;
                    } else if (config.testMode) {
                        if (isFunction(config.happy)) return config.happy();
                        if (window.console) console.warn('would have submitted');
                        return false;
                    }
                    if (isFunction(config.happy)) return config.happy();
                }
                function handleMouseUp() {
                    pauseMessages = false;
                }
                function handleMouseDown() {
                    pauseMessages = true;
                    $(window).one('mouseup', handleMouseUp);
                }
                function processField(opts, selector) {
                    var field;

                    if(typeof config.fieldScope !== 'undefined') field = config.fieldScope.find(selector);
                    else field = $(selector);
                    
                    var error = {
                        message: opts.message || '',
                        id: selector.slice(1) + '_unhappy'
                    };
                    var errorEl = $(error.id).length > 0 ? $(error.id) : getError(error);
                    var handleBlur = function handleBlur() {
                        if (!pauseMessages) {
                            field.testValid();
                        } else {
                            $(window).one('mouseup', field.testValid.bind(this));
                        }
                    };

                    fields.push(field);
                    field.testValid = function testValid(submit) {
                        var val, gotFunc, temp;
                        var el = $(this);
                        var errorTarget = (opts.errorTarget && $(opts.errorTarget)) || el;
                        var error = false;
                        var required = !!el.get(0).attributes.getNamedItem('required') || opts.required;
                        var password = (field.attr('type') === 'password');
                        var arg = isFunction(opts.arg) ? opts.arg() : opts.arg;
                        var fieldErrorClass = config.classes && config.classes.field || 'unhappy';

                        // handle control groups (checkboxes, radio)
                        if (el.length > 1) {
                          val = [];
                          el.each(function(i,obj) {
                            val.push($(obj).val());
                          });
                          val = val.join(',');
                        } else {
                          // clean it or trim it
                          if (isFunction(opts.clean)) {
                              val = opts.clean(el.val());
                          } else if (!password && typeof opts.trim === 'undefined' || opts.trim) {
                              val = trim(el);
                          } else {
                              val = el.val();
                          }

                          // write it back to the field
                          el.val(val);
                        }

                        // get the value
                        gotFunc = ((val.length > 0 || required === 'sometimes') && isFunction(opts.test));

                        // check if we've got an error on our hands
                        if (submit === true && required === true && val.length === 0) {
                            error = true;
                        } else if (gotFunc) {
                            error = !opts.test(val, field, arg);

                        }

                        if (field.is(':visible') && error) {
                            var
                              messageOverride = field.data().messageOverride,
                              errorParent = field.data().errorParent;

                            if(typeof messageOverride !== 'undefined') errorEl.text(messageOverride);
                            if(typeof errorParent !== 'undefined') {
                              errorTarget.addClass(fieldErrorClass);
                              field.parent().after(errorEl);
                            }
                            else errorTarget.addClass(fieldErrorClass).after(errorEl);
                            return false;
                        } else {
                            temp = errorEl.get(0);
                            // this is for zepto
                            if (temp.parentNode) {
                                temp.parentNode.removeChild(temp);
                            }
                            errorTarget.removeClass(fieldErrorClass);
                            return true;
                        }
                    };
                    //field.bind(opts.when || config.when || 'blur', handleBlur);
                }

                for (item in config.fields) {
                    if($(item).length > 0) processField(config.fields[item], item);
                }

                $(config.submitButton || this).bind('mousedown', handleMouseDown);

                if (config.submitButton) {
                    $(config.submitButton).click(handleSubmit);
                } else {
                    this.bind('submit', handleSubmit);
                }
                return this;
            };
        })(this.jQuery || this.Zepto);
    }

    function initLeadValidation(elem){
            elem.isHappy({
                fieldScope: elem,
                fields: {
                    '#newsletter-email': {
                        required: 'sometimes',
                        test: function(val, field){
                            var isValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);

                            if(isValid) return true;
                            else if(val.length == 0) {
                                field.data().messageOverride = elem.find('#newsletter-email').attr('data-error-req');
                                return false;
                            }
                            else {
                                field.data().messageOverride = elem.find('#newsletter-email').attr('data-error-inv');
                                return false;
                            }
                        },
                        message: ''
                    },
                    '#newsletter-agree': {
                        required: 'sometimes',
                        test: function(val, field){
                            if(field.find(':checked').length == 0) {
                                field.data().messageOverride = elem.find('#newsletter-agree').attr('data-error-req');
                                return false;
                            }
                            else return true;
                        },
                        message: ''
                    }
                },
                classes: {
                    field: 'not-valid',
                    message: 'not-valid-message'
                },
                submitButton: $('#nudge .btn-primary'),
                happy: function() {
                    $('.thv-container').removeClass('errors-present');
                    var inner = $('#nudge .inner'), entry = $('#nudge .sub-entry'), error = $('#nudge .sub-error'), success = $('#nudge .sub-success'), duplicate = $('#nudge .sub-duplicate');
                    entry.hide();
                    var cta = atob($($(".lead-gen")[0]).data("lead-gen"));
                    $.ajax({
                      type: 'get',
                      url: cta,
                      crossDomain: true,
                      data: {
                        "referralurl": window.location.href,
                        "userid": Cookies.get('s_fid'),
                        "name": $('#newsletter-name').val(),
                        "email": $('#newsletter-email').val()
                      },
                      dataType: 'json',
                      beforeSend: function(){
                        inner.addClass('lead-loader-light');
                        entry.hide();
                        error.hide();
                      },
                      success: function(response, status, jqXHR) {
                        error.hide();

                        var status = response.subscriber[0].status;

                        if(status == 'duplicate'){
                            inner.removeClass('lead-loader-light');
                            duplicate.show();
                        }
                        else if(status == 'fail'){
                            inner.removeClass('lead-loader-light');
                            error.show();
                        }
                        else{
                            inner.removeClass('lead-loader-light');
                            success.show();
                            sessionStorage.setItem('subscribed','true');
                        }
                      },
                      error: function (jqXHR, status, err) {
                        entry.show();
                        error.show();
                        console.log(err);
                      }
                    });
                    return false;
                },
                unHappy: function(){
                    if($('.not-valid:visible').length > 0) elem.addClass('errors-present');
                    else elem.removeClass('errors-present');
                }
            });
    }

    function initLeadValidationRail(elem){
            elem.isHappy({
                fieldScope: elem,
                fields: {
                    '#newsletter-email-rail': {
                        required: 'sometimes',
                        test: function(val, field){
                            var isValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);

                            if(isValid) return true;
                            else if(val.length == 0) {
                                field.data().messageOverride = elem.find('#newsletter-email-rail').attr('data-error-req');
                                return false;
                            }
                            else {
                                field.data().messageOverride = elem.find('#newsletter-email-rail').attr('data-error-inv');
                                return false;
                            }
                        },
                        message: ''
                    },
                    '#newsletter-agree-rail': {
                        required: 'sometimes',
                        test: function(val, field){
                            if(field.find(':checked').length == 0) {
                                field.data().messageOverride = elem.find('#newsletter-agree-rail').attr('data-error-req');
                                return false;
                            }
                            else return true;
                        },
                        message: ''
                    }
                },
                classes: {
                    field: 'not-valid',
                    message: 'not-valid-message'
                },
                submitButton: $('.rightRail .toggle-content .btn-primary'),
                happy: function() {
                    $('.thv-container').removeClass('errors-present');
                    var inner = $('.rightRail .inner'), entry = $('.rightRail .sub-entry'), error = $('.rightRail .sub-error'), success = $('.rightRail .sub-success'), duplicate = $('.rightRail .sub-duplicate'), toggle = $('.toggle-content');
                    entry.hide();
                    var cta = atob($($(".lead-gen")[0]).data("lead-gen"));
                    $.ajax({
                      type: 'get',
                      url: cta,
                      crossDomain: true,
                      data: {
                        "referralurl": window.location.href,
                        "userid": Cookies.get('s_fid'),
                        "name": $('#newsletter-name-rail').val(),
                        "email": $('#newsletter-email-rail').val()
                      },
                      dataType: 'json',
                      beforeSend: function(){
                        inner.addClass('lead-loader-dark');
                        toggle.hide();
                        entry.hide();
                        error.hide();
                      },
                      success: function(response, status, jqXHR) {
                        error.hide();

                        var status = response.subscriber[0].status;

                        if(status == 'duplicate'){
                            inner.removeClass('lead-loader-dark');
                            entry.hide();
                            toggle.hide();
                            error.hide();
                            duplicate.show();
                        }
                        else if(status == 'fail'){
                            inner.removeClass('lead-loader-dark');
                            entry.hide();
                            error.show();
                            toggle.hide();
                        }
                        else{
                            inner.removeClass('lead-loader-dark');
                            entry.hide();
                            error.hide();
                            toggle.hide();
                            success.show();
                            sessionStorage.setItem('subscribed','true');
                        }
                      },
                      error: function (jqXHR, status, err) {
                        inner.removeClass('lead-loader-dark');
                        entry.show();
                        error.show();
                        toggle.hide();
                        console.log(err);
                      }
                    });
                    return false;
                },
                unHappy: function(){
                    if($('.not-valid:visible').length > 0) elem.addClass('errors-present');
                    else elem.removeClass('errors-present');
                }
            });
    }

    function initLeadValidationFull(elem){
            elem.isHappy({
                fieldScope: elem,
                fields: {
                    '#newsletter-email-full': {
                        required: 'sometimes',
                        test: function(val, field){
                            var isValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);

                            if(isValid) return true;
                            else if(val.length == 0) {
                                field.data().messageOverride = elem.find('#newsletter-email-full').attr('data-error-req');
                                return false;
                            }
                            else {
                                field.data().messageOverride = elem.find('#newsletter-email-full').attr('data-error-inv');
                                return false;
                            }
                        },
                        message: ''
                    },
                    '#newsletter-agree-full': {
                        required: 'sometimes',
                        test: function(val, field){
                            if(field.find(':checked').length == 0) {
                                field.data().messageOverride = elem.find('#newsletter-agree-full').attr('data-error-req');
                                return false;
                            }
                            else return true;
                        },
                        message: ''
                    }
                },
                classes: {
                    field: 'not-valid',
                    message: 'not-valid-message'
                },
                submitButton: $('.fullWidth .lead-gen .entry.btn-primary'),
                happy: function() {
                    $('.thv-container').removeClass('errors-present');
                    var container = $('.lead-gen'), entry = $('.fullWidth .sub-entry'), error = $('.fullWidth .sub-error'), success = $('.fullWidth .sub-success'), duplicate = $('.fullWidth .sub-duplicate'), toggle = $('.toggle-content');
                    entry.hide();
                    var cta = atob($(".fullWidth .lead-gen").data("lead-gen"));
                    $.ajax({
                      type: 'get',
                      url: cta,
                      crossDomain: true,
                      data: {
                        "referralurl": window.location.href,
                        "userid": Cookies.get('s_fid'),
                        "name": $('#newsletter-name-full').val(),
                        "email": $('#newsletter-email-full').val()
                      },
                      dataType: 'json',
                      beforeSend: function(){
                        container.addClass('lead-loader-light');
                        entry.hide();
                        error.hide();
                        window.scrollTo(0,0);
                      },
                      success: function(response, status, jqXHR) {
                        error.hide();
                        //entry.hide();

                        var status = response.subscriber[0].status;

                        if(status == 'duplicate'){
                            container.removeClass('lead-loader-light');
                            entry.hide();
                            toggle.hide();
                            error.hide();
                            duplicate.show();
                        }
                        else if(status == 'fail'){
                            container.removeClass('lead-loader-light');
                            entry.hide();
                            error.show();
                            toggle.hide();
                        }
                        else{
                            container.removeClass('lead-loader-light');
                            entry.hide();
                            error.hide();
                            toggle.hide();
                            success.show();
                            sessionStorage.setItem('subscribed','true');
                        }
                      },
                      error: function (jqXHR, status, err) {
                        container.removeClass('lead-loader-light');
                        entry.show();
                        error.show();
                        toggle.hide();
                        console.log(err);
                      }
                    });
                    return false;
                },
                unHappy: function(){
                    if($('.not-valid:visible').length > 0) elem.addClass('errors-present');
                    else elem.removeClass('errors-present');
                }
            });
    }

    return {
        init: function(elem){
            initHappyJs();
            initLeadValidation(elem);
            initLeadValidationRail(elem);
            initLeadValidationFull(elem);
        }
    }
})();

$(function(){
    //$('.lead-gen').each(function(){
    if($('.lead-gen').length > 0){
        thv.mcs.leadGen.init($(this));

        $('.rightRail .lead-gen .toggle-trigger').click(function(e){
            e.preventDefault();
            $('.rightRail .sub-entry').hide();
            $('.rightRail .toggle-content').toggleClass('show-toggle-content');
            $('.rightRail .toggle-content').slideToggle();
        });

        $('#nudge .toggle-trigger').click(function(e){
            e.preventDefault();
            $(this).toggleClass('toggle-on')
            $('#nudge .toggle-content').toggleClass('show-toggle-content');
            $('#nudge .toggle-content').slideToggle();
        });
    }
});
var thv = thv || {};
thv.mcs = thv.mcs || {};
thv.mcs.categoryNav = function(){
  function changeLink() {
    $('select.category-navigation').on('change',function(e) {
      var selected = this.value;
      window.open(selected,'_self');
    });
  }
  function init() {
    changeLink();
  }
  init();
};
$(document).ready(function() {
  if ($('.category-navigation').length) {
    thv.mcs.categoryNav();
  }
});
