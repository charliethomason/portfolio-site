+function ($) {
  var thv = thv || {};
  thv.mcs = thv.mcs || {};
  thv.mcs.mainNav = function(){
    /*!
     * JavaScript Cookie v2.0.0-pre
     * https://github.com/js-cookie/js-cookie
     *
     * Copyright 2006, 2015 Klaus Hartl 
     * Released under the MIT license
     */
    (function (factory) {
      if (typeof define === 'function' && define.amd) {
        define(factory);
      } else if (typeof exports === 'object') {
        module.exports = factory();
      } else {
        var _OldCookies = window.Cookies;
        var api = window.Cookies = factory(window.jQuery);
        api.noConflict = function () {
          window.Cookies = _OldCookies;
          return api;
        };
      }
    }
    (function () {
      function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
          var attributes = arguments[ i ];
          for (var key in attributes) {
            result[key] = attributes[key];
          }
        }
        return result;
      }

      function init (converter) {
        function api (key, value, attributes) {
          var result;

          // Write

          if (arguments.length > 1) {
            attributes = extend({
              path: '/'
            }, api.defaults, attributes);

            if (typeof attributes.expires === 'number') {
              var expires = new Date();
              expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
              attributes.expires = expires;
            }

            try {
              result = JSON.stringify(value);
              if (/^[\{\[]/.test(result)) {
                value = result;
              }
            } catch (e) {}

            value = encodeURIComponent(String(value));
            value = value.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

            key = encodeURIComponent(String(key));
            key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
            key = key.replace(/[\(\)]/g, escape);

            return (document.cookie = [
              key, '=', value,
              attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
              attributes.path    && '; path=' + attributes.path,
              attributes.domain  && '; domain=' + attributes.domain,
              attributes.secure  && '; secure'
            ].join(''));
          }

          // Read

          if (!key) {
            result = {};
          }

          // To prevent the for loop in the first place assign an empty array
          // in case there are no cookies at all. Also prevents odd result when
          // calling "get()"
          var cookies = document.cookie ? document.cookie.split('; ') : [];
          var rdecode = /(%[0-9A-Z]{2})+/g;
          var i = 0;

          for (; i < cookies.length; i++) {
            var parts = cookies[i].split('=');
            var name = parts[0].replace(rdecode, decodeURIComponent);
            var cookie = parts.slice(1).join('=');

            if (cookie.charAt(0) === '"') {
              cookie = cookie.slice(1, -1);
            }

            cookie = converter && converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

            if (this.json) {
              try {
                cookie = JSON.parse(cookie);
              } catch (e) {}
            }

            if (key === name) {
              result = cookie;
              break;
            }

            if (!key) {
              result[name] = cookie;
            }
          }

          return result;
        }

        api.get = api.set = api;
        api.getJSON = function () {
          return api.apply({
            json: true
          }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
          api(key, '', extend(attributes, {
            expires: -1
          }));
        };

        api.withConverter = init;

        return api;
      }

      return init();
    }));

    function init() {
      var clicks = 0;
      var dropToggle = (function(){
        if($(window).width()>767) {
          if($('#main-nav').css('position') == 'fixed'){
            $('#main-nav').parent().addClass('tabletFixed');
          } else {
            $('.tabletFixed').removeClass('tabletFixed');
          }
          $('.dropdown-toggle').attr('data-toggle','dropdown').removeClass('disabled');

          $('.dropdown-toggle').on('mouseover mouseout', function() {
            $(this).dropdown('toggle');
          });

          $('.tier1').on('mouseleave', function() {
            if($("#CQ").length) {

            } else {
              t = setTimeout(function() {
                $('.dropdown.open a.dropdown-toggle').attr('data-toggle', 'dropdown').blur();
                $('.dropdown.open').removeClass('open');
              }, 100);
            }
          });
          $('body').click(function(e){
            if($('#CQ').length){
              $('.dropdown.open a.dropdown-toggle').attr('data-toggle', 'dropdown').blur();
              $('.dropdown.open').removeClass('open');
            }
          });

          $('.dropdown-toggle').click(function(e){
            e.preventDefault();
              if(clicks === 0){
                  $(this).dropdown('toggle');
                  ++clicks;
              }else{
                  location.href = $(this).attr('href');
                  clicks = 0;
              }
          });
          $('.dropdown.half').on('show.bs.dropdown', function(){
            $(this).find('.dropdown-menu').width(($(window).width())/2);
          });
          $('.dropdown.fullNav').on('show.bs.dropdown', function(){
            width = $(window).width();
            containerWidth = $('.header-wrapper').width();
            containerPad = parseInt($('.header-wrapper').css('padding-left'));
            totalWidth = containerWidth + containerPad;
            $(this).find('.dropdown-menu').width(totalWidth);
            leftMargin = ((width - totalWidth)/2) - (containerPad/2);
            $(this).find('.dropdown-menu').css('left', leftMargin);
          });
        } else {
          $('.dropdown-toggle').removeAttr('data-toggle').addClass('disabled');
          $(this).find('.dropdown-menu').css('left', '');
        }
      });

      var svgView = (function(){
        var domain = window.location.hostname.split('.');
        var subdomain = domain[0];
        var server = domain[1];
        var url = 'https://web.' + server + '.thriventfunds.com';
        if (server == undefined){
          url = 'http://localhost:4502';
        }
        if (subdomain == 'www' && server == 'thriventfunds') {
          url = 'https://www.thriventfunds.com';
        }
        if (subdomain == 'customer' && server == 'thriventfunds') {
          url = 'https://www.thriventfunds.com';
        }
        function getAndroidVersion(ua) {
            ua = (ua || navigator.userAgent).toLowerCase(); 
            var match = ua.match(/android\s([0-9\.]*)/);
            return match ? match[1] : false;
        };
        if(parseFloat(getAndroidVersion()) < 4.5){
          $("body").addClass("android");
        }
        if($(window).width()>980 && (!$('#main-nav').hasClass('affix'))) {
          $('.navbar-logo').attr('src', url + '/etc/designs/thrivent/shared/clientlib-site/img/logo-d.svg');
        } else if ($(window).width()>980 && $('#main-nav').hasClass('affix')){
          $('.navbar-logo').attr('src', url + '/etc/designs/thrivent/shared/clientlib-site/img/logo-da.svg');
        } else if ($(window).width()>767 && $(window).width()<980){
          $('.navbar-logo').attr('src', url + '/etc/designs/thrivent/shared/clientlib-site/img/logo-d.svg');
        } else if ($(window).width()<480){
          $('.navbar-logo').attr('src', url + '/etc/designs/thrivent/shared/clientlib-site/img/logo-m.svg');
        }
      });
      var offCanvas = (function(){
        if($('#main-nav .navbar-toggle').css('display')== 'block') {
          var oc_height = 'height:' + $("body").height() + 'px !Important';
          $('.navbar-collapse').css({'max-height':($("body").height()+'px')});
          $('.navbar-collapse').attr('style', oc_height);
          $('.navbar-collapse').attr('role', 'menubar');
          $('.disabled').removeAttr('role').removeAttr('aria-haspopup').removeAttr('aria-expanded');
          $('.disabled').attr('role', 'menubar');
          $('#main-nav .header').attr('role', 'menuitem');
        } else {
          $('.navbar-collapse').css('height', ' ');
          $('.navbar-collapse').css('max-height', 100+'px');
        }
      });

      $('.navbar-collapse').on('show.bs.collapse', function () {
        var oc_height = 'height:' + $("body").height() + 'px !Important';
        $('.navbar-collapse').attr('style', oc_height);
        $('.navbar-collapse').css({'max-height':($("body").height()+'px')});
        //$('.navbar-collapse').css({'height':($("body").height()+'px')});
        $('.navbar-collapse').css('margin-left', '0%');
        $('body .header + div, .footer, .thv-container, .shared-footer').addClass('off');
      })
      $('.navbar-collapse').on('hide.bs.collapse', function () {
        $('.navbar-collapse').css('margin-left', '');
        $('.navbar-collapse').css('width', '84% !Important');
      })
      $('.navbar-collapse').on('hidden.bs.collapse', function () {
        $('.navbar-collapse').css('width', '84%');
        $('body .header + div, .footer, .thv-container, .shared-footer').removeClass('off');
      })
      // $('.dropdown.full').on('show.bs.dropdown', function(){
      //   $(this).find('.dropdown-menu').width($('.header-wrapper').width());
      // });
      $('.dropdown').on('show.bs.dropdown', function () {
        $('.special .dropdown.open').removeClass('open').find('a.dropdown-toggle').attr('data-toggle', 'dropdown');
        $(this).siblings('.open').removeClass('open').find('a.dropdown-toggle').attr('data-toggle', 'dropdown');
        $(this).find('a.dropdown-toggle').removeAttr('data-toggle');
        if ('ontouchstart' in document.documentElement) {
          clicks = 0;
        } else {
          clicks = 1;
        }
      });
      $('.special .dropdown').on('show.bs.dropdown', function () {
        $('.menu-items .dropdown.open').removeClass('open').find('a.dropdown-toggle').attr('data-toggle', 'dropdown');
        $(this).find('a.dropdown-toggle').removeAttr('data-toggle');
        if ('ontouchstart' in document.documentElement) {
          clicks = 0;
        } else {
          clicks = 1;
        }
      });
      var resizeReady,
      width = document.documentElement.clientWidth,
      height = document.documentElement.clientHeight;
      $(window).resize(function() {
        if($(window).width() != width && $(window).height() != height){
          clearTimeout(resizeReady);
          resizeReady = setTimeout(function() {
            dropToggle();
            desktopAffix();
            moveCTA();
            svgView();
            offCanvas();
            phoneClick();
            if ($(window).width() > 767) {
              $('.dropdown.half.open').find('.dropdown-menu').width(($(window).width())/2);
              if ($('.navbar-collapse').hasClass('in')) {
                $('.navbar-collapse').removeClass('in').css('height','').attr('aria-expanded','false');
                $('.navbar-toggle').addClass('collapsed').attr('aria-expanded','false');
                $('body #main-nav .header + div, .footer').removeClass('off');
              }
            }
          }, 500);
        }
      });
      var closeMenu = (function(event){

            $("button.navbar-toggle").click();

        $('.dropdown.open a.dropdown-toggle').attr('data-toggle', 'dropdown').blur();
        $('.dropdown.open').removeClass('open').find('a.dropdown-toggle').attr('data-toggle', 'dropdown');
      });
      /** Close search on desktop */
      var closeSearch = (function(evt) {
        if (!$(evt.target).is($('.searchText', '#main-nav li.nav-search')) && !$(evt.target).is($('input', '#main-nav li.nav-search'))  && !$(evt.target).is($('.icon', '#main-nav li.nav-search'))) {
          $('form').removeClass('open');
          $('input', '#main-nav li.nav-search').blur();
        }
      });
      var closeThings = (function(event){
        closeSearch(event);
        closeMenu(event);
      });
      var phoneClick = (function(){
        if (window.innerWidth > 980){
          $('.phone').bind('click', false);
        }
      });
      /** Close search on scroll */
      $(window).on('scroll click', closeSearch);
      $(".off").on('click touchstart', closeThings);

      /** Clicking the icon for searching */
      $("#main-nav li.nav-search form .icon, #main-nav li.nav-search .searchText").on("click", function(e) {
        e.preventDefault();
        if(!$('#main-nav').hasClass('affix') && $(window).width() > 979) {
          var searchCont = $("form");
          //console.log('not-link');
          if (!searchCont.hasClass("open")) {
            searchCont.addClass("open");

            // IFFE places cursor on input field when revealed 
              (function(){
                var searchInput = $("#main-nav .utility ul li.nav-search .open .form-group .form-control");
                searchInput.focus();
              })();

          } else {
            searchCont.removeClass("open");
          }
        } else { 
          //console.log('link');
          window.location.href = $(this).parent('a').attr('href');
        }
      });

      var desktopAffix = function () {
        if(!$('.open-account .open-account-cta')){
          if($(window).width()>965) { 
            $('#main-nav').affix({
              offset: {
                top: 70
              }
            });
            setTimeout(moveToHash, 700);
          } else {
            $(window).off('.affix')
            $('#main-nav').removeData('bs.affix').removeClass('affix affix-top affix-bottom')
          }
        } else { // the open account CTA is too big for the header below 1035, this is setup to push the sticky nav to a higher resolution.
          if($(window).width()>1035) { 
            $('#main-nav').affix({
              offset: {
                top: 70
              }
            });
            setTimeout(moveToHash, 700);
          } else {
            $(window).off('.affix')
            $('#main-nav').removeData('bs.affix').removeClass('affix affix-top affix-bottom')
          }
        }
      };

      var moveCTA = function() {
        if(!$('#main-nav').hasClass('auth') && $(window).innerWidth()<768){
          if(!$('.navbar-header .special.open-account').length){
            $('.special.open-account').detach().appendTo('.navbar-header');
          }
        } else {
          if(!$('.main.nav div .special.open-account').length){
            $('.navbar-header .special.open-account').detach().insertBefore('.special.login');
          }
        }
      }

      /*! set click for alerts */
      $('.alert').on('click tap', function(event){
        if($(this).find('.alert-link').data('alert-link') != undefined){
          window.location = $(this).find('.alert-link').data('alert-link');
        }
      });
      $('.alert').on('mouseenter', function(event){
        if($(this).find('.alert-link').data('alert-link') != undefined){
          $(this).toggleClass('hover');
        }
      });
      $('.alert').on('mouseleave', function(event){
        if($(this).find('.alert-link').data('alert-link') != undefined){
          $(this).toggleClass('hover');
        }
      });
      $('button.close').click(function(event){
        event.stopPropagation();
        $(this).closest('.alert').alert('close');
        var id = String($(this).closest('.alert').data('alert-id'));
        Cookies.set(id, 'closed')
      })
      /*! cookie handling for alerts */
      var alertCookie = function () {
        if($('.cq-wcm-preview, .cq-wcm-edit').length){
          $('.alert').each(function(){
            var status = String($(this).data('alert-enabled'));
            if(status == 'true'){
              $(this).removeClass('false').addClass('true');
            }
          });
        } else {
          $('.alert').each(function(){
            var id = String($(this).data('alert-id'));
            var status = String($(this).data('alert-enabled'));
            if(Cookies.get(id) == null && status == 'true'){
              Cookies.set(id, 'open');
              $(this).removeClass('false').addClass('true');
            } else {
              Cookies.set(id, 'closed');
              $(this).removeClass('true').addClass('false');
            }
          });
        }
      }
      /*! alert padding for tablet */
      // var alertTablet = function () {
      //   var mcPad = 0;
      //   if (window.innerWidth < 980 && window.innerWidth > 767){
      //     $('.alert.true').each(function(){
      //       mcPad = mcPad + parseInt($(this).css('height'));
      //     });
      //   $('#main-content').css('padding-top', mcPad+'px');
      //   } else {
      //     $('#main-content').css('padding-top', '');
      //   }
      // };

      function moveToHash() {
        var urlHash = window.location.hash;
        if (urlHash) {
          //console.log('move');
          window.location = urlHash;
        }
      };

      // Cost Basis link conditional show/hide
      function costBasisShow() {
        var isLteIE9 = /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
        var $costBasisLink = $('#main-nav .main .dropdown-menu a#cost-basis');
        var $sharedHeader = $('.shared-header');
        var APIData = JSON.parse(sessionStorage.getItem('thv-api-data'));

        // IF not on IE9 or below AND on the MCS site (shared-header doesn't exist)
        if (!isLteIE9 && !$sharedHeader.length) {

          // IF sessionStorage 'thv-api-data' JSON data not null AND 'costbasis' variable is defined AND 'costbasis' is set to true
          if (APIData != null && APIData.portfolio.costbasis != 'undefined' && APIData.portfolio.costbasis == 'true') {
            $costBasisLink.css('display','block');
          }

        // IF on the CT or NASU sites (shared-header exists)
        } else if ($sharedHeader.length) {
          // test for NS so it doesnt break other environments
          if (typeof NS == "undefined") {

          } else 
            // IF 'NS.PORTFOLIO' object is defined AND 'viewcostbasistatus' variable is defined AND 'viewcostbasistatus' is set to true
            if (typeof NS.PORTFOLIO != 'undefined' && typeof NS.PORTFOLIO.viewcostbasistatus != 'undefined' && NS.PORTFOLIO.viewcostbasistatus == true) {
            $costBasisLink.css('display','block');
          }
        }
      }

      alertCookie();
      dropToggle();
      svgView();
      offCanvas();
      phoneClick();
      desktopAffix();
      moveCTA();
      costBasisShow();
    }
    init();

    //function for getting the data containing "data-param"
    function getData(elm){
      var dataArray = [];
      var data = elm.data();
      for (var key in data) {
          if (key.indexOf("param") >=0) {
              var arr = key.split('param');
              var par = arr[1].toLowerCase();
              //console.log(par);
              dataArray.push([par, data[key]]);
          }
      }
      return dataArray;
    };
    var tidx; //added by gs nov 30

    var toCT;
    var env = location.host;
    var fweb = 'FANWebTest'
    if(env == 'web.dev.thriventfunds.com'){
      toCT = 'customer.dev.thriventfunds.com'
    }
    else if(env == 'web.int.thriventfunds.com' || env == 'customer.int.thriventfunds.com' || env == 'web.qa.thriventfunds.com'){
      toCT = 'customer.int.thriventfunds.com'
    }
    else if(env == 'web.stg.thriventfunds.com' || env == 'customer.stg.thriventfunds.com'){
      toCT = 'customer.stg.thriventfunds.com';
      fweb = 'FANWeb';
    }
    else{
      toCT = 'customer.thriventfunds.com';
      fweb = 'FANWeb';
    }

    var LoginPOC = (function(){
      var login = $('#main-nav .login a'), href, dataPost;
      var portfolioTab = $("#main-nav .portfolio-tab");

      href = login.attr('href');
      dataPost = login.data('post');      

      var dataArray = getData(login);
//      console.log(dataArray);

      if (dataPost) {formMethod = 'POST';}
      else formMethod = 'GET';

      return{
        init: function(){
          isActive = Cookies.get('active_fanweb');
          isAuth = Cookies.get('auth_fanweb');
          this.toggleButton();


          login.on('click', function(e){
            e.preventDefault();

            var loginForm = $('<form>', {
              "id": "loginForm",
              "method": formMethod,
              "action": href 
            });

            var dataNum = dataArray.length;
            for (var i = 0; i < dataNum; i++) {
              loginForm.append($('<input>', {
                'name': dataArray[i][0],
                'value': dataArray[i][1],
                'type': 'hidden'
                }));
            }

//            console.log(loginForm);
            loginForm.appendTo('body').submit();

          });
        },
        setTidx: function(){
          $.ajax({

            url: 'https://' + location.host + '/bin/thv/services/tidx-cookie',
            dataType: 'json',
            type: 'POST',
            success: function(obj, success) {
              tidx = obj["cookie-tidx"];
              $('#tidx').val(tidx);
              if(tidx != "undefined" && tidx != "tidx-not-initialized"){
                if(sessionStorage.getItem('tidx') == null){
                  sessionStorage.setItem('tidx',tidx);
                }
                this.getUserInfo(tidx,obj);
              }else{
                console.log("unable to getUserInfo, tidx undefined or not initialized");
              }
            }.bind(this)
          });
        },
        getUserInfo: function(tidx,data){
          hasFund();
          if(sessionStorage.getItem('thv-api-data') == null){
            $.ajax({
              url: href,
              dataType: 'json',
              type: 'POST',
              xhrFields: {
                withCredentials: true 
              },
              data: {
                cz: $('.special.login a').data('param-cz'),
                tidx: tidx,
                tx: 'MFAccountPosition',
                portfolio: '1',
                reloadForm: 'true',
                rzfformat: 'json'
              },
              success: function(obj, success) {
                sessionStorage.setItem('thv-api-data', JSON.stringify(obj));
                hasFund();
              },
              error: function(jqXHR, status, err){
                console.log(err);
              }
            });
          }
        },
        toggleButton: function(){
          if(typeof isActive === "undefined" || typeof isAuth == "false" || typeof isAuth === "undefined" || typeof isActive == "false"){
            $('#main-nav .portfolio-tab').hide();
            $('#main-nav .login').show();
            $('#main-nav').removeClass('auth');
            $('#main-nav .login a').show();
            $('#main-nav .open-account a').show();
          }
          else{
            $('#main-nav .login').hide();
            $('#main-nav .portfolio-tab').show();
            $('#main-nav').addClass('auth');
            $('#main-nav .open-account a').hide();
            this.setTidx();
          }
        }
      }
    })();

    setTimeout(function(){LoginPOC.init()}, 500);

    function hasFund(){
      var preAPIData = sessionStorage.getItem('thv-api-data');
      var APIData = JSON.parse(preAPIData);
      var tickerArr = {};
      tickerArr[0] = [];
      if(APIData){
        for(var u=0; u < APIData.accounts.length - 1; u++){
          for(var j=0; j < APIData.accounts[u].funds.length - 1; j++){
            var tickerSym = APIData.accounts[u].funds[j].ticker;
            tickerArr[0].push(tickerSym);
          }
        }
        sessionStorage.setItem('thv-funds', JSON.stringify(tickerArr));
      }
    };

    var cz = $('.special.login a').data('param-cz');

    var LogoutPOC = (function(){
      
      var logout = $('#main-nav .portfolio-tab .menu-items .dropdown-menu a.header:last-of-type'), href, dataPost;
      tidx = $("input[name='tidx']").val();
      // var tidx = $('#tidx').val();

      href = logout.attr('href');
      dataPost = logout.data('post');      

      var dataArray = getData(logout);
//      console.log(dataArray);

      if (dataPost) {formMethod = 'POST';}
      else formMethod = 'GET';

      return{
        init: function(){

          logout.on('click', function(e){
            e.preventDefault();

            /*
            var logoutForm = $('<form>', {
              "id": "logoutForm",
              "method": formMethod,
              "action": href 
            });

            var dataNum = dataArray.length;
            for (var i = 0; i < dataNum; i++) {
              logoutForm.append($('<input>', {
                'name': dataArray[i][0],
                'value': dataArray[i][1],
                'type': 'hidden'
                }));
            }

            logoutForm.append($('<input>', {
              'name': 'tidx',
              'value': tidx,
              'type': 'hidden'
            }));
            
            // console.log(logoutForm);
            logoutForm.appendTo('body').submit();
            */
            
            dstnavigate('logout', {cz:cz,tidx:tidx},$(this).attr('href'));
          });
        }
      }

    })();

    var wMode;

    function checkTarget(targetVal){
      if(targetVal == '_blank'){
        return true;
      }
      else{
        return false;
      }
    }

    $('.nasu #collapse').bind('resize', function(event) {
        
    });


    $('.nav a.portfolio-toggle, a.portfolio-link, .view-portfolio').on('click', function(e){
      e.preventDefault();
      dstnavigate('portfolio', {cz:cz,tidx:tidx,newwindow:checkTarget($(this).attr('target'))},$(this).attr('href'));
    });

    $('.subitems a.profile, .sidebar a.profile').on('click', function(e){
      e.preventDefault();
      dstnavigate('profile', {cz:cz,tidx:tidx},$(this).attr('href'));
    });

    $('#statements').on('click', function(e){
      e.preventDefault();
      dstnavigate('statements', {cz:cz,tidx:tidx},$(this).attr('href'));
    });

    $('#historical-balance').on('click', function(e){
      e.preventDefault();
      dstnavigate('history', {cz:cz,tidx:tidx},$(this).attr('href'));
    });

    $('#bank-info').on('click', function(e){
      e.preventDefault();
      dstnavigate('banks', {cz:cz,tidx:tidx},$(this).attr('href'));
    });

    $('#cost-basis').on('click', function(e){
      e.preventDefault();
      dstnavigate('costbasis', {cz:cz,tidx:tidx},$(this).attr('href'));
    });

    $('li.open-account a, .open-account-cta').on('click', function(e){
      e.preventDefault();
      dstnavigate('nasu', {cz:cz,tidx:tidx,navoptions:'nasu',newwindow:checkTarget($(this).attr('target'))},$(this).attr('href'));
    });

    $('.fund-header-main-cta.btn-primary:not(.log-in-cta), .buy-button, .fund-overview-cta.buy-funds-cta').on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      var poptions = 'purchase|' + $(this).data('ticker') + '|shares';
      dstnavigate('purchase', {cz:cz,tidx:tidx,navoptions:poptions,newwindow:true},$(this).attr('href'));
    });


    LogoutPOC.init();
  
}

  $(document).ready(function() {
    thv.mcs.mainNav();

  });
}(jQuery);


