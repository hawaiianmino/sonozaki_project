var $ = require('jquery');
import Swiper from 'swiper/bundle';


// スライダー対応
const option = {
  loop: true,
  effect: 'fade',
  autoplay: {
  delay: 4000,
  disableOnInteraction: false,
  },
  speed: 1500,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
}

const swiper = new Swiper('.swiper',option);

$(function() {
  
  // ハンバーガーメニューの開閉処理
  const hamburgerOpen = () => {
    const $hamburgerBtn = $('.hamburger');
    const $headerMenu = $('.header-menu');
    const $body = $('body');
    let $navLink = $('a.nav-menu__link');
    let state = false;
    let pos;

    $hamburgerBtn.on('click',function() {
      $(this).toggleClass('active');
      $headerMenu.toggleClass('active');
      if(state == false) {
        pos = $(window).scrollTop();
        $body.addClass('fixed').css({'top': -pos});
        state = true;
      } else {
        $body.removeClass('fixed').css({'top': 0});
        window.scrollTo(0,pos);
        state = false;
      }
    });
    // メニュー内のリンクをクリックしたらSPメニューを閉じる
    $navLink.on('click', function() {
      $hamburgerBtn.removeClass('active');
      $headerMenu.removeClass('active');
      $body.removeClass('fixed').css({'top':0});
      state = false;
    });
  };

  // スムーススクロール対応
  const somoothScroll = () => {
    $('a[href^="#"]').on('click', function() {
      var adjust = -55;
      var speed = 400;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top + adjust;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
    })
  }

  // スクロールの途中でnavimenuを固定
  const naviFixed = () => {
    const $elemTop = $('.service').offset().top;
    const $header = $('.header');
    const $main = $('main');
    let scroll = $(window).scrollTop();
    let downMove = 'downmove';
    let blackLogo = '../img/logo-b.svg';
    let whiteLogo = '../img/logo-w-2.png';
    let $headerImage = $('.header-logo__img img');

    if(scroll >= $elemTop) {
      $header.addClass(downMove);
      // カクツキを防ぐためヘッダー分のマージンを挿入
      $main.addClass('adjust-margin');
      $headerImage.attr('src', blackLogo);
  
    } else {
      $header.removeClass(downMove);
      $main.removeClass('adjust-margin');
      $headerImage.attr('src', whiteLogo);
    }
  }

  
  var elemTop = [];
  function PositionCheck(){
    var headerH = $("#header").outerHeight(true);
    $(".scroll-point").each(function(i) {
      elemTop[i] =Math.round(parseInt($(this).offset().top-headerH));
    });
  }

  function ScrollAnime() {
    let scroll = Math.round($(window).scrollTop());
    let NavElem = $(".nav-menu__item");
    $(".nav-menu__item").removeClass('current');
    if(scroll >= 0 && scroll < elemTop[1]) {
        $(NavElem[0]).addClass('current');
      } else if(scroll >= elemTop[1] && scroll < elemTop[2]) {
        $(NavElem[1]).addClass('current');
      } else if(scroll >= elemTop[2] && scroll < elemTop[3]) {
        $(NavElem[2]).addClass('current');
      } else if(scroll >= elemTop[3] && scroll < elemTop[4]) {
        $(NavElem[3]).addClass('current');
      } else if(scroll >= elemTop[4] && scroll < elemTop[5]) {
        $(NavElem[4]).addClass('current');
      } else if(scroll >= elemTop[5]) {
        $(NavElem[5]).addClass('current');
    } 
  }

  // fedein Animation
  const fadeInAnime = () => {
    var windowHeight = $(window).height();
    var scroll_top = $(window).scrollTop();
  
    $('.js_fadein').each(function(i) {
      var targetPosition = $(this).offset().top;
      if(scroll_top >= targetPosition - windowHeight + 300) {
        $(this).addClass('is-fadein');
        // 要素が複数ある場合はタイミングを0.3秒ずらして表示
        if(window.matchMedia("(min-width: 767px)").matches) {
          $(this).delay(i * 300).queue(function() {
            $(this).addClass('is-fadein');
          });
        }
      }
    });
  }

  hamburgerOpen();
  somoothScroll();

  $(window).on('scroll', function() {
    naviFixed();
    PositionCheck();
    ScrollAnime();
    fadeInAnime();
  });

  $(window).on('load', function() {
    naviFixed();
    PositionCheck();
    ScrollAnime();
  });




});