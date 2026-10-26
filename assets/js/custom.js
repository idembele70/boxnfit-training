(function ($) {

	"use strict";

	$(function () {
		$("#tabs").tabs();
	});

	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		var box = $('.header-text').height();
		var header = $('header').height();

		if (scroll >= box - header) {
			$("header").addClass("background-header");
		} else {
			$("header").removeClass("background-header");
		}
	});

	function applyScheduleFilter() {
		const tsFilter = $(this).data('tsfilter') ?? 'monday';
		$('.schedule-filter li').removeClass('active');
		$(this ?? '[data-tsfilter="monday"]').addClass('active');

		fillScheduleByHour(tsFilter);
		refreshRows();
	}

	$('.schedule-filter li').on('click', applyScheduleFilter);


	function isSemaineA() {
		// Source - https://stackoverflow.com/a/27125580
		// Posted by nvd, modified by community. See post 'Timeline' for change history
		// Retrieved 2026-10-23, License - CC BY-SA 4.0

		const now = new Date();
		const onejan = new Date(now.getFullYear(), 0, 1);
		const week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);

		return week % 2 != 0
	}

	function fillScheduleByHour(day) {
		const coursesSemaineA = [
			// CARDIO BOXING
			{ name: "CARDIO BOXING", day: "monday", time: "18H - 19H" },
			{ name: "CARDIO BOXING", day: "wednesday", time: "18H - 19H" },
			{ name: "CARDIO BOXING", day: "saturday", time: "10H - 12H" },

			// CAF
			{ name: "CAF", day: "monday", time: "12H15 - 13H" },

			// WOD
			{ name: "WOD", day: "monday", time: "18H - 19H" },
			{ name: "WOD", day: "monday", time: "19H - 20H" },
			{ name: "WOD", day: "tuesday", time: "18H - 19H" },
			{ name: "WOD", day: "tuesday", time: "19H - 20H" },
			{ name: "WOD", day: "wednesday", time: "19H - 20H" },
			{ name: "WOD", day: "thursday", time: "18H - 19H" },
			{ name: "WOD", day: "thursday", time: "19H - 20H" },

			// BOXE
			{ name: "BOXE", day: "monday", time: "19H - 20H" },

			// CIRCUIT TRAINING
			{ name: "CIRCUIT TRAINING", day: "tuesday", time: "9H15 - 10H" },
			{ name: "CIRCUIT TRAINING", day: "tuesday", time: "17H15 - 18H" },
			{ name: "CIRCUIT TRAINING", day: "thursday", time: "9H15 - 10H" },
			{ name: "CIRCUIT TRAINING", day: "thursday", time: "17H15 - 18H" },
			{ name: "CIRCUIT TRAINING", day: "friday", time: "12H15 - 13H" },
			{ name: "CIRCUIT TRAINING", day: "friday", time: "17H15 - 18H" },

			// HYBRID
			{ name: "HYBRID", day: "monday", time: "9H15 - 10H" },
			{ name: "HYBRID", day: "tuesday", time: "12H15 - 13H" },
			{ name: "HYBRID", day: "thursday", time: "12H15 - 13H" },

			// BOXNCALS
			{ name: "BOXNCALS", day: "monday", time: "17H15 - 18H" },
			{ name: "BOXNCALS", day: "wednesday", time: "12H15 - 13H" },

			// KIDS
			{ name: "KIDS", day: "wednesday", time: "16H - 16H45" },
			{ name: "KIDS", day: "saturday", time: "9H15 - 10H" },

			// BOXNROX
			{ name: "BOXNROX", day: "wednesday", time: "9H15 - 10H" },
			{ name: "BOXNROX", day: "wednesday", time: "18H - 19H" },
			{ name: "BOXNROX", day: "friday", time: "9H15 - 10H" },
			{ name: "BOXNROX", day: "friday", time: "18H - 19H" },

			// WOD TEAM
			{ name: "WOD TEAM", day: "saturday", time: "10H - 12H" },
			{ name: "WOD TEAM", day: "saturday", time: "12H15 - 13H" },

			// OPEN GYM
			{ name: "OPEN GYM", day: "monday", time: "10H - 12H" },
			{ name: "OPEN GYM", day: "monday", time: "16H - 17H" },
			{ name: "OPEN GYM", day: "tuesday", time: "10H - 12H" },
			{ name: "OPEN GYM", day: "tuesday", time: "16H - 17H" },
			{ name: "OPEN GYM", day: "wednesday", time: "10H - 12H" },
			{ name: "OPEN GYM", day: "thursday", time: "10H - 12H" },
			{ name: "OPEN GYM", day: "thursday", time: "16H - 17H" },
			{ name: "OPEN GYM", day: "friday", time: "10H - 12H" },
		];

		const coursesSemaineB = [
			// CARDIO BOXING
			{ name: "CARDIO BOXING", day: "monday", time: "18H - 19H" },
			{ name: "CARDIO BOXING", day: "wednesday", time: "18H - 19H" },
			{ name: "CARDIO BOXING", day: "thursday", time: "12H15 - 13H" },

			// CAF
			{ name: "CAF", day: "monday", time: "9H15 - 10H" },
			{ name: "CAF", day: "monday", time: "17H15 - 18H" },

			// WOD
			{ name: "WOD", day: "monday", time: "18H - 19H" },
			{ name: "WOD", day: "monday", time: "19H - 20H" },
			{ name: "WOD", day: "tuesday", time: "18H - 19H" },
			{ name: "WOD", day: "tuesday", time: "19H - 20H" },
			{ name: "WOD", day: "wednesday", time: "19H - 20H" },
			{ name: "WOD", day: "thursday", time: "18H - 19H" },
			{ name: "WOD", day: "thursday", time: "19H - 20H" },

			// BOXE
			{ name: "BOXE", day: "monday", time: "19H - 20H" },

			// CIRCUIT TRAINING
			{ name: "CIRCUIT TRAINING", day: "tuesday", time: "12H15 - 13H" },
			{ name: "CIRCUIT TRAINING", day: "tuesday", time: "17H15 - 18H" },
			{ name: "CIRCUIT TRAINING", day: "thursday", time: "17H15 - 18H" },
			{ name: "CIRCUIT TRAINING", day: "friday", time: "9H15 - 10H" },
			{ name: "CIRCUIT TRAINING", day: "friday", time: "17H15 - 18H" },

			// HYBRID
			{ name: "HYBRID", day: "monday", time: "12H15 - 13H" },
			{ name: "HYBRID", day: "tuesday", time: "9H15 - 10H" },
			{ name: "HYBRID", day: "thursday", time: "9H15 - 10H" },

			// BOXNCALS
			{ name: "BOXNCALS", day: "wednesday", time: "9H15 - 10H" },

			// KIDS
			{ name: "KIDS", day: "wednesday", time: "16H - 16H45" },
			{ name: "KIDS", day: "saturday", time: "9H15 - 10H" },

			// BOXNROX
			{ name: "BOXNROX", day: "wednesday", time: "12H15 - 13H" },
			{ name: "BOXNROX", day: "wednesday", time: "18H - 19H" },
			{ name: "BOXNROX", day: "friday", time: "12H15 - 13H" },
			{ name: "BOXNROX", day: "friday", time: "18H - 19H" },

			// WOD TEAM
			{ name: "WOD TEAM", day: "saturday", time: "10H - 12H" },
			{ name: "WOD TEAM", day: "saturday", time: "12H15 - 13H" },

			// OPEN GYM
			{ name: "OPEN GYM", day: "monday", time: "10H - 12H" },
			{ name: "OPEN GYM", day: "monday", time: "16H - 17H" },
			{ name: "OPEN GYM", day: "tuesday", time: "10H - 12H" },
			{ name: "OPEN GYM", day: "tuesday", time: "16H - 17H" },
			{ name: "OPEN GYM", day: "wednesday", time: "10H - 12H" },
			{ name: "OPEN GYM", day: "thursday", time: "10H - 12H" },
			{ name: "OPEN GYM", day: "thursday", time: "16H - 17H" },
			{ name: "OPEN GYM", day: "friday", time: "10H - 12H" },
		];

		const todayCourse = isSemaineA()
			? coursesSemaineA.filter(c => c.day === day.toLowerCase())
			: coursesSemaineB.filter(c => c.day === day.toLowerCase())

			// vider les cellules
			$('.course-cell').html('');
		$('.schedule-table tbody tr').each(function () {
			const rowTime = $(this).find('.day-time').text().trim();

			const currentHourCourses = todayCourse.filter(c => c.time === rowTime)
			currentHourCourses.forEach(c => {
				$(this)
					.find('.course-cell')
					.append('<li>' + c.name + '</li>');
			});
		});
	}

	function refreshRows() {
		$('.scheduleBody tr').each(function () {
			const hasText = $(this).find('.course-cell').text().trim().length > 0;
			$(this).toggle(hasText);
		})
	}

	// Window Resize Mobile Menu Fix
	mobileNav();

	// Scroll animation init
	window.sr = new scrollReveal();


	// Menu Dropdown Toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	$(document).ready(function () {
		$(document).on("scroll", onScroll);

		//smoothscroll
		$('.scroll-to-section a[href^="#"]').on('click', function (e) {
			e.preventDefault();
			$(document).off("scroll");

			$('a').each(function () {
				$(this).removeClass('active');
			})
			$(this).addClass('active');

			var target = this.hash,
				menu = target;
			var target = $(this.hash);
			$('html, body').stop().animate({
				scrollTop: (target.offset().top) + 1
			}, 500, 'swing', function () {
				window.location.hash = target.selector;
				$(document).on("scroll", onScroll);
			});
		});
	});

	function onScroll(event) {
		var scrollPos = $(document).scrollTop();
		$('.nav a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if ((refElement.position()?.top ?? 0) <= scrollPos && (refElement.position()?.top ?? 0) + refElement.height() > scrollPos) {
				$('.nav ul li a').removeClass("active");
				currLink.addClass("active");
			}
			else {
				currLink.removeClass("active");
			}
		});
	}


	// Page loading animation
	$(window).on('load', function () {

		$('#js-preloader').addClass('loaded');
		fillScheduleByHour('Monday');
		applyScheduleFilter();
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function () {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function () {
			if (width < 1200) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}

	// Splide mount
	const splide = new Splide('#carousel', {
		perPage: 1,
		gap: '2rem',

		drag: true,          // souris + mobile swipe
		arrows: false,       // on utilise bouton custom
		pagination: false,

		focus: 'center',     // montre slide gauche/droite
		padding: '10%',      // preview des côtés
	}).mount();

	document.querySelectorAll('.next-btn').forEach(btn => {
		btn.addEventListener('click', () => splide.go('>'));
	});

})(window.jQuery);
