<?php

namespace EasyPanorama;

/**
 * The public-facing functionality of the plugin.
 *
 * @link            https://github.com/leopuleo/easy-panorama
 * @since           0.9
 * @package         EasyPanorama
 *
 * @subpackage    EasyPanorama/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package       EasyPanorama
 * @subpackage    EasyPanorama/public
 * @author        leopuleo
 */
class EasyPanoramaPublic {

  /**
   * The ID of this plugin.
   *
   * @since    0.9
   * @access   private
   * @var      string    $plugin_name    The ID of this plugin.
   */
  private $plugin_name;

  /**
   * The version of this plugin.
   *
   * @since    0.9
   * @access   private
   * @var      string    $version    The current version of this plugin.
   */
  private $version;

  /**
   * Loading the autodetect options
   *
   * @since    0.9
   * @access   private
   * @var      array    $options_autodetect    The autodetection options.
   */
  private $options_autodetect;

  /**
   * Loading the lightbox options
   *
   * @since    0.9
   * @access   private
   * @var      array    $options_lightbox    The lightbox options.
   */
  private $options_lightbox;

  /**
   * Loading the lightbox options
   *
   * @since    0.9
   * @access   private
   * @var      array    $options_lightbox    The lightbox options.
   */
  private $options_advanced;

  /**
   * Initialize the class and set its properties.
   *
   * @since    0.9
   * @param      string    $plugin_name       The name of this plugin.
   * @param      string    $version    The version of this plugin.
   * @param      string    $options_autodetect       The autodetection options.
   * @param      string    $options_lightbox    The lightbox options.
   */
  public function __construct($plugin_name, $version, $options_autodetect, $options_lightbox, $options_advanced) {

    $this->plugin_name = $plugin_name;
    $this->version = $version;
    $this->options_autodetect = $options_autodetect;
    $this->options_lightbox = $options_lightbox;
    $this->options_advanced = $options_advanced;
  }

  /**
   * Register the stylesheets for the public-facing side of the site.
   *
   * @since    0.9
   * @access   private
   */
  public function enqueueStyles() {

    /**
     * Dequeue any existing Panorama CSS
     * Register Plugin CSS:
     * unminifiled for development (see advanced settings)
     * minified for production
     */

    wp_dequeue_style('panorama');
    wp_dequeue_style('jquery.panorama');
    wp_dequeue_style('jquery_panorama');
    wp_dequeue_style('jquery-panorama');

    if ($this->options_advanced['debugMode'] == 1) {
      wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/paver.min.css', array(), $this->version, 'all');
    } else {
      wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/paver.min.css', array(), $this->version, 'all');
    }
  }

  /**
   * Register the JavaScript for the public-facing side of the site.
   *
   * @since    0.9
   * @access   private
   */
  public function enqueueScripts() {

    /**
     * Load position of javascript files: header o footer (see advanced settings)
     */

    if ($this->options_advanced['loadingPlace'] == 'header') {
      $jsPosition = false;
    } else {
      $jsPosition = true;
    }

    /**
     * Register Panorama Scripts:
     * 1) Core
     *    unminifiled for development (see advanced settings)
     *    minified for production
     * 2) Custom init
     * 3) Localized options with vars stored in db
     */

    if ($this->options_advanced['debugMode'] == 1) {
      wp_enqueue_script($this->plugin_name . '-paver', plugin_dir_url(__FILE__) . 'js/jquery.paver.min.js', array( 'jquery'), $this->version, $jsPosition);
    } else {
      wp_enqueue_script($this->plugin_name . '-paver', plugin_dir_url(__FILE__) . 'js/jquery.paver.min.js', array( 'jquery'), $this->version, $jsPosition);
    }

    wp_enqueue_script($this->plugin_name . '-debounce', plugin_dir_url(__FILE__) . 'js/jquery.ba-throttle-debounce.min.js', array( 'jquery'), $this->version, $jsPosition);

    wp_enqueue_script($this->plugin_name .'-init', plugin_dir_url(__FILE__) . 'js/jquery.init.js', array( 'jquery'), $this->version, $jsPosition);
    //wp_localize_script($this->plugin_name .'-init', 'easyPanorama_localize_init_var', $this->localizeInitVar());
  }

  /**
   * Localize vars for Panorama init
   * Print vars stored in db and passed to js files
   *
   * @since    0.9
   * @access   private
   */

  public function localizeInitVar() {
    $localize_var = array(
      'lightbox' => array(
        'useCSS' => (bool)$this->options_lightbox['useCSS'],
        'useSVG' => (bool)$this->options_lightbox['useSVG'],
        'removeBarsOnMobile' => (bool)$this->options_lightbox['removeBarsOnMobile'],
        'hideCloseButtonOnMobile' => (bool)$this->options_lightbox['hideCloseButtonOnMobile'],
        'hideBarsDelay' => absint($this->options_lightbox['hideBarsDelay']),
        'videoMaxWidth' => absint($this->options_lightbox['videoMaxWidth']),
        'vimeoColor' => $this->sanitizeHexColor($this->options_lightbox['vimeoColor']),
        'loopAtEnd' => (bool)$this->options_lightbox['loopAtEnd'],
        'autoplayVideos' => (bool)$this->options_lightbox['autoplayVideos']
      ),
      'autodetect' => array(
        'autodetectImage' => (bool)$this->options_autodetect['image'],
        'autodetectVideo' => (bool)$this->options_autodetect['video'],
        'autodetectExclude' => sanitize_text_field($this->options_autodetect['class_exclude'])
      )
    );
    return $localize_var;
  }

  /**
   * Sanitize HEX Color
   *
   * @since    0.9
   * @access   private
   */
  private function sanitizeHexColor($color, $hash = false) {
    // Remove any spaces and special characters before and after the string
    $color = trim($color);

    // Remove any trailing '#' symbols from the color value
    $color = str_replace('#', '', $color);

    // If the string is 6 characters long then use it in pairs.
    if (3 == strlen($color)) {
        $color = substr($color, 0, 1) . substr($color, 0, 1) . substr($color, 1, 1) . substr($color, 1, 1) . substr($color, 2, 1) . substr($color, 2, 1);
    }

    $substr = array();
    for ($i = 0; $i <= 5; $i++) {
        $default    = (0 == $i) ? 'F' : ($substr[$i - 1]);
        $substr[$i] = substr($color, $i, 1);
        $substr[$i] = (false === $substr[$i] || !ctype_xdigit($substr[$i])) ? $default : $substr[$i];
    }
    $hex = implode('', $substr);

    return (!$hash) ? $hex : '#' . $hex;
  }
}
