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


	$('.schedule-filter li').on('click', function () {
		var tsfilter = $(this).data('tsfilter');
		$('.schedule-filter li').removeClass('active');
		$(this).addClass('active');

		fillScheduleByHour(tsfilter)
	});


	function fillScheduleByHour(day) {
		const courses = [
			// REMISE EN FORME
			{ name: "REMISE EN FORME", day: "monday", time: "9H15 - 10H15" },
			{ name: "REMISE EN FORME", day: "monday", time: "12H15 - 13H" },
			{ name: "REMISE EN FORME", day: "monday", time: "17H15 - 18H15" },
			{ name: "REMISE EN FORME", day: "tuesday", time: "12H15 - 13H" },
			{ name: "REMISE EN FORME", day: "wednesday", time: "9H15 - 10H15" },
			{ name: "REMISE EN FORME", day: "wednesday", time: "12H15 - 13H" },
			{ name: "REMISE EN FORME", day: "wednesday", time: "17H15 - 18H15" },
			{ name: "REMISE EN FORME", day: "thursday", time: "12H15 - 13H" },
			{ name: "REMISE EN FORME", day: "friday", time: "9H15 - 10H15" },
			{ name: "REMISE EN FORME", day: "friday", time: "12H15 - 13H" },
			{ name: "REMISE EN FORME", day: "friday", time: "17H15 - 18H15" },

			// WOD
			{ name: "WOD", day: "monday", time: "18H30 - 19H30" },
			{ name: "WOD", day: "monday", time: "19H45 - 20H45" },
			{ name: "WOD", day: "tuesday", time: "9H15 - 10H15" },
			{ name: "WOD", day: "tuesday", time: "18H30 - 19H30" },
			{ name: "WOD", day: "tuesday", time: "19H45 - 20H45" },
			{ name: "WOD", day: "wednesday", time: "19H45 - 20H45" },
			{ name: "WOD", day: "thursday", time: "9H15 - 10H15" },
			{ name: "WOD", day: "thursday", time: "18H30 - 19H30" },
			{ name: "WOD", day: "thursday", time: "19H45 - 20H45" },
			{ name: "WOD", day: "friday", time: "18H30 - 19H30" },

			// SENIOR
			{ name: "SENIOR", day: "monday", time: "10H30 - 11H30" },
			{ name: "SENIOR", day: "thursday", time: "10H30 - 11H30" },

			// KIDS
			{ name: "KIDS", day: "wednesday", time: "15H30 - 16H30" },
			{ name: "KIDS", day: "saturday", time: "10H - 11H" },

			// CARDIO BOXING
			{ name: "CARDIO BOXING", day: "monday", time: "18H30 - 19H30" },
			{ name: "CARDIO BOXING", day: "wednesday", time: "18H30 - 19H30" },
			{ name: "CARDIO BOXING", day: "saturday", time: "11H15 - 12H15" },

			// PRÉPA HYROX
			{ name: "PRÉPA HYROX", day: "wednesday", time: "18H30 - 19H30" },
			{ name: "PRÉPA HYROX", day: "friday", time: "17H15 - 18H15" },

			// BOXE ANGLAISE
			{ name: "BOXE ANGLAISE", day: "monday", time: "19H45 - 20H45" },
			{ name: "BOXE ANGLAISE", day: "thursday", time: "18H30 - 19H30" },

			// WOD TEAM
			{ name: "WOD TEAM", day: "saturday", time: "10H - 11H" },
			{ name: "WOD TEAM", day: "saturday", time: "11H15 - 12H15" }

		];
		const todayCourse = courses.filter(c => c.day === day.toLowerCase())

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


})(window.jQuery);