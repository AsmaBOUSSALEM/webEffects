jQuery.noConflict()( function($){
	"use strict";
	
	var comingSoonCore = {
		
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
		
			// Countdown timer
			$("#countdown").countdown({
				date: "8 Jan 2015 00:00:00",
				format: "on"
			},
			function() {
				// callback function
			});
		
		},
		/**
			Set page events
		**/
		events: function() {
		
			/** add placeholders to IE8 **/
			$('.ie8 #input-email').val( $('.ie8 #input-email').attr('placeholder') );

			var phEmail = $('.ie8 #input-email').val();
	
			$('.ie8 #input-email').focus( function() {
				if( this.value == phEmail ) this.value = '';
			});
	
			$('.ie8 #input-email').blur( function() {
				if( $.trim( $(this).val() ) == '' ) $(this).val( phEmail );		
			});
			
		}
		
	}
	
	comingSoonCore.initialize();
	
});