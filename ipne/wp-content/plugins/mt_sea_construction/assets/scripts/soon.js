jQuery.fn.labelOver = function (overClass) {
    return this.each(function () {
        var label = jQuery(this);
        var f = label.attr('for');
        if (f) {
            var input = jQuery('#' + f);
            this.hide = function () {
                label.css({
                    textIndent: -10000
                })
            }
            this.show = function () {
                if (input.val() == '') label.css({
                    textIndent: 0
                })
            }
            // handlers
            input.focus(this.hide);
            input.blur(this.show);
            label.addClass(overClass).click(function () {
                input.focus()
            });
            if (input.val() != '') this.hide();
        }
    })
}

var startDate;
var endDate;
var nowDate;

$(document).ready(function () {

    setHeights();

    /*Countdown Start*/
    startDate = new Date('01/01/2013 20:00');
    endDate = new Date('01/01/2014 21:01:00');
    nowDate = new Date('12/05/2013 21:00:00');

    JBCountDown({
        secondsColor: "#fff",
        secondsGlow: "#fff",

        startDate: startDate.getTime() / 1000,
        endDate: endDate.getTime() / 1000,
        now: nowDate.getTime() / 1000,
        seconds: "1"
    });
    /*Countdown Start*/

    /*Carousel Plugin Start*/
    $('.carousel').carousel({
        interval: 4000,
        pause: 'hover'
    });
    /*Carousel Plugin End*/

    /*Twitter Ticker Start
    $("#tweetTicker").tweet({
        username: "pamarval",
        count: 20,
        loading_text: "Loading ...",
        template: "{text} {time}"
    }).bind("loaded", function () {
        var ul = $(this).find(".tweet_list");
        var ticker = function () {
            setTimeout(function () {
                var top = ul.position().top;
                var h = ul.height();
                var incr = (h / ul.children().length);
                var newTop = top - incr;
                if (h + newTop <= 0) newTop = 0;

                ul.animate({ top: newTop }, 500);
                ticker();
            }, 5000);
        };
        ticker();
    });
   Twitter Ticker End*/

    $('ul.social li').hover(function () {
        var h = $(this).find('a').height();
        $(this).find('a').clone().addClass('hover').appendTo($(this));
        $(this).find('a:first-child').stop().animate({ marginTop: -(h) }, 200);
    }, function () {
        $(this).find('a:first-child').stop().animate({ marginTop: 0, opacity: 0.99 }, 200);
        setTimeout(function () { $(this).find('a.hover').remove(); }, 150);
    });

    $('.subscribe label').labelOver('over');

    $('.logo').hover(function () {
        $(this).find('img').fadeIn('slow');
        $(this).find('.timer').fadeOut('slow');
    },
	function () {
	    $(this).find('img').fadeOut('slow');
	    $(this).find('.timer').fadeIn('slow');
	});

	$('.subscribe input[type=button]').click(function(){
		var mail = $('.subscribe input[type=text]');

		if(mail.val() != ''  && !isValidEmailAddress(mail.val()))
		{
			mail.addClass('error');
		}
		else
		{
			mail.removeClass('error');
		}
	})
});

$(window).resize(function () {
    setHeights();
});

function loading() {
    $("#loading").fadeIn('slow');
    setTimeout('loadingVisible()', 1000);
}

function loadingVisible() {
    $("#loading").fadeOut('slow');

    setTimeout(function () {
        $('.logo img').fadeOut('slow');
        $('.timer').fadeIn('slow');
    }, 1000);
}

function setHeights() {
    var windowH = $(window).height() / 2;

    /*Content are set height - start*/
    var areaH = ($('.container').height()) / 2;
    var differentH = windowH - areaH;

    $('.container').css("margin-top", differentH);
    /*Content are set height - end*/

    /*Twitter are set width - start*/
    var areaW = ($('.twContainer').width()) / 2;

    $('.twContainer').css("margin-left", -(areaW));
    /*Twitter are set width - end*/
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};