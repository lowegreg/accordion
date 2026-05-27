( function( blocks, blockEditor, components, element, i18n ) {
	'use strict';

	var registerBlockType = blocks.registerBlockType;
	var useBlockProps = blockEditor.useBlockProps;
	var InnerBlocks = blockEditor.InnerBlocks;
	var InspectorControls = blockEditor.InspectorControls;
	var RichText = blockEditor.RichText;
	var PanelBody = components.PanelBody;
	var ToggleControl = components.ToggleControl;
	var Placeholder = components.Placeholder;
	var TextControl = components.TextControl;
	var SelectControl = components.SelectControl;
	var createElement = element.createElement;
	var Fragment = element.Fragment;
	var useEffect = element.useEffect;
	var __ = i18n.__;

	var ITEM_BLOCK = 'accordion/item';
	var ICON_OPTIONS = [
		{ label: __( 'No icon', 'accordion' ), value: '' },
		{ label: __( 'Chevron Down', 'accordion' ), value: 'fa-solid fa-chevron-down' },
		{ label: __( 'Circle Info', 'accordion' ), value: 'fa-solid fa-circle-info' },
		{ label: __( 'Circle Question', 'accordion' ), value: 'fa-solid fa-circle-question' },
		{ label: __( 'Plus', 'accordion' ), value: 'fa-solid fa-plus' },
		{ label: __( 'Star', 'accordion' ), value: 'fa-solid fa-star' },
		{ label: __( 'Custom class', 'accordion' ), value: '__custom__' }
	];

	function renderTitleIcon( iconClass ) {
		if ( ! iconClass ) {
			return null;
		}

		return createElement(
			'span',
			{ className: 'accordion__title-icon', 'aria-hidden': 'true' },
			createElement( 'i', { className: iconClass } )
		);
	}

	function getSelectedIconOption( iconClass ) {
		var matchesPreset = ICON_OPTIONS.some( function( option ) {
			return option.value && option.value !== '__custom__' && option.value === iconClass;
		} );

		if ( ! iconClass ) {
			return '';
		}

		return matchesPreset ? iconClass : '__custom__';
	}

	registerBlockType( 'accordion/accordion', {
		apiVersion: 3,
		title: __( 'Accordion', 'accordion' ),
		description: __( 'A simple accordion container.', 'accordion' ),
		icon: 'list-view',
		category: 'widgets',
		attributes: {
			allowMultiple: { type: 'boolean', default: false }
		},
		edit: function( props ) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var blockProps = useBlockProps( { className: 'accordion-editor accordion-editor--accordion' } );

			return createElement(
				Fragment,
				null,
				createElement(
					InspectorControls,
					null,
					createElement(
						PanelBody,
						{
							title: __( 'Accordion Settings', 'accordion' ),
							initialOpen: true
						},
						createElement( ToggleControl, {
							label: __( 'Allow multiple items open', 'accordion' ),
							checked: !! attributes.allowMultiple,
							onChange: function( value ) {
								setAttributes( { allowMultiple: value } );
							}
						} )
					)
				),
				createElement(
					'div',
					blockProps,
					createElement(
						Placeholder,
						{
							label: __( 'Accordion', 'accordion' ),
							instructions: __( 'Add accordion items and place any blocks inside each item.', 'accordion' )
						},
						createElement( InnerBlocks, {
							allowedBlocks: [ ITEM_BLOCK ],
							template: [ [ ITEM_BLOCK ] ],
							templateLock: false,
							orientation: 'vertical'
						} )
					)
				)
			);
		},
		save: function( props ) {
			var blockProps = blockEditor.useBlockProps.save( {
				className: 'accordion',
				'data-allow-multiple': props.attributes.allowMultiple ? 'true' : 'false'
			} );

			return createElement(
				'div',
				blockProps,
				createElement( InnerBlocks.Content )
			);
		}
	} );

	registerBlockType( 'accordion/item', {
		apiVersion: 3,
		title: __( 'Accordion Item', 'accordion' ),
		description: __( 'A single accordion item.', 'accordion' ),
		icon: 'excerpt-view',
		category: 'widgets',
		parent: [ 'accordion/accordion' ],
		attributes: {
			title: { type: 'string', default: __( 'Accordion Item', 'accordion' ) },
			startOpen: { type: 'boolean', default: false },
			uniqueId: { type: 'string', default: '' },
			titleIconClass: { type: 'string', default: '' },
			titleIconPosition: { type: 'string', default: 'left' }
		},
		edit: function( props ) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var blockProps = useBlockProps( { className: 'accordion-editor accordion-editor--item' } );
			var titleIcon = renderTitleIcon( attributes.titleIconClass );
			var selectedIconOption = getSelectedIconOption( attributes.titleIconClass );

			useEffect( function() {
				if ( ! attributes.uniqueId && props.clientId ) {
					setAttributes( { uniqueId: props.clientId.replace( /-/g, '' ).slice( 0, 12 ) } );
				}
			}, [ attributes.uniqueId, props.clientId ] );

			return createElement(
				Fragment,
				null,
				createElement(
					InspectorControls,
					null,
					createElement(
						PanelBody,
						{
							title: __( 'Item Settings', 'accordion' ),
							initialOpen: true
						},
						createElement( ToggleControl, {
							label: __( 'Open by default', 'accordion' ),
							checked: !! attributes.startOpen,
							onChange: function( value ) {
								setAttributes( { startOpen: value } );
							}
						} ),
						createElement( SelectControl, {
							label: __( 'Title icon', 'accordion' ),
							value: selectedIconOption,
							options: ICON_OPTIONS,
							onChange: function( value ) {
								if ( value === '__custom__' ) {
									if ( ! attributes.titleIconClass || getSelectedIconOption( attributes.titleIconClass ) !== '__custom__' ) {
										setAttributes( { titleIconClass: 'fa-solid fa-circle-info' } );
									}
									return;
								}

								setAttributes( { titleIconClass: value } );
							}
						} ),
						selectedIconOption === '__custom__' ? createElement( TextControl, {
							label: __( 'Custom Font Awesome class', 'accordion' ),
							value: attributes.titleIconClass,
							onChange: function( value ) {
								setAttributes( { titleIconClass: value } );
							},
							help: __( 'Example: fa-solid fa-circle-info. Font Awesome must already be loaded by the theme or another plugin.', 'accordion' )
						} ) : null,
						createElement( SelectControl, {
							label: __( 'Icon position', 'accordion' ),
							value: attributes.titleIconPosition,
							options: [
								{ label: __( 'Left', 'accordion' ), value: 'left' },
								{ label: __( 'Right', 'accordion' ), value: 'right' }
							],
							onChange: function( value ) {
								setAttributes( { titleIconPosition: value } );
							}
						} )
					)
				),
				createElement(
					'div',
					blockProps,
					createElement(
						'div',
						{ className: 'accordion-editor__title' },
						attributes.titleIconPosition === 'left' ? titleIcon : null,
						createElement( RichText, {
							tagName: 'div',
							className: 'accordion-editor__title-text',
							value: attributes.title,
							placeholder: __( 'Accordion title', 'accordion' ),
							onChange: function( value ) {
								setAttributes( { title: value } );
							},
							allowedFormats: []
						} ),
						attributes.titleIconPosition === 'right' ? titleIcon : null
					),
					createElement(
						'div',
						{ className: 'accordion-editor__panel' },
						createElement( InnerBlocks, {
							templateLock: false,
							renderAppender: InnerBlocks.ButtonBlockAppender
						} )
					)
				)
			);
		},
		save: function( props ) {
			var attributes = props.attributes;
			var blockProps = blockEditor.useBlockProps.save( {
				className: 'accordion__item',
				'data-start-open': attributes.startOpen ? 'true' : 'false'
			} );
			var panelId = 'accordion-panel-' + ( attributes.uniqueId || 'item' );
			var titleIcon = renderTitleIcon( attributes.titleIconClass );

			return createElement(
				'div',
				blockProps,
				createElement(
					'h3',
					{ className: 'accordion__heading' },
					createElement(
						'button',
						{
							type: 'button',
							className: 'accordion__trigger',
							'aria-expanded': attributes.startOpen ? 'true' : 'false',
							'aria-controls': panelId
						},
						createElement(
							'span',
							{ className: 'accordion__trigger-content accordion__trigger-content--' + attributes.titleIconPosition },
							attributes.titleIconPosition === 'left' ? titleIcon : null,
							createElement( 'span', { className: 'accordion__title' }, attributes.title ),
							attributes.titleIconPosition === 'right' ? titleIcon : null
						),
						createElement( 'span', { className: 'accordion__icon', 'aria-hidden': 'true' } )
					)
				),
				createElement(
					'div',
					{
						id: panelId,
						className: 'accordion__panel',
						hidden: attributes.startOpen ? undefined : true
					},
					createElement(
						'div',
						{ className: 'accordion__panel-inner' },
						createElement( InnerBlocks.Content )
					)
				)
			);
		}
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.components, window.wp.element, window.wp.i18n );
