<?php
/**
 * Internationalization utilities.
 *
 * @package Accordion
 */
class Accordion_i18n {

	public function load_plugin_textdomain() {
		load_plugin_textdomain(
			'accordion',
			false,
			dirname( plugin_basename( ACCORDION_PLUGIN_FILE ) ) . '/languages/'
		);
	}
}
