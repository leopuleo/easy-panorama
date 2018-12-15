<?php

namespace EasyPanorama;

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link            https://github.com/leopuleo/easy-panorama
 * @since           1.0.0
 * @package         EasyPanorama
 *
 * @subpackage      EasyPanorama/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @package       EasyPanorama
 * @subpackage    EasyPanorama/includes
 * @author        leopuleo
 */

class EasyPanorama {

  /**
   * The loader that's responsible for maintaining and registering all hooks that power
   * the plugin.
   *
   * @since    1.0.0
   * @access   protected
   * @var      EasySwipeboxLoader    $loader    Maintains and registers all hooks for the plugin.
   */
  protected $loader;

  /**
   * The unique identifier of this plugin.
   *
   * @since    1.0.0
   * @access   protected
   * @var      string    $plugin_name    The string used to uniquely identify this plugin.
   */
  protected $plugin_name;

  /**
   * The current version of the plugin.
   *
   * @since    1.0.0
   * @access   protected
   * @var      string    $version    The current version of the plugin.
   */
  protected $version;

  /**
   * The main dir of this plugin.
   *
   * @since    1.0.0
   * @access   protected
   * @var      string    $version    The current version of the plugin.
   */
  protected $plugin_basename;

  /**
   * Panorama options of this plugin.
   *
   * @since    1.0.0
   * @access   protected
   * @var      array    $options_panorama    The options for panorama behaviour and appereance.
   */
  protected $options_panorama;

  /**
   * Advanced options of this plugin.
   *
   * @since    1.0.0
   * @access   protected
   * @var      array    $options_advanced    The advanced options for the plugin.
   */
  protected $options_advanced;

  /**
   * Define the core functionality of the plugin.
   *
   * Set the plugin name and the plugin version that can be used throughout the plugin.
   * Load the dependencies, define the locale, and set the hooks for the admin area and
   * the public-facing side of the site.
   *
   * @since    1.0.0
   */
  public function __construct() {

    $this->plugin_name = 'easy-panorama';
    $this->version = '1.1.4';
    $this->plugin_basename = plugin_basename(plugin_dir_path(__DIR__) . $this->plugin_name . '.php');

    // Define defaults for panorama options
    $this->defaults_panorama = array (
      'containerHeight' => '400',
      'gracefulFailure' => 1,
      'failureMessage' => __('Scroll left/right to pan through panorama.', $this->plugin_name),
      'failureMessageInsert' => 'after',
      'meta' => 0,
      'minimumOverflow' => '0',
      'startPosition' => '0.5',
    );

    // Define defaults for advanced options
    $this->defaults_advanced = array (
      'loadingPlace' => 'footer',
    );

    $this->options_panorama = wp_parse_args(get_option('easyPanorama_panorama'), $this->defaults_panorama);
    $this->options_advanced = wp_parse_args(get_option('easyPanorama_advanced'), $this->defaults_advanced);

    $this->loadDependencies();
    $this->setLocale();
    $this->defineAdminHooks();
    $this->definePublicHooks();
    $this->defineBlockHooks();
  }

  /**
   * Load the required dependencies for this plugin.
   *
   * Include the following files that make up the plugin:
   *
   * - EasyPanoramaLoader. Orchestrates the hooks of the plugin.
   * - EasyPanoramai18n. Defines internationalization functionality.
   * - EasyPanoramaAdmin. Defines all hooks for the admin area.
   * - EasyPanoramaPublic. Defines all hooks for the public side of the site.
   * - EasyPanoramaBlock. Defines all hooks for the Gutenberg side of the site.
   *
   * Create an instance of the loader which will be used to register the hooks
   * with WordPress.
   *
   * @since    1.0.0
   * @access   private
   */
  private function loadDependencies() {

    /**
     * The class responsible for orchestrating the actions and filters of the
     * core plugin.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-easy-panorama-loader.php';

    /**
     * The class responsible for defining internationalization functionality
     * of the plugin.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-easy-panorama-i18n.php';

    /**
     * The class responsible for defining all actions that occur in the admin area.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-easy-panorama-admin.php';

    /**
     * The class responsible for defining all actions that occur in the public-facing
     * side of the site.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'public/class-easy-panorama-public.php';

    /**
     * The class responsible for defining all actions that occur in the Gutenberg
     * side of the site.
     */
    require_once plugin_dir_path(dirname(__FILE__)) . 'block/class-easy-panorama-block.php';

    $this->loader = new EasyPanoramaLoader();
  }

  /**
   * Define the locale for this plugin for internationalization.
   *
   * Uses the Plugin_Name_i18n class in order to set the domain and to register the hook
   * with WordPress.
   *
   * @since    1.0.0
   * @access   private
   */
  private function setLocale() {

    $plugin_i18n = new EasyPanoramai18n();
    $plugin_i18n->setDomain($this->getPluginName());

    $this->loader->addAction('plugins_loaded', $plugin_i18n, 'loadPluginTextdomain');
  }

  /**
   * Register all of the hooks related to the admin area functionality
   * of the plugin.
   *
   * @since    1.0.0
   * @access   private
   */
  private function defineAdminHooks() {

    $plugin_admin = new EasyPanoramaAdmin($this->getPluginName(), $this->getVersion(), $this->getOptionsPanorama(), $this->getOptionsAdvanced(), $this->getPluginBasename());

    $this->loader->addAction('admin_enqueue_scripts', $plugin_admin, 'enqueueScripts');
    $this->loader->addAction('admin_menu', $plugin_admin, 'addSettingPage');
    $this->loader->addAction('admin_init', $plugin_admin, 'settingsInit');
    $this->loader->addAction('media_buttons', $plugin_admin, 'addPanoramaButton');
    $this->loader->addFilter('plugin_action_links_' . $this->plugin_basename, $plugin_admin, 'addPluginLinks');
  }

  /**
   * Register all of the hooks related to the public-facing functionality
   * of the plugin.
   *
   * @since    1.0.0
   * @access   private
   */
  private function definePublicHooks() {

    $plugin_public = new EasyPanoramaPublic($this->getPluginName(), $this->getVersion(), $this->getOptionsPanorama(), $this->getOptionsAdvanced());

    $this->loader->addAction('wp_enqueue_scripts', $plugin_public, 'enqueueStyles');
    $this->loader->addAction('wp_enqueue_scripts', $plugin_public, 'enqueueScripts');
    $this->loader->addShortcode('easy_panorama', $plugin_public, 'shortcodeConfig');
  }

  /**
   * Register all of the hooks related to the Gutenberg-facing functionality
   * of the plugin.
   *
   * @since    1.1.0
   * @access   private
   */
  private function defineBlockHooks() {
    $plugin_block = new EasyPanoramaBlock($this->getPluginName(), $this->getVersion(), $this->getOptionsPanorama(), $this->getOptionsAdvanced());
    $this->loader->addAction('enqueue_block_editor_assets', $plugin_block, 'gutenbergBlockEditorAssets');
    $this->loader->addAction('init', $plugin_block, 'gutenbergBlockInit');
  }

  /**
   * Run the loader to execute all of the hooks with WordPress.
   *
   * @since    1.0.0
   */
  public function run() {
    $this->loader->run();
  }

  /**
   * The name of the plugin used to uniquely identify it within the context of
   * WordPress and to define internationalization functionality.
   *
   * @since     1.0.0
   * @return    string    The name of the plugin.
   */
  public function getPluginName() {
    return $this->plugin_name;
  }

  /**
   * The reference to the class that orchestrates the hooks with the plugin.
   *
   * @since     1.0.0
   * @return    Plugin_Name_Loader    Orchestrates the hooks of the plugin.
   */
  public function getLoader() {
    return $this->loader;
  }

  /**
   * Retrieve the version number of the plugin.
   *
   * @since     1.0.0
   * @return    string    The version number of the plugin.
   */
  public function getVersion() {
    return $this->version;
  }

  /**
   * Retrieve the main dir of the plugin.
   *
   * @since     1.0.0
   * @return    string    The version number of the plugin.
   */
  public function getPluginBasename() {
    return $this->plugin_basename;
  }

  /**
   * Retrieve the options for panorama settings.
   *
   * @since     1.0.0
   * @return    array    The options for panorama setting.
   */
  public function getOptionsPanorama() {
    return $this->options_panorama;
  }

  /**
   * Retrieve the options for advanced settings.
   *
   * @since     1.0.0
   * @return    array    The options for advanced setting.
   */
  public function getOptionsAdvanced() {
    return $this->options_advanced;
  }
}
