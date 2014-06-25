jQuery.noConflict()( function($){
	"use strict";

	var styleSwitcher = {
		
		/**
			Constructor
		**/
		initialize: function() {

			this.build();
			this.events();

		},
		
		/**
			Build elements, plugins init
		**/
		build: function() {
			
			/**
				Switcher scroller
			**/
			$('#style-switcher .switcher-elements').mCustomScrollbar({
				horizontalScroll: false,
				autoHideScrollbar: false,
				advanced: {
        	updateOnContentResize: true,
        	updateOnBrowserResize: true,
        	autoExpandHorizontalScroll: true
    		}
			});
			
			/**
				Load available fonts
			**/
			
			var primaryFontChooser = $('#switcher-primary-font-selector');
			var secondaryFontChooser = $('#switcher-secondary-font-selector');
			
			primaryFontChooser.html('');
			secondaryFontChooser.html('');
			
			$.ajax({
        type: "GET",
        url: "fonts.xml",
        dataType: "xml",
        success: function( xml ) {
        	
        	$(xml).find("outline").each(function () {
        		var font = $(this).attr('text');
						primaryFontChooser.append( '<option value="' + font + '">' + font + '</option>' );
						secondaryFontChooser.append( '<option value="' + font + '">' + font + '</option>' );
					});
					 
					/**
						Fonts selector
					**/
					var primaryFont = $.cookie('sswitcher_primary_font');
					var secondaryFont = $.cookie('sswitcher_secondary_font');
			
					var updatePrimaryFont = false;
					var updateSecondaryFont = false;
			
					if( primaryFont == undefined ) {
						primaryFont = 'Roboto';
					} else {
						updatePrimaryFont = true;
					}
			
					primaryFontChooser.val( primaryFont );
			
					if( secondaryFont == undefined ) {
						secondaryFont = 'Roboto Slab';
					} else {
						updateSecondaryFont = true;
					}
			
					secondaryFontChooser.val( secondaryFont );
			
					if( updatePrimaryFont == true || updateSecondaryFont == true ) {
						styleSwitcher.loadFonts( primaryFont, secondaryFont );
					}
					
					$('#switcher-primary-font-selector, #switcher-secondary-font-selector').each( function() {
						$( this ).selecter({
							customClass: "theme-select-input",
							cover: true
						});
					});
        	
        }
    	});
			
			/**
				Skin
			**/
			var skin = $.cookie('sswitcher_skin');
			if( skin != undefined ) {
				styleSwitcher.changeSkin( skin );
			}

			
			var body = $('body');
			
			/**
				Boxed layout
			**/
			if( $.cookie('sswitcher_boxed_layout') == 'yes' ) {
				body.addClass('boxed-layout');
				$('#switcher-boxed-layout input[value=yes]').iCheck('check');
			}
			
			/**
				Body background image & patterns change
			**/
			var bodyBg = $.cookie('sswitcher_background_class');
			if( bodyBg != undefined ) {
				body.addClass( bodyBg );
				$('#switcher-background-selector').val( bodyBg ).trigger('change');
			}
			
			var patternBg = $.cookie('sswitcher_pattern_class');
			if( patternBg != undefined ) {
				body.addClass( patternBg );
				$('#switcher-pattern-selector').val( patternBg ).trigger('change');
			}
			
			/**
				Header top menu on / off
			**/
			if( $.cookie('sswitcher_no_top_menu') == 'no' ) {
				body.addClass('no-top-menu');
				$('#switcher-header-top-menu input[value=no]').iCheck('check');
			}
			
			/**
				Header layout
			**/
			var headerLayout = $.cookie('sswitcher_header_layout');
			if( headerLayout != undefined ) {
				body.addClass( headerLayout );
				$('#switcher-header-layout input[value=' + headerLayout + ']').iCheck('check');
			}
			
		},
		
		/**
			Set page events
		**/
		events: function() {
			
			/**
				Open / close switcher
			**/
			$('#style-switcher-opener').click( function() {
				$('body').toggleClass('switcher-opened');
				$('#style-switcher').toggleClass('opened');
				return false;
			});
			
			/**
				Toggles inside switcher
			**/
			$('#style-switcher .item a').click( function() {
				$(this).toggleClass('closed');
				$(this).parent().find('.inside').slideToggle();
				return false;
			});
			
			/**
				Skin chooser
			**/
			$('#skin-switcher a').click( function() {
				var skin = $(this).data('skin');
				
				styleSwitcher.changeSkin( $(this).data('skin') );
				
				$.cookie('sswitcher_skin', skin );
				
				return false;
			});
			
			/**
				Boxed layout
			**/
			$('#switcher-boxed-layout input').change( function() {
				
				var val = $(this).val();
				var target = $('body');
				
				val == 'yes' ? target.addClass('boxed-layout') : target.removeClass('boxed-layout');
				$.cookie('sswitcher_boxed_layout', val );
				
				return false;
			});
			
			/**
				Body background image & patterns change
			**/
			$('#switcher-background-selector, #switcher-pattern-selector').change( function() {
				
				var bgs = $(this).find('option');
				var target = $('body');
				var val = $(this).val();
				
				bgs.each( function() {
					target.removeClass( $(this).attr('value') );
				}); 
				
				target.addClass( val );
				
				if( $(this).attr('id') == 'switcher-background-selector' ) {
					$.cookie('sswitcher_background_class', val );
				}
				
				if( $(this).attr('id') == 'switcher-pattern-selector' ) {
					$.cookie('sswitcher_pattern_class', val );
				}
				
			});
			
			/**
				Header top menu on / off
			**/
			$('#switcher-header-top-menu input').change( function() {
				var val = $(this).val();
				var target = $('body');
				
				val == 'no' ? target.addClass('no-top-menu') : target.removeClass('no-top-menu');
				$.cookie('sswitcher_no_top_menu', val );
				
				return false;
			});
			
			/**
				Header layouts
			**/
			$('#switcher-header-layout input').change( function() {
				
				var styles = $('#switcher-header-layout input');
				var target = $('body');
				var val = $(this).val();
				
				styles.each( function() {
					target.removeClass( $(this).val() );
				}); 
				
				target.addClass( val );
				$.cookie('sswitcher_header_layout', val );
				
				return false;
			});
			
			/**
				Fonts selector
			**/
			$('#switcher-primary-font-selector, #switcher-secondary-font-selector').change( function() {
				var FontName = $(this).val();
				
				var primaryFont = $('#switcher-primary-font-selector').val();
				var secondaryFont = $('#switcher-secondary-font-selector').val();							
			
				$.cookie('sswitcher_primary_font', primaryFont );
				$.cookie('sswitcher_secondary_font', secondaryFont );

				styleSwitcher.loadFonts( primaryFont, secondaryFont );
				
			});
			
			/**
				Reset styles
			**/
			$('#switcher-reset-styles').click( function() {
				
				styleSwitcher.loadFonts( 'Roboto', 'Roboto Slab' );
				
				var target = $('body');
				target.removeClass('no-top-menu boxed-layout');
				
				$('#switcher-background-selector option, #switcher-pattern-selector option').each( function() {
					target.removeClass( $(this).attr('value') );
				});
				
				$('#switcher-header-layout input').each( function() {
					target.removeClass( $(this).val() );
				});
				
				// set controls
				$('#switcher-boxed-layout input[value=no]').iCheck('check');
				$('#switcher-background-selector, #switcher-pattern-selector').val( '' ).trigger('change');
				$('#switcher-header-top-menu input[value=yes]').iCheck('check');
				$('#switcher-header-layout input[value=header-default]').iCheck('check');
				$('#switcher-primary-font-selector').val( 'Roboto' ).trigger('change');
				$('#switcher-secondary-font-selector').val( 'Roboto Slab' ).trigger('change');
				
				styleSwitcher.changeSkin('blue');
				
				// delete cookies
				$.removeCookie('sswitcher_boxed_layout' );
				$.removeCookie('sswitcher_background_class' );
				$.removeCookie('sswitcher_pattern_class' );
				$.removeCookie('sswitcher_no_top_menu' );
				$.removeCookie('sswitcher_header_layout' );
				$.removeCookie('sswitcher_primary_font' );
				$.removeCookie('sswitcher_secondary_font' );
				$.removeCookie('sswitcher_skin' );
				
			});
			
			/**
				Features page layout switch
			**/
			$('#demo-layout-link').click( function() {
				$('body').toggleClass('boxed-layout').toggleClass('pattern-9');
				return false;
			});
			
			
		},
		
		/**************************************************************************************************************************************
			METHODS
		**************************************************************************************************************************************/
		/**
			Load google fonts & compile LESS
		**/
		loadFonts: function( primary_font, secondary_font ) {
			
			if( primary_font == null ) {
				primary_font = 'Roboto';
			}
			
			if( secondary_font == null ) {
				secondary_font = 'Roboto Slab';
			}
			
			if( $('#font-' + primary_font ).length == 0 ) {
				$("head").append("<link id='font-" + primary_font + "' href='https://fonts.googleapis.com/css?family=" + primary_font + "' rel='stylesheet' type='text/css'>");
			}
			
			if( $('#font-' + secondary_font ).length == 0 ) {
				$("head").append("<link id='font-" + secondary_font + "' href='https://fonts.googleapis.com/css?family=" + secondary_font + "' rel='stylesheet' type='text/css'>");
			}
			
			less.modifyVars({
    		'@font_primary': primary_font,
    		'@font_secondary': secondary_font
			});
			
		},
		/**
			Change skin
		**/
		changeSkin: function( skin ) {
			
			$('link[title]').each(
				function(i) {
					this.disabled = true;
					if (this.getAttribute('title') == skin) {
						this.disabled = false;
					}
				}
			);
			
			$('#skin-switcher a i').css('opacity', 0 );
			$('#skin-switcher a[data-skin=' + skin + ']').find('i').css('opacity', 1 );
			
		}
		
	}
	
	if( $('#style-switcher').length ) {
		styleSwitcher.initialize();
	}
	
});