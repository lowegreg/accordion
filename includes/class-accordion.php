<?php
/**
 * Core plugin class.
 *
 * @package Accordion
 */
class Accordion {

	protected $loader;
	protected $plugin_name;
	protected $version;

	public function __construct() {
		$this->version     = defined( 'ACCORDION_VERSION' ) ? ACCORDION_VERSION : '1.0.0';
		$this->plugin_name = 'accordion';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
	}

	private function load_dependencies() {
		require_once ACCORDION_PLUGIN_DIR . 'includes/class-accordion-loader.php';
		require_once ACCORDION_PLUGIN_DIR . 'includes/class-accordion-i18n.php';
		require_once ACCORDION_PLUGIN_DIR . 'admin/class-accordion-admin.php';
		require_once ACCORDION_PLUGIN_DIR . 'public/class-accordion-public.php';
		require_once ACCORDION_PLUGIN_DIR . 'includes/class-accordion-block.php';

		$this->loader = new Accordion_Loader();
	}

	private function set_locale() {
		$plugin_i18n = new Accordion_i18n();
		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
	}

	private function define_admin_hooks() {
		$plugin_admin = new Accordion_Admin( $this->get_plugin_name(), $this->get_version() );
	}

	private function define_public_hooks() {
		$plugin_public = new Accordion_Public( $this->get_plugin_name(), $this->get_version() );
		$block         = new Accordion_Block( $this->get_plugin_name(), $this->get_version(), $plugin_public );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'register_assets' );
		$this->loader->add_action( 'init', $block, 'register_block' );
	}

	public function run() {
		$this->loader->run();
	}

	public function get_plugin_name() {
		return $this->plugin_name;
	}

	public function get_loader() {
		return $this->loader;
	}

	public function get_version() {
		return $this->version;
	}
}
