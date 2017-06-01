/* ================================= 
  Menu Bar
==================================== */

var $mobileBar = $('.mobile-bar');
var $navMenu = $(".nav-menu");


$mobileBar.on('click', function() {
	$(this).toggleClass("change");
	$navMenu.slideToggle("slow");
});




/* ================================= 
  Parallax
==================================== */

// $(window).scroll( function() {
// 	parallax();
// });

// disable parallax on mobile
if( $(window).width() > 800) {
  $(window).scroll(function() {	 
    parallax();
  });
}

function parallax() {
	// var wScroll = $(window).scrollTop();
	var wScroll = $(window).scrollTop(); 

	$('.parallax-bg').css('background-position', 'center ' + -(wScroll*0.3) + 'px');

	$('.parallax-bg2').css('background-position', 'center ' + -(wScroll*0.3) + 'px');
}


/* ================================= 
  Progress bar
==================================== */

var progress = $('.progress');
var progressWrap = $('.progress-wrap');

moveProgressBar();
// on browser resize...
$(window).resize( function() {
    moveProgressBar();
});

function moveProgressBar() {
	// Loop thru all progress bars and animate..
	$(progress).each( function() {
		var getPercent = $(this).data('percent');
		var	progressBarWidth = $(progressWrap).width();
		var progressTotal = (getPercent/100) * progressBarWidth;
		var animationLength = 2000;
		var percentSpan = $(this).parent().parent().find('.percent');

		// Animate progress bar
		$(this).animate({
			width: progressTotal
		}, animationLength, function() { 
				// Show percent on each progress bar
				percentSpan.html(getPercent + "%");
			}
		);
	});
}



