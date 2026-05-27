<?php
/**
 * Admin-facing functionality.
 *
 * @package Accordion
 */
class Accordion_Admin {

	private $plugin_name;
	private $version;

	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}
}
