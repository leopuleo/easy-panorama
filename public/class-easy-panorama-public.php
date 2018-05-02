<?php

namespace EasyPanorama;

/**
 * The public-facing functionality of the plugin.
 *
 * @link            https://github.com/leopuleo/easy-panorama
 * @since           1.0.0
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
   * @since    1.0.0
   * @access   private
   * @var      string    $plugin_name    The ID of this plugin.
   */
  private $plugin_name;

  /**
   * The version of this plugin.
   *
   * @since    1.0.0
   * @access   private
   * @var      string    $version    The current version of this plugin.
   */
  private $version;

  /**
   * Loading the panorama options
   *
   * @since    1.0.0
   * @access   private
   * @var      array    $options_panorama   The panorama options.
   */
  private $options_panorama;

  /**
   * Loading the advanced options
   *
   * @since    1.0.0
   * @access   private
   * @var      array    $options_advanced    The advanced options for the plugin.
   */
  private $options_advanced;

  /**
   * Initialize the class and set its properties.
   *
   * @since    1.0.0
   * @param    string    $plugin_name       The name of this plugin.
   * @param    string    $version    The version of this plugin.
   * @param    string    $options_panorama   The panorama options.
   * @param    string    $options_advanced   The advanced options.
   */
  public function __construct($plugin_name, $version, $options_panorama, $options_advanced) {

    $this->plugin_name = $plugin_name;
    $this->version = $version;
    $this->options_panorama = $options_panorama;
    $this->options_advanced = $options_advanced;
  }

  /**
   * Register the stylesheets for the public-facing side of the site.
   *
   * @since    1.0.0
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

    wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/paver.min.css', array(), $this->version, 'all');
  }

  /**
   * Register the JavaScript for the public-facing side of the site.
   *
   * @since    1.0.0
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

    wp_enqueue_script($this->plugin_name . '-debounce', plugin_dir_url(__FILE__) . 'js/jquery.ba-throttle-debounce.min.js', array( 'jquery'), $this->version, $jsPosition);
    wp_enqueue_script($this->plugin_name . '-paver', plugin_dir_url(__FILE__) . 'js/jquery.paver.min.js', array( 'jquery', $this->plugin_name . '-debounce'), $this->version, $jsPosition);
    wp_enqueue_script($this->plugin_name .'-init', plugin_dir_url(__FILE__) . 'js/jquery.init.js', array( 'jquery'), $this->version, $jsPosition);
    wp_localize_script($this->plugin_name .'-init', 'easyPanorama_localize_init_var', $this->localizeInitVar());
  }

  /**
   * Localize vars for Panorama init
   * Print vars stored in db and passed to js files
   *
   * @since    1.0.0
   * @access   private
   */

  public function localizeInitVar() {
    $localize_var = array(
      'panorama' => array(
        'gracefulFailure' => (bool)$this->options_panorama['gracefulFailure'],
        'failureMessage' => esc_attr($this->options_panorama['failureMessage']),
        'failureMessageInsert' => esc_attr($this->options_panorama['failureMessageInsert']),
        'meta' => (bool)$this->options_panorama['meta'],
        'minimumOverflow' => absint($this->options_panorama['minimumOverflow']),
        'startPosition' => (float)$this->options_panorama['startPosition'],
      )
    );
    return $localize_var;
  }

  /**
   * Register shortcode configuration
   *
   * @since    1.0.0
   * @access   public
   */
  public function shortcodeConfig($atts) {

    // Setting default attributes for shortcode
    $default = array(
      'id'                      => '1',
      'url'                     => '',
      'title'                   => '',
      'alt'                     => '',
      'container_height'        => absint($this->options_panorama['containerHeight']),
      'graceful_failure'        => (bool)$this->options_panorama['gracefulFailure'],
      'failure_message'         => esc_attr($this->options_panorama['failureMessage']),
      'failure_message_insert'  => esc_attr($this->options_panorama['failureMessageInsert']),
      'meta'                    => (bool)$this->options_panorama['meta'],
      'minimum_overflow'        => absint($this->options_panorama['minimumOverflow']),
      'start_position'          => (float)$this->options_panorama['startPosition']
    );

    $atts = shortcode_atts(
      $default,
      $atts,
      'easy_panorama'
    );

    ob_start();
    // Retrieve Panorama attributes
    $id = $atts['id'];
    $url = $atts['url'];
    $title = $atts['title'];
    $alt = $atts['alt'];
    $height = $atts['container_height'];
    $graceful_failure = $atts['graceful_failure'];
    $failure_message = $atts['failure_message'];
    $failure_message_insert = $atts['failure_message_insert'];
    $meta = $atts['meta'];
    $minimum_overflow = $atts['minimum_overflow'];
    $start_position = $atts['start_position'];

    //Retrieve Panorama/attachment meta
    if (empty($url)) {
      $url = wp_get_attachment_url($id);
    }
    if (empty($title)) {
      $title = get_the_title($id);
    }
    if (empty($alt)) {
      $alt = get_post_meta($id, '_wp_attachment_image_alt', true);
    }

    echo '
      <div class="easy-panorama"
        data-graceful-failure="' . (bool)$graceful_failure . '"
        data-failure-message="' . esc_attr($failure_message) . '"
        data-failure-message-insert="' . esc_attr($failure_message_insert) . '"
        data-meta="' . (bool)$meta . '"
        data-minimum-overflow="' . absint($minimum_overflow) . '"
        data-start-position="' . floatval($start_position) . '"
        data-minimum-overflow="' . absint($start_position) . '"
        style="height:' . absint($height) . 'px">
        <img src="' . esc_url($url) . '" title="' . esc_attr($title) . '" alt="' . esc_attr($alt) . '">
      </div>
    ';

    return ob_get_clean();
  }
}
