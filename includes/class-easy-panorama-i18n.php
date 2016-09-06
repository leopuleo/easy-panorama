<?php

namespace EasyPanorama;

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link            https://github.com/leopuleo/easy-panorama
 * @since           0.9
 * @package         EasyPanorama
 *
 * @subpackage      EasyPanorama/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @package         EasyPanorama
 * @subpackage      EasyPanorama/includes
 * @author          leopuleo
 */
class EasyPanoramai18n {

  /**
   * The domain specified for this plugin.
   *
   * @since    0.9
   * @access   private
   * @var      string    $domain    The domain identifier for this plugin.
   */
  private $domain;

  /**
   * Load the plugin text domain for translation.
   *
   * @since    0.9
   */
  public function loadPluginTextdomain() {

    load_plugin_textdomain(
      $this->domain,
      false,
      dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
    );

  }

  /**
   * Set the domain equal to that of the specified domain.
   *
   * @since    0.9
   * @param    string    $domain    The domain that represents the locale of this plugin.
   */
  public function setDomain($domain) {
    $this->domain = $domain;
  }
}
