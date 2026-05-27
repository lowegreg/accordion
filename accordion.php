<?php
/**
 * Plugin bootstrap file for Accordion.
 *
 * @link              https://northcoastcreative.com.au
 * @since             1.0.0
 * @package           Accordion
 *
 * @wordpress-plugin
 * Plugin Name:       Accordion
 * Plugin URI:        https://northcoastcreative.com.au
 * Description:       A lightweight accordion block plugin with nested Gutenberg block content.
 * Version:           1.0.0
 * Author:            Greg Lowe
 * Author URI:        https://northcoastcreative.com.au/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       accordion
 * Domain Path:       /languages
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'ACCORDION_VERSION', '1.0.0' );
define( 'ACCORDION_PLUGIN_FILE', __FILE__ );
define( 'ACCORDION_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'ACCORDION_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require ACCORDION_PLUGIN_DIR . 'includes/class-accordion.php';

function run_accordion() {
	$plugin = new Accordion();
	$plugin->run();
}
run_accordion();
