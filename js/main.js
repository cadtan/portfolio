

/* ================================= 
  Menu Bar
==================================== */

var mobileBar = $('.mobile-bar');
var navMenu = $(".nav-menu");
var navLink = $(".nav-menu li a");


// Resize nav menu on scroll
$(document).on("scroll", function() {
	if($(document).scrollTop()>100) {
		$(navMenu).removeClass("stretch").addClass("shrink");
	} else {
		$(navMenu).removeClass("shrink").addClass("stretch");
	}
});

// Mobile menu
$(mobileBar).on('click', function() {
	$(this).toggleClass("change");
	navMenu.slideToggle("slow");
});

// Scroll to section
navLink.on('click', function() {
	var target =  '#' + $(this).attr('data-target');
	console.log(target)
	$('html, body').animate({
		scrollTop: $(target).offset().top
	}, 1000);
});


/* ================================= 
  Parallax
==================================== */

// $(window).scroll( function() {
// 	parallax();
// });

// Disable parallax on mobile
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
  Portfolio gallery
==================================== */

// Dynamic elements
var $overlay = $("<div id='overlay'></div>");
var $slideContainer = $("<div class='slideContainer'></div>");
var $image = $("<img class='slide-image'>");
var $content = $("<div class='content'></div>");
var $nextBtn = $("<button class='next-btn'><span></span></button>");
var $prevBtn = $("<button class='prev-btn'><span></span></button>");
var $closeBtn = $("<button class='close-btn'><span class='close-cir'>x</span>Close</button>");

// Variables
var gallery = $('.gallery');
var projectLink = $('.project a');
var currentSlide = 0;

// Append dynamic elements
$slideContainer.append($closeBtn);
$slideContainer.append($nextBtn);
$slideContainer.append($prevBtn);
$slideContainer.append($image);
$slideContainer.append($content);
$overlay.append($slideContainer);
$("body").append($overlay);

// Projects array
var projects = [
	{
		imageUrl: "images/project1.jpg",
		largeImageUrl: "images/project1-large.png",
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{
		imageUrl: "images/project2.jpg",
		largeImageUrl: "images/project2-large.png",
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{
		imageUrl: "images/project3.jpg",
		largeImageUrl: "images/project3-large.png",
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{
		imageUrl: "images/project4.jpg",
		largeImageUrl: "images/project4-large.png",
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{
		imageUrl: "images/project5.jpg",
		largeImageUrl: "images/project5-large.png",
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{
		imageUrl: "images/project6.jpg",
		largeImageUrl: "images/project6-large.png",
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	}
]

// Print html
function printHtml() {
	var html = "";
	// Get each image and descriptionription from array
	$.each( projects, function( key, value ) {
		html += "<li class='project animation-element slide-left'>" ;
		html += "<a href='"+ value.imageUrl + "'" + ">";
		html += "<img src='" + value.imageUrl + "'" + ">";
		html += "</a>";		
		html += "<figcaption class='project-title'>";
		html += "<p>" + value.title + "</p>";
		html += "</figcaption>";
		html += "</li>";
	});
	$(gallery).html(html);	
}
printHtml();



/*   Lightbox
==================================== */

// Display slides
function showSlide() {
	var index = currentSlide;
	var getLargeImage = projects[index].largeImageUrl;
	var slideImage = $image.attr('src', getLargeImage);
	var slideDescription = projects[index].description;
	$overlay.show();


	if(	$(slideImage).hasClass('slide-in') ) {
		$(slideImage).removeClass('slide-in').addClass('slide-out');			
	} else {
		$(slideImage).addClass('slide-in').removeClass('slide-out');
	}


	
	$image.attr('src', getLargeImage)

	$content.html("<p>" + slideDescription + "</p>");
}




// Show overlay on click event
$('.gallery li').on('click', projectLink, function( event ){
	event.preventDefault();	
	currentSlide = $(this).index();
	showSlide();
});

// next button
$nextBtn.on('click', function() {
	currentSlide++;
	if( currentSlide >= projects.length ) {
		currentSlide = 0;
	}
	

	showSlide();
});

// previous button
$prevBtn.on('click', function() {
	currentSlide--;
	if( currentSlide <= -1 ) {
		currentSlide = projects.length - 1;
	} 
	showSlide();
});

// Close lightbox
$closeBtn.on('click', function() {
	$overlay.hide();
});




/* ================================= 
  Animate elements within view
==================================== */

var $animation_elements = $('.animation-element');
var $window  = $(window);

function check_if_in_view ( elem ) {
	var $element = $(elem);
	// return current vertical scrollbar pos
	var windowTopPosition = $window.scrollTop();
	// return height of window (viewport)
	var windowHeight = $window.height();
	var windowBottomPosition = windowTopPosition + windowHeight;
	var elementTopPosition = $element.offset().top;
	//  return height of element including its padding & border
	var elementHeight = $element.outerHeight();
	var elementBottomPosition = elementTopPosition + elementHeight;

	//check to see if this current container is within viewport
	return ( (elementBottomPosition >= windowTopPosition) && (elementTopPosition <= windowBottomPosition) );

}

function checkAnimation() {
	$.each( $animation_elements, function() {
	  var $element = $(this);
	  // if ( $element.hasClass('in-view') ) return;
	  // if elem is within viewport is true...
	  if ( check_if_in_view( $element ) ) {
	    // add animation class
	    $element.addClass('in-view');
	  }
	  // animate progress bar if in view
	  if ( check_if_in_view( $element ) && $element.attr("id") === "skills-section" ) {
	  	// console.log("in-view");
	    moveProgressBar();
	  } 
	});
}

$window.on('scroll resize', checkAnimation);
$window.trigger('scroll');


/* ================================= 
  Progress bar
==================================== */

var progress = $('.progress');
var progressWrap = $('.progress-wrap');

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





