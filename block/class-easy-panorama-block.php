<?php

namespace EasyPanorama;

if (!defined('ABSPATH')) {
   exit;
}

/**
 * The block-specific functionality of the plugin.
 *
 * @package       EasyPanorama
 * @subpackage    EasyPanorama/includes
 * @author        leopuleo
 */
class EasyPanoramaBlock {

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
   * @var      array    $options_panorama    The panorama options.
   */
  private $options_panorama;

  /**
   * Loading the lightbox options
   *
   * @since    1.0.0
   * @access   private
   * @var      array    $options_advanced    The advanced options.
   */
  private $options_advanced;

  /**
   * Initialize the class and set its properties.
   *
   * @since      1.0.0
   * @param      string    $plugin_name       The name of this plugin.
   * @param      string    $version    The version of this plugin.
   * @param      string    $options_autodetect       The autodetection options.
   * @param      string    $options_panorama    The lightbox options.
   */
  public function __construct($plugin_name, $version, $options_panorama, $options_advanced) {

    $this->plugin_name = $plugin_name;
    $this->version = $version;
    $this->options_panorama = $options_panorama;
    $this->options_advanced = $options_advanced;
  }

  /**
   * Return escaped values from database / default settings
   *
   * @since    1.1.0
   * @access   private
   */
  private function defaultSettings() {
    $defaultSettings = array(
      'containerHeight' => absint($this->options_panorama['containerHeight']),
      'startPosition' => absint($this->options_panorama['startPosition'] * 10),
      'gracefulFailure' => (bool)$this->options_panorama['gracefulFailure'],
      'failureMessage' => esc_attr($this->options_panorama['failureMessage']),
      'failureMessageInsert' => esc_attr($this->options_panorama['failureMessageInsert']),
      'minimumOverflow' => absint($this->options_panorama['minimumOverflow']),
      'displayMeta' => (bool)$this->options_panorama['meta'],
    );
    return $defaultSettings;
  }

  /**
   * Register Gutenberg Block
   *
   * @since    1.1.0
   * @access   public
   */
  public function gutenbergBlockEditorAssets() {
    if (!class_exists('WP_Block_Type_Registry')) {
      return;
    }
    wp_enqueue_script(
      $this->plugin_name . '-block',
      plugins_url('dist/block.js', __FILE__),
      [ 'wp-blocks', 'wp-i18n', 'wp-editor', 'wp-components' ],
      filemtime(plugin_dir_path(__FILE__) . 'dist/block.js')
    );

    wp_localize_script($this->plugin_name .'-block', 'easyPanorama', $this->localizeInitVar());

    wp_enqueue_style(
      $this->plugin_name . '-block-editor',
      plugins_url('dist/editor.css', __FILE__),
      [ 'wp-edit-blocks' ],
      filemtime(plugin_dir_path(__FILE__) . 'dist/editor.css')
    );
  }

  /**
   * Localize vars for Panorama Block Init
   * Print vars stored in db and passed to js files
   *
   * @since    1.1.0
   * @access   private
   */

  private function localizeInitVar() {
    $settings = $this->defaultSettings();
    $localize_var = array(
      'settings' => array(
        'containerHeight' => $settings['containerHeight'],
        'startPosition' => $settings['startPosition'],
        'gracefulFailure' => $settings['gracefulFailure'],
        'failureMessage' => $settings['failureMessage'],
        'failureMessageInsert' => $settings['failureMessageInsert'],
        'minimumOverflow' => $settings['minimumOverflow'],
        'displayMeta' => $settings['displayMeta'],
      )
    );
    return $localize_var;
  }

  /**
   * Register Gutenberg Block defaults and callback
   *
   * @since    1.1.0
   * @access   public
   */
  public function gutenbergBlockInit() {
    if (!class_exists('WP_Block_Type_Registry')) {
      return;
    }
    $settings = $this->defaultSettings();
    register_block_type('easy-panorama/block', array(
      'attributes'      => array(
        'id' => array(
          'type'      => 'number'
        ),
        'url' => array(
          'type'      => 'string'
        ),
        'alt' => array(
          'type'      => 'string'
        ),
        'title' => array(
          'type'      => 'string'
        ),
        'containerHeight' => array(
          'type'      => 'number',
          'default'   => $settings['containerHeight']
        ),
        'startPosition' => array(
          'type'      => 'number',
          'default'   => $settings['startPosition']
        ),
        'gracefulFailure' => array(
          'type'      => 'boolean',
          'default'   => $settings['gracefulFailure']
        ),
        'failureMessage' => array(
          'type'      => 'string',
          'default'   => $settings['failureMessage']
        ),
        'failureMessageInsert' => array(
          'type'      => 'string',
          'default'   => $settings['failureMessageInsert']
        ),
        'minimumOverflow' => array(
          'type'      => 'number',
          'default'   => $settings['minimumOverflow']
        ),
        'displayMeta' => array(
          'type'      => 'boolean',
          'default'   => $settings['displayMeta']
        )
      ),
      'render_callback' => array($this, 'renderCallBack'),
    ));
  }

  /**
   * Register Block Callback
   *
   * @since    1.1.0
   * @access   public
   * @var      array attributes
   */
  public function renderCallBack($atts) {

    if (!isset($atts['url'])) {
      return;
    }

    switch (true) {
      case is_feed():
        $html = '<div class="wp-block-easy-panorama-block">';
        $html .= '<figure>';
        $html .= '<img class="wp-image-' . absint($atts['id']) . '" src="' . esc_url($atts['url']) . '" alt="' . esc_attr($atts['alt']) . '" title="' . esc_attr($atts['title']) . '" />';
        $html .= '</figure>';
        $html .= '</div>';
        break;

      default:
        $position = $atts['startPosition'] / 10;
        $html = '<div class="wp-block-easy-panorama-block">';
        $html .= '<figure>';
        $html .= '<div class="easy-panorama-block"
          data-graceful-failure="' . (bool)$atts['gracefulFailure'] . '"
          data-failure-message="' . esc_attr($atts['failureMessage']) . '"
          data-failure-message-insert="' . esc_attr($atts['failureMessageInsert']) . '"
          data-meta="' . (bool)$atts['displayMeta'] . '"
          data-start-position="' . floatval($position) . '"
          data-minimum-overflow="' . absint($atts['minimumOverflow']) . '"
          style="height:' . absint($atts['containerHeight']) . 'px">';
        $html .= '<img class="wp-image-' . absint($atts['id']) . '" src="' . esc_url($atts['url']) . '" alt="' . esc_attr($atts['alt']) . '" title="' . esc_attr($atts['title']) . '" />';
        $html .= '</div>';
        $html .= '</figure>';
        $html .= '</div>';
        break;
    }

    return $html;
  }
}
