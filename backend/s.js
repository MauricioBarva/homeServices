'use strict';
window.addEventListener('load', function() {

    var $window = $(window);
    var $posicionHeader = $('nav').offset().top;
    var $listado = $('.listado');
    $(document).ready(function() {
        $window.scroll(function() {

            if ($window.scrollTop() > $posicionHeader) {
                $('header').addClass('header-sticky');
            } else {
                $('header').removeClass('header-sticky');
            }
        });

        window.addEventListener('resize', function() {

            if (this.window.innerWidth <= 500) {
                $('.galeria-imagenes').find('img').eq(4).hide();
                $('.galeria-imagenes').find('img').eq(5).hide();
            }
            if (this.window.innerWidth > 500) {
                $('.galeria-imagenes').find('img').eq(4).show();
                $('.galeria-imagenes').find('img').eq(5).show();
            }
            if (this.window.innerWidth <= 750) {
                $('.galeria-imagenes').find('img').eq(2).hide();
                $('.galeria-imagenes').find('img').eq(3).hide();
            }
            if (this.window.innerWidth > 750) {
                $('.galeria-imagenes').find('img').eq(2).show();
                $('.galeria-imagenes').find('img').eq(3).show();
            }
            if (this.window.innerWidth <= 1200) {
                $('.galeria-imagenes').find('img').eq(1).hide();
                $('.galeria-imagenes').find('img').eq(0).hide();
            }
            if (this.window.innerWidth > 1200) {
                $('.galeria-imagenes').find('img').eq(1).show();
                $('.galeria-imagenes').find('img').eq(0).show();
            }
            if (this.window.innerWidth >= 900) {

                $('nav').show();

            }
            if (this.window.innerWidth <= 970) {
                $listado.find('li').eq(3).css({ 'padding-bottom': '30px' });
            }
            if (this.window.innerWidth <= 900) {

                $('nav').hide();

                $('nav').find('a').click(function() {
                    $('nav').hide();
                });

            }
            if (this.window.innerWidth <= 800) {
                $('.bx-caption').css('display', 'none');

            } else {
                $('.bx-caption').css('display', 'block');
            }

        });

        $('.btn-hamburguesa').click(function() {
            $('nav').slideToggle();
        });

        //Icono wsp
        $('.whatsapp-icon').click(function() {
            window.open('https://api.whatsapp.com/send?phone=573157544949');
        });

        //Scroll
        $('a[href *= \\#]').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname) {
                var $target = $(this.hash);
                $target = $target.length && $target || $("[name = '+this.hash.slice(1) + ']");
                if ($target.length) {
                    var targetOffset = $target.offset().top;
                    $('html, body').animate({
                        scrollTop: targetOffset - 85
                    }, 1000);
                }
            }
        });


        $('.bxslider').bxSlider({
            mode: 'horizontal',
            infiniteLoop: true,
            auto: true,
            autoStart: true,
            autoDirection: 'next',
            autoHover: true,
            pager: true,
            pagerType: 'full',
            controls: true,
            captions: true,
            speed: 500
        });
    });

});