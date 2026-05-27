<?php
/**
 * Register and wire the accordion blocks.
 *
 * @package Accordion
 */
class Accordion_Block {

	private $plugin_name;
	private $version;
	private $assets;

	public function __construct( $plugin_name, $version, $assets ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
		$this->assets      = $assets;
	}

	public function register_block() {
		if ( ! function_exists( 'register_block_type_from_metadata' ) ) {
			return;
		}

		$this->assets->register_assets();

		wp_register_script(
			'accordion-editor',
			ACCORDION_PLUGIN_URL . 'admin/js/accordion-block.js',
			array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
			$this->version,
			true
		);

		wp_register_style(
			'accordion-editor',
			ACCORDION_PLUGIN_URL . 'admin/css/accordion-block-editor.css',
			array( 'wp-edit-blocks' ),
			$this->version
		);

		register_block_type_from_metadata( ACCORDION_PLUGIN_DIR . 'blocks/accordion' );
		register_block_type_from_metadata( ACCORDION_PLUGIN_DIR . 'blocks/item' );
	}
}
