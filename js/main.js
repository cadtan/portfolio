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

var progressBars = $('.progress-bar');
var progressWrap = $('.progress-wrap');

progressBar();
// on browser resize...
$(window).resize(function() {
    progressBar();
});

function progressBar() {
	// Loop thru all progress bars and animate each
	$(progressBars).each( function() {
		var getPercent = $(this).data('percent');
		var	progressBarWidth = $(progressWrap).width();
		var progressTotal = ( getPercent/100 ) * progressBarWidth;

		$(this).animate({
			width: progressTotal
		}, { duration: 1000});
	});

}



