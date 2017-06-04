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


/* ================================= 
  Portfolio Lightbox
==================================== */

// Dynamic elements
var $overlay = $("<div id='overlay'></div>");
var $slideContainer = $("<div class='slideContainer'></div>");
var $image = $("<img>");
var $content = $("<div class='content'></div>");
var $nextBtn = $("<button class='next-btn'><span>></span></button>");
var $prevBtn = $("<button class='prev-btn'><span><</span></button>");
var $closeBtn = $("<button class='close-btn'>X Close</button>");

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
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{
		imageUrl: "images/project2.jpg",
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{
		imageUrl: "images/project3.jpg",
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{
		imageUrl: "images/project4.jpg",
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{
		imageUrl: "images/project5.jpg",
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{
		imageUrl: "images/project6.jpg",
		title: "project title",
		description: "Lorem Ipsum has been the industry's standards, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	}
]

// Print html
function printHtml() {
	var html = "";
	// get each image and descriptionription from array
	$.each( projects, function( key, value ) {
		// console.log(key)
		html += "<li class='project'>" ;		
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

// Display slide content
function showSlide() {
	var index = currentSlide;
	var slideImage = projects[index].imageUrl;
	var slideDescription = projects[index].description;
	// console.log("current " + index)
	$overlay.show();
	$image.attr('src', slideImage);
	$content.html("<p>" + slideDescription + "</p>");
}

// Show overlay on click event
$('.gallery li').on('click', projectLink, function( event ){
	event.preventDefault();
	// console.log($(this).index());	
	currentSlide = $(this).index();
	showSlide();
});

// Close lightbox when click on close button
$closeBtn.on('click', function() {
	$overlay.hide();
});

$nextBtn.on('click', function(){
	currentSlide++;
	if( currentSlide >= projects.length ) {
		console.log("over")
		currentSlide = 0;
	}
	showSlide();
});

$prevBtn.on('click', function(){
	currentSlide--;
	console.log(currentSlide)
	if( currentSlide <= -1 ) {
		console.log("over")
		currentSlide = projects.length - 1;
	} 
	showSlide();
});










