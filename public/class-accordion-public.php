<?php
/**
 * Public-facing functionality.
 *
 * @package Accordion
 */
class Accordion_Public {

	private $plugin_name;
	private $version;

	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	public function register_assets() {
		$base_url = plugin_dir_url( __FILE__ );

		wp_register_style(
			'accordion-frontend',
			$base_url . 'css/accordion-public.css',
			array(),
			$this->version
		);

		wp_register_script(
			'accordion-frontend',
			$base_url . 'js/accordion-public.js',
			array(),
			$this->version,
			true
		);
	}
}
