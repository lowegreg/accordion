( function() {
	'use strict';

	function closeItem( item ) {
		var trigger = item.querySelector( '.accordion__trigger' );
		var panel = item.querySelector( '.accordion__panel' );

		if ( ! trigger || ! panel ) {
			return;
		}

		trigger.setAttribute( 'aria-expanded', 'false' );
		item.classList.remove( 'is-open' );
		panel.hidden = true;
	}

	function openItem( item ) {
		var trigger = item.querySelector( '.accordion__trigger' );
		var panel = item.querySelector( '.accordion__panel' );

		if ( ! trigger || ! panel ) {
			return;
		}

		trigger.setAttribute( 'aria-expanded', 'true' );
		item.classList.add( 'is-open' );
		panel.hidden = false;
	}

	function initAccordion( accordion ) {
		var allowMultiple = accordion.getAttribute( 'data-allow-multiple' ) === 'true';
		var items = Array.prototype.filter.call( accordion.children, function( child ) {
			return child.classList && child.classList.contains( 'wp-block-accordion-item' );
		} );

		items.forEach( function( item ) {
			var trigger = item.querySelector( '.accordion__trigger' );
			var startOpen = item.getAttribute( 'data-start-open' ) === 'true';

			if ( startOpen ) {
				openItem( item );
			} else {
				closeItem( item );
			}

			if ( ! trigger ) {
				return;
			}

			trigger.addEventListener( 'click', function() {
				var isOpen = item.classList.contains( 'is-open' );

				if ( isOpen ) {
					closeItem( item );
					return;
				}

				if ( ! allowMultiple ) {
					items.forEach( function( otherItem ) {
						if ( otherItem !== item ) {
							closeItem( otherItem );
						}
					} );
				}

				openItem( item );
			} );
		} );
	}

	function initAccordions() {
		document.querySelectorAll( '.wp-block-accordion-accordion' ).forEach( initAccordion );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAccordions );
	} else {
		initAccordions();
	}
} )();
