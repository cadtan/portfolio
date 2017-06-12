

/* ================================= 
  Menu Bar
==================================== */

var mobileBar = $('.mobile-bar');
var navMenu = $(".nav-menu");
var navLink = $(".nav-menu li a");
var portfolioBtn = $(".portfolio-btn");


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
$(navLink).on('click', function() {
	var target =  '#' + $(this).attr('data-target');
	console.log(target)
	$('html, body').animate({
		scrollTop: $(target).offset().top
	}, 1000);
});

$(portfolioBtn).on('click', function() {
	var target =  '#' + $(this).children().attr('data-target');
	console.log(target)
	$('html, body').animate({
		scrollTop: $(target).offset().top
	}, 1000);
});


/* ================================= 
  Parallax
==================================== */

$window = $(window);

// Disable parallax on window resize < 800
$( window ).resize(function() {
	if( $window .width() > 800){
		$window.scroll(function() {	 
		  parallax();
		});
	}
});

// Disable parallax on mobile
if( $window.width() > 800) {
  $window.scroll(function() {	 
    parallax();
  });
}

function parallax() {
	var wScroll = $window.scrollTop(); 
	var speed = 0.3;
	$('.parallax-bg').css('background-position', 'center ' + -(wScroll*speed) + 'px');
	$('.parallax-bg2').css('background-position', 'center ' + -(wScroll*speed) + 'px');
}

/* ================================= 
  Portfolio gallery
==================================== */

// Dynamic elements
var $overlay = $("<div id='overlay'></div>");
var $slideContainer = $("<div class='slideContainer'></div>");
var $image = $("<img class='slide-image'>");
var $content = $("<div class='content'></div>");
var $contentOverlay = $("<div class='content-overlay'></div>");
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
$contentOverlay.append($content);
$overlay.append($contentOverlay);
$overlay.append($slideContainer);
$("body").append($overlay);

// Projects array
var projects = [
	{
		imageUrl: "images/project1.jpg",
		largeImageUrl: "images/project1-large.png",
		title: "Online Registration Form",
		description: "Treehouse Techdegree Project: This project challenges to build a responsive, mobile-first registration form using a variety of HTML form element",
		githubUrl: "https://github.com/cadtan/registration-form",
		siteUrl: "https://cadtan.github.io/registration-form"
	},
	{
		imageUrl: "images/project2.jpg",
		largeImageUrl: "images/project2-large.png",
		title: "Interactive Photo Gallery",
		description: "Treehouse Techdegree Project: Use HTML, CSS and the popular programming language JavaScript to create an interactive, searchable gallery of photos.",
		githubUrl: "https://github.com/cadtan/photo-gallery",
		siteUrl: "https://cadtan.github.io/photo-gallery"
	},
	{
		imageUrl: "images/project3.jpg",
		largeImageUrl: "images/project3-large.png",
		title: "Interactive Video Player",
		description: "Treehouse Techdegree Project: Using JavaScript and the HTML5 Video API to build an HTML5 video player",
		githubUrl: "https://github.com/cadtan/video-player",
		siteUrl: "https://cadtan.github.io/video-player"
	},
	{
		imageUrl: "images/project4.jpg",
		largeImageUrl: "images/project4-large.png",
		title: "Web App Dashboard",
		description: "Treehouse Techdegree Project: Build an interactive dashboard for a web application using advanced web techniques including SVG graphics and JavaScript programming.",
		githubUrl: "https://github.com/cadtan/web_app_dashboard",
		siteUrl: "https://cadtan.github.io/web_app_dashboard"
	},
	{
		imageUrl: "images/project5.jpg",
		largeImageUrl: "images/project5-large.png",
		title: "Gallery From Public APIs",
		description: "Treehouse Techdegree Project: Using JavaScript programming create a gallery of information and images by communicating with a third-party API (Application Programming Interface).",
		githubUrl: "https://github.com/cadtan/web_api",
		siteUrl: " https://cadtan.github.io/web_api"
	},
	{
		imageUrl: "images/project6.jpg",
		largeImageUrl: "images/project6-large.png",
		title: "Gym Website",
		description: "Gym Project: This is an one page website I created to practice my skills on JavaScript and CSS layout.",
		githubUrl: "https://github.com/cadtan/web_api",
		siteUrl: "https://cadtan.github.io/web_app_dashboard"
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
	var slideTitle = projects[index].title;
	var slideDescription = projects[index].description;
	var githubUrl = projects[index].githubUrl;
	var siteUrl = projects[index].siteUrl;
	var contentHtml = "";
	// Show overlay
	$overlay.show();
	// Add slide animation
	if(	$(slideImage).hasClass('slide-in') ) {
		$(slideImage).removeClass('slide-in').addClass('slide-out');			
	} else {
		$(slideImage).addClass('slide-in').removeClass('slide-out');
	}

	// if(	$content.hasClass('fade-in') ) {
	// 	$content.removeClass('fade-in').addClass('fade-out');			
	// } else {
	// 	$content.addClass('fade-in').removeClass('fade-out');
	// }

	if(	$content.hasClass('slide-in') ) {
		$content.removeClass('slide-in').addClass('slide-out');			
	} else {
		$content.addClass('slide-in').removeClass('slide-out');
	}



	// Get slide image
	$image.attr('src', getLargeImage)
	// Print content html
	contentHtml += "<h3 class='slide-title'>" + slideTitle + "</h3>" +  "<p>" + slideDescription + "</p>";
	contentHtml += "<button class='github-btn'><a href='" + githubUrl + "'>Visit Github</a></button>";
	contentHtml += "<button class='siteUrl-btn'><a href='" + siteUrl + "'>Visit Website</a></button>";
	$content.html(contentHtml);
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





