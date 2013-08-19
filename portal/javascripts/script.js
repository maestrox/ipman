//JSHint Validated Custom JS Code by Designova

/*global $:false */
/*global window: false */

(function(){
  "use strict";

// Initialize prettyPhoto plugin
$(".portfolio a[data-gal^='prettyPhoto']").prettyPhoto({
    theme: 'dark_square',
    autoplay_slideshow: false,
    overlay_gallery: false,
    show_title: true
});

//TWITTER INIT:
$(function ($) {
    $("#ticker").tweet({
        username: "designovastudio",
        page: 1,
        avatar_size: 0,
        count: 20,
        loading_text: "loading tweets..."
    }).bind("loaded", function () {
        var ul = $(this).find(".tweet_list");
        var ticker = function () {
            setTimeout(function () {
                ul.find('li:first').animate({
                    marginTop: '-4em'
                }, 500, function () {
                    $(this).detach().appendTo(ul).removeAttr('style');
                });
                ticker();
            }, 5000);
        };
        ticker();
    });
});



//MASONRY PORTFOLIO INIT:
$(function () {

    var $container = $('#container');

    $container.isotope({
        itemSelector: '.element',
        layoutMode: 'masonry'
    });


    var $optionSets = $('#options .option-set'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function () {
        var $this = $(this);
        // don't proceed if already selected
        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');

        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        var changeLayoutMode;
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[key] = value;
        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
            // changes in layout modes need extra logic
            changeLayoutMode($this, options);
        } else {
            // creativewise, apply new options
            $container.isotope(options);
        }

        return false;
    });


});





/*===========================================================*/
/*  Colorbox
/*===========================================================*/
$(function () {
    
    var viewportHeight = $(window).height();
    var introMargin = (viewportHeight / 3) - (viewportHeight / 12);
    $('#intro').height(viewportHeight);
    $('.promo-one').css('margin-top', introMargin);
    //Examples of how to assign the ColorBox event to elements
    $(".project-view").colorbox({
        rel: 'group1',
        transition: "fade",
        speed: 1700,
        onComplete: function () {
            $('.flexslider').flexslider({
                animation: "slide",
                controlNav: false,
                directionNav: true

            });
        }
    });

    $('.band').mouseenter(function () {
        var pageInd = $(this).attr('id');
        $('#navigation ul li > a').removeClass('lighted');
        $('#' + pageInd + '-linker').addClass('lighted');
    });

    $('#navigation ul li > a').click(function () {
        $('#navigation ul li > a').removeClass('lighted');
        $(this).addClass('lighted');
    });


    $('#navigation ul').localScroll(9500);

    $('.carousel').carousel({
        interval: false
    });

    //WAYPOINTS - INTERACTION

    $('#about').waypoint(function (event, direction) {
        if (direction === 'down') {
            $('#navigation').addClass('moveTop');
        } else {
            $('#navigation').removeClass('moveTop');
        }
    });

    $('.folio-item').mouseenter(function () {
        $(this).find('img').css('opacity', '0.2');
        $(this).find('.titles').fadeIn();
    });

    $('.folio-item').mouseleave(function () {
        $('.folio-item').find('.titles').fadeOut();
        $('.folio-item').find('img').css('opacity', '1');
    });


    $('.element > img, .service-item, .about-feat').mouseleave(function () {
        $(this).addClass('remove-zoom');
    });
});


})();