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
   * Register Gutenberg Block
   *
   * @since    1.1.0
   * @access   public
   */
  public function gutenbergBlockEditorAssets() {
    wp_enqueue_script(
      'easy-panorama-block',
      plugins_url('dist/block.js', __FILE__),
      array('wp-blocks', 'wp-i18n', 'wp-element'),
      filemtime(plugin_dir_path(__FILE__) . 'dist/block.js')
    );

    wp_enqueue_style(
      'easy-panorama-block-editor',
      plugins_url('dist/editor.css', __FILE__),
      array( 'wp-edit-blocks' ),
      filemtime(plugin_dir_path(__FILE__) . 'dist/editor.css')
    );
  }

  /**
   * Register Gutenberg Block defaults and callback
   *
   * @since    1.1.0
   * @access   public
   */
  public function gutenbergBlockInit() {
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
          'default'   => absint($this->options_panorama['containerHeight'])
        ),
        'startPosition' => array(
          'type'      => 'number',
          'default'   => (float)$this->options_panorama['startPosition']
        ),
        'gracefulFailure' => array(
          'type'      => 'boolean',
          'default'   => (bool)$this->options_panorama['gracefulFailure']
        ),
        'failureMessage' => array(
          'type'      => 'string',
          'default'   => sanitize_text_field($this->options_panorama['failureMessage'])
        ),
        'displayMeta' => array(
          'type'      => 'boolean',
          'default'   => (bool)$this->options_panorama['meta']
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
    if (isset($atts['url'])) {
      $html = '<div class="wp-block-easy-panorama-block">';
      $html .= '<figure>';
      $html .= '<div class="easy-panorama" data-start-position="' . (float)$atts['startPosition'] . '" data-graceful-failure="' . (bool)$atts['gracefulFailure'] . '" data-failure-message="' . sanitize_text_field($atts['failureMessage']) . '" data-meta="' . (bool)$atts['displayMeta'] . '" data-start-position="' . (float)$atts['startPosition'] . '" style="height:' . absint($atts['containerHeight']) . 'px">';
      $html .= '<img src="' . esc_url($atts['url']) . '" alt="' . sanitize_text_field($atts['alt']) . '" title="' . sanitize_text_field($atts['title']) . '" />';
      $html .= '</div>';
      $html .= '</figure>';
      $html .= '</div>';
      return $html;
    }
  }
}
