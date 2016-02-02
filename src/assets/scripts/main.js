/* ------------------------------------------------------ *\
	Zoom Slider Script
	@author: James
	@description: Nothing to declare yet
	@link: jhink.github.io/z-slider

 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php

\* ---------------------------------------------------- */

;(function(window) {
	'use strict';

	var bodyEl  = document.body, 
		docElem = window.document.documentElement, 
		support = { transitions: Modernizr.csstransitions },
		
		// transition and event name
		transEndEventNames = { 'WebkitTransition' : 'WebkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },  
		transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ],
		onEndTransition = function ( el, callback ) {
			var onEndCallbackFn = function ( ev ) {
				if ( support.transitions ) {
					if( ev.target != this ) return;
					this.removeEventListener ( transEndEventName, onEndCallbackFn );
				}

				if( callback && typeof callback === 'function'  ) {
					callback.call(this);
				}
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			 else {
			 	onEndCallbackFn();
			 }
		},
		
		// window sizes
		win = { width: window.innerWidth, height: window.innerHeight},
		
		//some helper vars to disallow scrolling
		lockScroll = false, xscroll, yscroll,
		scrollContainer = document.querySelector('.container'),
		
		//the main slider and its items
		sliderEl = document.querySelector('.slider'),
		items = [].slice.call(sliderEl.querySelectorAll('.slide')),
		
		// total number of items
		itemsTotal = items.length,
		
		// navigation controls/arrows
		navRightCtrl = sliderEl.querySelector('.button--nav-next'),
		navLeftCtrl = sliderEl.querySelector('.button--nav-prev'),
		zoomCtrl = sliderEl.querySelector('.button--zoom'),
		
		// the main content element
		contentEl = document.querySelector('.content'),
		
		// close content control
		closeContentCtrl = contentEl.querySelector('button.button--close'),
		
		// index of current item
		current = 0,

		// check if an item is "open"
		isOpen = false,
		isFirefox = typeof InstallTrigger !== 'undefined',

		// scale body when zooming into the items, if not Firefox (the performance in Firefox is "no good" :P )
		bodyScale = isFirefox ? false : 3;

		// some helper functions
		function scrollX() { return window.pageXOffset || docElem.scrollLeft; }
		function scrollY() { return window.pageYOffset || docElem.scrollTop; }
		
		// from https://sberry.me/articles/javascript-event-throttling-amp-debouncing
		function throttle(fn, delay) {
			var allowSample = true;
			
			return function(e) {
				if ( allowSample ) {
					allowSample = false;
					setTimeout(function() { allowSample = true; }, delay);
					fn(e);
				}
			};
		}

		function init() {
			initEvents();
		}

		// event binding
		function initEvents() {
			
			// open items
			zoomCtrl.addEventListener('click', function() {
				openItem(items[current]);
			});
			
			// close content
			closeContentCtrl.addEventListener('click', closeContent);

			// navigation
			navRightCtrl.addEventListener('click', function() { navigate('right'); });
			navLeftLeftCtrl.addEventListener('click', function() { navigate('left'); });

			// window resize
			window.addEventListener('resize', throttle(function(ev) {
				// reset window sizes
				win = { width: window.innerWidth, height: window.innerHeight };

				// reset transforms for the items (slider items)
				items.forEach( function(item, pos) {
					if( pos === current ) return;
					var el = item.querySelector('.slide__mover');
					dynamics.css(el, {translateX: el.offsetWidth});
				});
			}, 10));
			
			// keyboard navigation items
			document.addEventListener( 'keydown', function( ev ) {
				if( isOpen ) return;
				var keyCode = ev.keyCode || ev.which;

				switch (keyCode) {
					case 37:
						navigate('left');
						break;
					case 39:
						navigate('right');
						break;
				}
			} );
		}
		// END initEvents()

		

}) (window); 

