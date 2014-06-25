jQuery.noConflict()( function($){
	"use strict";

	var Core = {
	
		/**
			Constructor
		**/
		initialize: function() {

			this.build();
			this.events();

		},
		/**
			Build page elements, plugins init
		**/
		build: function() {
		
			$('html').removeClass('no-js');
		
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				$('html').addClass('mobile');
			}
		
			// table odd even
			$('.post #content table tr:odd').addClass('odd');
			$('.post #content table tr:even').addClass('even');
			
    	if( $('body.template-home-one-page').length ) {

				$('body.template-home-one-page ul.menu').onePageNav({
					currentClass: 'current_page_item',
					changeHash: false,
 					scrollSpeed: 750,
  				scrollOffset: 85,
  				filter: ':not(.external)'
				});
				
				if( $(window).width() <= 767 ) {
					$('body.template-home-one-page .big-header-wrapper').removeClass('scrolled');
				} 
				
    	}
    	
    	$( window ).resize(function() {
				if( $(window).width() <= 767 ) {
					$('.big-header-wrapper').removeClass('scrolled');
				} else {
					$('body.template-home-one-page .big-header-wrapper').addClass('scrolled');
				}
   		});
			
			// Custom inputs
			this.setupCustomInputs();
		
			// Setup page sliders
			this.setupSliders();
			
			// Create toggles
			this.setupToggles();
		
			// Setup page carousels
			this.setupCarousels();
		
			// Setup another required plugins
			this.setupPlugins();
			
			// Setup homepage
			this.setupHomepages();
		
		},
		/**
			Set page events
		**/
		events: function() {
		
			// init CSS animations
			this.initAnimations();
		
			// page loader progress bar
			$( document ).waitForImages( {
				finished: function() {
					NProgress.done(true);
    		},
    		each: function() {
					NProgress.inc();
    		}
			});
		
			/**
				Header AJAX cart
			**/
			$('header.small .my-cart').hover( function() {
				
				if( $('html').hasClass('mobile') ) {
					return false;
				}
				
				var link = $(this);
				
				if( link.hasClass('cart-opened') == false ) {
					
					link.addClass('cart-opened');
					$('#wproto-ajax-header-cart').fadeIn('fast');
					
				}
				
			});
			
			$('#wproto-ajax-header-cart').hover( function() {
				
			}, function() {
				$(this).fadeOut('fast');
				$('header.small .my-cart').removeClass('cart-opened');
			});
			
			$('#wproto-close-ajax-cart').on( 'click', '#wproto-ajax-header-cart', function() {
				$('#wproto-ajax-header-cart').fadeOut('fast');
				$('header.small .my-cart').removeClass('cart-opened');
			});
			
			$(window).scroll(function(){
				$('#wproto-ajax-header-cart').fadeOut('fast');
				$('header.small .my-cart').removeClass('cart-opened');
			});
		
			// Header menu scrolling
			this.navMenu();
		
			// Custom slider events
			this.sliderEvents();
			
			// Contact form submit
			this.bindContactForm();
		
			// top search form submit handler
			$('#top-search-form a').click( function() {
				$(this).parents('form').submit();
				return false;
			});
		
			/**
				Toggle mobile menu
			**/
			$('#phone-toggle-menu').click( function() {
				$('#header-menu').toggleClass('hide-on-phone').toggleClass('opened');
				return false;
			});
		
			// change shop view list/grid
			$('.change-shop-view').click( function() {
		
				var target = $('#shop-posts-list');
		
				$('a.change-shop-view').removeClass('current');
		
				if( $(this).hasClass('view-grid') ) {
					target.removeClass('view-list').addClass('view-grid');
				}
		
				if( $(this).hasClass('view-list') ) {
					target.removeClass('view-grid').addClass('view-list');
				}
		
				$(this).addClass('current');
		
				return false;
			});
		
			// toggle product categories
			$('.widget_product_categories i.toggle').click( function() {
		
				var parent = $(this).parents('.widget_product_categories');
				$(this).toggleClass('opened');
				$(this).parent().parent().find('ul:first').slideToggle( 400 );
		
				return false;
			});
			
			// home portfolio hover
			$('.portfolio-items .item').hover( function() {
				$(this).find('a.icon-zoom, a.icon-document').addClass('bounceIn animated');
			}, function() {
				$(this).find('a.icon-zoom, a.icon-document').removeClass('bounceIn animated');
			});
			
			// shipping address changed
			$('#shiptobilling input[type=radio]').change( function() {
				var val = jQuery(this).val();
				var target = $('.shipping_address');
				val == '1' ? target.fadeIn() : target.fadeOut();
			});
			
			// shipping method change
			$('.payment_methods input[type=radio]').change( function() {
				$('div.payment_box').hide();
				$(this).parents('li').find('div.payment_box').fadeIn();
			});
			
			// videos play
			$('.video-link').magnificPopup({
				type: 'iframe',
				removalDelay: 100,
				mainClass: 'mfp-fade',
				zoom: {
					enabled: true,
					duration: 300
				},
				gallery: {
					enabled: true,
					navigateByImgClick: true
				}
			});
		
			/**
				Body parallax
			**/
			$('.parallax').each(function(){
				
				var sectionHeight = $(this).next('.parallax-content').height();
				$(this).height( sectionHeight + 'px' );
				
				var parallaxItem = $(this);
				$(window).scroll(function() {
					if( $(window).width() > 767 ) {
						var yPos = -( Math.floor($(window).scrollTop() / parallaxItem.data('parallax-speed')) ); 
						var coords = 'center '+ yPos + 'px';	
										
						parallaxItem.css({ backgroundPosition: coords });
					}
				});
			});
			
			$( window ).resize(function() {
				$('.parallax').each(function(){
					var sectionHeight = $(this).next('.parallax-content').height();
					$(this).height( sectionHeight + 'px' );
				});
			});
			
			/**
				IE8 Placeholders
			**/
			$('.ie8 input[placeholder], .ie8 textarea[placeholder]').each( function() {
				$(this).val( $(this).attr('placeholder') );
				
				$(this).focus( function() {
					if( this.value == $(this).attr('placeholder') ) this.value = '';
				});
				
				$(this).blur( function() {
					if( $.trim( $(this).val() ) == '' ) $(this).val( $(this).attr('placeholder') );
				});
				
			});
			
			/**
				Tap header menu
			**/
			$('.mobile #header-menu a.item').on('click', function() {
				var submenu = $(this).next('ul.sub-menu, .wproto-mega-menu-content');
				if( submenu.length ) {
					submenu.show();
					return false;
				}
			});
		
		},
	
		/**************************************************************************************************************************
			Class methods
		**************************************************************************************************************************/
		/**
			Contact form
		**/
		bindContactForm: function() {
			
			var self = this;
			
			// Contact form widget
			$('.widget-contact-us form').each( function() {
				
				$(this).find('.captcha').remove();
				
				$(this).submit( function() {
					
					var form = $(this);
					
					var nameInput = $(this).find('input[type=text]');
					var name = nameInput.val();
					
					var emailInput = $(this).find('input[type=email]');
					var email = emailInput.val();
					
					var messageInput = $(this).find('textarea');
					var message = messageInput.val();
					
					if( $.trim( name ) == '' ) {
						nameInput.focus();
						return false;
					}
					
					if( $.trim( email ) == '' || !self.isValidEmailAddress( email ) ) {
						emailInput.focus();
						return false;
					}
					
					if( $.trim( message ) == '' ) {
						messageInput.focus();
						return false;
					}
					
					$.ajax({
						url: 'contact-form.php',
						type: "POST",
						data: {
							'name' : name,
							'email' : email,
							'message' : message
						},
						beforeSend: function() {
							NProgress.start();
						},
						success: function() {
							NProgress.done(true);
				
							form.html( '<p class="success">Your message has been sent. Thank you!</p>' );
				
						}
					});
					
					return false;
				});
			});
			
			
			// Contact form at contact's page
			var form = $('#contact-form-main');
			
			form.submit( function() {
				
				$('#input-name, #input-email, #input-message').removeClass('error');
		
				$(this).find('div.error').hide();
		
				var nameInput = $('#input-name');
				var name = nameInput.val();
		
				var emailInput = $('#input-email');
				var email = emailInput.val();
				
				var subject = $('#input-subject').val();
				
				var messageInput = $('#input-message');
				var message = messageInput.val();
				
				if( $.trim( name ) == '' ) {
					nameInput.focus().addClass('error');
					nameInput.next('div.error').fadeIn();
					return false;
				}
		
				if( $.trim( email ) == '' || !self.isValidEmailAddress( email ) ) {
					emailInput.focus().addClass('error');
					emailInput.next('div.error').fadeIn();
					return false;
				}
		
				if( $.trim( message ) == '' ) {
					messageInput.focus().addClass('error');
					messageInput.next('div.error').fadeIn();
					return false;
				}
				
				$.ajax({
					url: 'contact-form.php',
					type: "POST",
					data: {
						'name' : name,
						'email' : email,
						'message' : message,
						'subject' : subject
					},
					beforeSend: function() {
						NProgress.start();
					},
					success: function() {
						NProgress.done(true);
				
						$('#contact-form-part').html( '<h2 id="message-send" class="success">Your message has been sent. Thank you!</h2>' );
				
						var msgTop = $("#message-send").offset().top;
				
						$('html, body').animate({
        			scrollTop: msgTop - 150
    				}, 1000);
				
					}
				});
				
			});
		},
	
		/**
			Custom page inputs
		**/
		setupCustomInputs: function() {
		
			// pretty checkboxes
			$('input[type=radio], input[type=checkbox]').each( function() {
				$(this).on('ifChecked', function(event){
					
					var name = $(this).attr('name');
					
					$('input[name=' + name +']').not( $(this) ).removeAttr('checked');
					
					$(this).attr('checked', function(idx, oldAttr) {
						return !oldAttr;
					}).change();
				}).iCheck({
  				labelHover: false,
  				cursor: true
				});
			});
		
			/**
				Select
			**/
			//$('select').fancySelect();
			
			var selects = $('select');
			if( selects.length ) {
				
				selects.each( function() {
					
					var id = $(this).attr('id');
					
					if( id != 'switcher-primary-font-selector' && id != 'switcher-secondary-font-selector' ) {
						$(this).selecter({
							customClass: "theme-select-input",
							cover: true //,
							//defaultLabel: "Select an item..."
						});
					}
					
				});
				
			}
		
		},
	
		/**
			Setup page sliders
		**/
		setupSliders: function() {
		
			// post gallery carousel
			$(".images-carousel, .post-slider-carousel").each( function() {
		
				$(this).bxSlider({
					controls: true,
					autoStart: false,
					minSlides: 2,
					nextSelector: $(this).parent().find(".post-slider-next"),
					prevSelector: $(this).parent().find(".post-slider-prev"),
					pagerSelector: $(this).parent().find(".post-slider-pagination"),
					touchEnabled: true,
					mode: 'fade'
				});
			
			});
	
			$('.widget-slider > .slides, .widget_photoalbums .slides').each( function() {
				$(this).bxSlider({
					controls: true,
					autoStart: false,
					minSlides: 2,
					pagerSelector: $(this).parent().find(".slider-pagination"),
					touchEnabled: true,
					mode: 'fade'
				});
			});
		
			// full screen portfolio
			if( $('.full-portfolio-slider').length ) {
				
				// load first slide
				$('.full-portfolio-slider img.lazy:first').each( function() {
					$(this).attr('src', $(this).data('src') );
					$('.full-portfolio-slider').removeClass('preload');
				});
				
				$('.full-portfolio-slider').bxSlider({
					mode: 'fade',
					onSlideBefore: function( slideElement, oldIndex, newIndex ){
						
						var lazy = slideElement.find("img.lazy")
						var load = lazy.attr("data-src");

    				lazy.attr("src", load );
 						
        	},
					controls: false,
					autoStart: false,
					minSlides: 1,
					adaptiveHeight: true,
					pagerCustom: $("#portfolio-pager .jTscroller"),
					touchEnabled: true
				});
			}
		
			//portfolio thumbnail scroller
			if( $("#portfolio-pager").length ) {
				var touchSlider = $("#portfolio-pager").find('.swiper-container').swiper({
					mode:'horizontal',
 					slidesPerView: 'auto',
  				calculateHeight: true,
  				autoResize: false
 				});
  				
				$("#portfolio-pager").find('.jTscrollerPrevButton').click( function() {
					touchSlider.swipePrev();
				});
				
				$("#portfolio-pager").find('.jTscrollerNextButton').click( function() {
					touchSlider.swipeNext();
				});
			}
		
			/**
				Content slider
			**/
			$('.content-slider').liquidSlider({
				slideEaseFunction:'animate.css',
				animateIn:"fadeIn",
				animateOut:"fadeOut",
				dynamicArrows: false,
				autoHeight: true,
				slideEaseDuration:500,
				heightEaseDuration:500,
				includeTitle: false,
				autoSlide: false,
				callback: function() {
					var self = this;
			
					$(self).find('panel').each(function() {
      			$(this).removeClass( 'animated ' + self.options.animateIn );
    			});
			
				}
			});
	
			$('.buy-together-slider').liquidSlider({
				slideEaseFunction:'animate.css',
				animateIn:"fadeIn",
				animateOut:"fadeOut",
				hideSideArrows: false,
				hideSideArrowsDuration: 0,
				slideEaseDuration:500,
				heightEaseDuration:500,
				dynamicTabs: false,
				dynamicArrows: true,
				autoSlide: false,
				callback: function() {
					var self = this;
			
					$(self).find('panel').each(function() {
      			$(this).removeClass( 'animated ' + self.options.animateIn );
    			});
			
				}
			});
		
		},
	
		/**
			Setup carousels
		**/
		setupCarousels: function() {
			
			var self = this;
		
			// related products and related posts carousel
			$('.related-posts > .items, .related-products > .items, .new-arrivals > .items, .best-sellers > .items').each( function() {
		
				$(this).owlCarousel({
					items: 4,
					autoPlay: false,
					navigation: false,
					pagination: true,
					responsive: true,
					itemsDesktopSmall: [1199,3],
					itemsTablet: [959,2],
					itemsTabletSmall: [767,3],
					itemsMobile: [480,1]
				});	
		
			});
			
			$('.template-home-parallax .portfolio .items, .template-home-one-page .portfolio .items').each( function() {
		
				$(this).owlCarousel({
					items: 4,
					autoPlay: false,
					navigation: false,
					pagination: true,
					responsive: true,
					itemsDesktopSmall: [1199,3],
					itemsTablet: [959,2],
					itemsTabletSmall: [767,2],
					itemsMobile: [480,1]
				});	
		
			});
			
			// single shop products carousel
			$('.product-scroller .scroller').each( function() {
				$(this).bxSlider({
					controls: true,
					autoStart: false,
					slideWidth: 95,
					minSlides: 3,
					maxSlides: 3,
					adaptiveHeight: true,
					touchEnabled: true
				});
			});
		
			// page banners
			$('.page-banners-carousel > .items').each( function() {
		
				$(this).owlCarousel({
					items: 1,
					navigation: false,
					pagination: true,
					responsive: true,
					transitionStyle : "backSlide",
					itemsDesktopSmall: [1199,1],
					itemsTablet: [959,1],
					itemsTabletSmall: [767,1],
					itemsMobile: [480,1],
					afterInit: function( slider ) {
						self.runBannerAnimation( slider, 'show' );
					},
					afterMove: function( slider ) {
						self.runBannerAnimation( slider, 'show' );
					},
					beforeMove: function( slider ) {
						self.runBannerAnimation( slider, 'hide' );
					}
				});
		
			});
			
			// home slider
			$('.slider-carousel > .items').each( function() {
		
				$(this).owlCarousel({
					navigation: true,
					pagination: false,
					responsive: true,
					lazyLoad : true,
					lazyFollow : true,
					transitionStyle : "fade",
					singleItem: true,
					autoPlay: true,
					stopOnHover: true,
					afterInit: function( slider ) {
						self.runBannerAnimation( slider, 'show' );
					},
					afterMove: function( slider ) {
						self.runBannerAnimation( slider, 'show' );
					},
					beforeMove: function( slider ) {
						self.runBannerAnimation( slider, 'hide' );
					}
				});
		
			});
		
			// widget post carousel

			$('.widget.widget-posts-carousel > .items, .widget-catalog-carousel > .items, .widget-testimonials-carousel > .items, .widget_portfolio > .items, .widget_our_team > .items').each( function() {
		
				var self = $(this);
		
				$(this).owlCarousel({
					items: 1,
					navigation: true,
					pagination: false,
					responsive: true,
					transitionStyle : "fade",
					itemsDesktopSmall: [1199,1],
					itemsTablet: [959,1],
					itemsTabletSmall: [767,1],
					itemsMobile: [480,1],
					afterInit: function( slider ) {
				
						$(slider).find('.owl-external .prev').click( function() {
							self.trigger('owl.prev');
						});
						$(slider).find('.owl-external .next').click( function() {
							self.trigger('owl.next');
						});
					}
				});
		
			});
		
		},
	
		/**
			Setup required plugins
		**/
		setupPlugins: function() {
		
			/**
				Tipsy
			**/
			$('.show-tooltip').each( function() {
				var g = $(this).attr('data-tip-gravity');
				g = g == undefined ? 'n' : g;
				$(this).tipsy( { fade: true, gravity: g } );
			});
	
			// GoTop script
			if( $().UItoTop ) {
				$().UItoTop();
			}
		
			/**
				Lightbox
			**/
			$('.single-product .image-link').each( function() {
				$(this).magnificPopup({
					type:'image',
					removalDelay: 100,
					mainClass: 'mfp-fade',
					zoom: {
						enabled: true,
						duration: 300,
						opener: function(element) {
							return element.find('img');
						}
					},
					gallery: {
						enabled: true,
						navigateByImgClick: true
					}
				});
			});
			$('.widget_photoalbums, .widget-slider, .widget-recent-photos').each( function() {
				$(this).magnificPopup({
					type:'image',
					delegate: 'a.lightbox',
					removalDelay: 100,
					mainClass: 'mfp-fade',
					zoom: {
						enabled: true,
						duration: 300,
						opener: function(element) {
							return element.find('img');
						}
					},
					gallery: {
						enabled: true,
						navigateByImgClick: true
					}
				});
			});
		
			// ui slider
			$('.slider-range').each( function() {
		
				var self = $(this);
		
				self.slider({
					range: true,
					min: 0,
					max: 3000,
					values: [ 500, 1200 ],
					
				});
		
			});
		
			// masonry blog layout
			if( $('.template-masonry .posts').length ) {
		
				$('.template-masonry .posts').masonry({
					itemSelector: 'article.post',
					isAnimated: true,
					columnWidth: '.masonry-grid-sizer'
				});
				
				$('.template-masonry .posts img').load( function() {
			
					$('.template-masonry .posts').masonry({
						itemSelector: 'article.post',
						isAnimated: true,
						columnWidth: '.masonry-grid-sizer'
					});
			
				});
		
			}
		
		},
	
		/**
			Homepages init
		**/
		setupHomepages: function() {
			
			/**
				Home portfolio
			**/
			if( $('#home-portfolio').length ) {
				$('#home-portfolio').masonry({
					itemSelector: 'div.item',
					isAnimated: true,
					gutter: 6,
					columnWidth: 165
				});
				
				$('#home-portfolio img').load( function() {
					$('#home-portfolio').masonry({
						itemSelector: 'div.item',
						isAnimated: true,
						gutter: 6,
						columnWidth: 165
					});
				});
				
			}
			
			/**
				Home testimonials
			**/
			var tCarousel = $('#testimonials-carousel');
			if( tCarousel.length ) {
				tCarousel.owlCarousel({
					items: 1,
					navigation: true,
					pagination: false,
					responsive: true,
					transitionStyle : "fade",
					itemsDesktopSmall: [1199,1],
					itemsTablet: [959,1],
					itemsTabletSmall: [767,1],
					itemsMobile: [480,1]
				});
			}
			
			/**
				Home products sub-carousel
			**/
			
			$('.additional-info .scroller').each( function() {
				$(this).bxSlider({
					controls: true,
					autoStart: false,
					slideWidth: 75,
					minSlides: 3,
					maxSlides: 3,
					adaptiveHeight: true,
					touchEnabled: true
				});
			});
			
			/**
				Home carousels
			**/
			// related products and related posts carousel
			if( $('.template-home-business').length ) {
			
				$('.best-ratings > .items, .reviews > .items, .home-best-sellers > .items').each( function() {
		
					$(this).owlCarousel({
						items: 1,
						autoPlay: false,
						navigation: false,
						pagination: true,
						responsive: true,
						transitionStyle : "fade",
						itemsDesktopSmall: [1199,1],
						itemsTablet: [959,1],
						itemsTabletSmall: [767,1],
						itemsMobile: [480,1]
					});	
		
				});
				
			}
			
			/**
				Home blog posts scroller
			**/
			if( $('#blog-posts-home').length ) {

				var homeTouchSliders = $('#blog-posts-home').find('.swiper-container').swiper({
					mode:'horizontal',
 					slidesPerView: 'auto',
  				calculateHeight: true,
  				autoResize: false,
  				loop: true
 				});
  				
				$('#blog-posts-home').find('.jTscrollerPrevButton').click( function() {
					homeTouchSliders.swipePrev();
				});
				
				$('#blog-posts-home').find('.jTscrollerNextButton').click( function() {
					homeTouchSliders.swipeNext();
				});
				
			}
			
		},
	
		/**
			Header menu scroll
		**/
		navMenu: function() {
			
			if( $('.big-header-wrapper').length && $('html').hasClass('mobile') == false && $('body').hasClass('template-home-one-page') == false ) {
				
				var menuTop = $('header.small');
				var el = $('.big-header-wrapper');
				var elpos_original = el.offset().top;
		
				$(window).scroll(function(){
					var elpos = el.offset().top;
 					var windowpos = $(window).scrollTop();
  				var finaldestination = windowpos;
  				var body = $('body');
  	
  				if( $(window).width() > 767 ) {
  					
  					if(windowpos<=elpos_original) {
   						finaldestination = elpos_original;
   						
     					el.removeClass('scrolled');
      				menuTop.removeClass('menu-scrolled');
      				body.removeClass('scrolling')
      				
  					} else {
  						
  						if( body.hasClass('scrolling') == false ) {
  							body.addClass('scrolling');
  						}
  						
  						if( el.hasClass('scrolled') == false ) {
  							el.addClass('scrolled');
  						}
  						
  						if( menuTop.hasClass('menu-scrolled') == false ) {
  							menuTop.addClass('menu-scrolled');
 							}
	   					
     					
 						}
  				} else {
 						el.removeClass('scrolled');
   					menuTop.removeClass('menu-scrolled');
  				}
				});
		
				$( window ).resize(function() {
					if( $(window).width() < 767 ) {
						$('header.small, .big-header-wrapper').removeClass('menu-scrolled scrolled');
					}
				});
				
			}

		},
	
		/**
			Custom slider events
		**/
		sliderEvents: function() {
		
			//portfolio thumbnail scroller
			$('.portfolio-full-slider .toggle-panel').click( function() {
				$(this).toggleClass('closed');
				$('.portfolio-thumbnails').toggleClass('closed');
				$('#portfolio-pager').fadeToggle();
				return false;
			});
		
		},
	
		/**
			Page toggles events
		**/
		setupToggles: function() {
			// Toggles
			$('.toggle h4').click( function() {
		
				var top = $(this).parent().parent();
				var content = $(this).parent().find('.toggle-content');
				var icon = $(this).parent().find('i');
				var h = $(this);
		
				top.find('h4').removeClass('opened');

				if( content.is(':hidden') ) {
					top.find('.toggle-content').slideUp();
					top.find('i').removeClass('minus').addClass('plus');
					icon.removeClass('plus').addClass('minus');
					h.addClass('opened');
					content.slideDown();

				} else {
					icon.removeClass('minus').addClass('plus');
					content.slideUp();
				}
		
				return false;
			});
		},
	
		/**************************************************************************************************************************
			Utils
		**************************************************************************************************************************/
		/**
			Check email address
		**/
		isValidEmailAddress: function( emailAddress ) {
			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
 			return pattern.test( emailAddress );
		},
		
		/**
			Show animations for elements
		**/
		initAnimations: function() {
	
			if( $("html").hasClass("oldie") || $("html").hasClass("mobile") ) {
				return false;
			}
	
			$("[data-appear-animation]").each(function() {

				var self = $(this);
		
				self.addClass("appear-animation");
		
					if( $(window).width() > 959 ) {
				
						self.appear(function() {
					
							var delay = (self.attr("data-appear-animation-delay") ? self.attr("data-appear-animation-delay") : 0);
					
							self.css("animation-delay", delay + "s");
					
							var animation = self.attr("data-appear-animation");
					
							self.addClass( animation );
					
							setTimeout(function() {
							
								if( animation == 'animateWidth' ) {
									self.css('width', self.attr("data-width"));
								}
						
								self.addClass("animated").addClass("animation-finished");
						
							}, delay);
					
						}, {accX: 0, accY: -50});
				
					} else {
				
						self.addClass("animated").addClass("animation-finished");
					
						self.css('width', self.attr("data-width"));
				
					}
			});
	
		},
	
		/**
			Run banner animation
		**/
		runBannerAnimation: function( slider, type ) {
		
			var elements = $( slider ).find('div.text:visible, div.second-text:visible, div.link:visible, .layer');
		
			elements.each( function() {
				$(this).addClass( $(this).data('animation-effect') ).css("animation-delay", $(this).data('animation-delay'));
			});
		
			if( type == 'show' ) {
				elements.css('opacity', 1).addClass('animated');
			}
		
			if( type == 'hide' ) {
				elements.css('opacity', 0).removeClass('animated');
			}
		
		}
	}

	Core.initialize();

});