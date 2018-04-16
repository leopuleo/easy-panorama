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
          'default'   => 400
        ),
        'startPosition' => array(
          'type'      => 'number',
          'default'   => 5
        ),
        'gracefulFailure' => array(
          'type'      => 'boolean',
          'default'   => true
        ),
        'failureMessage' => array(
          'type'      => 'string',
          'default'   => __('Scroll left/right to pan through panorama.', $this->plugin_name)
        ),
        'failureMessageInsert' => array(
          'type'      => 'string',
          'default'   => 'after'
        ),
        'minimumOverflow' => array(
          'type'      => 'number',
          'default'   => 0
        ),
        'displayMeta' => array(
          'type'      => 'boolean',
          'default'   => false
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

      case is_amp_endpoint():
        $image = wp_get_attachment_image_src(absint($atts['id']), 'full');
        $srcset = wp_get_attachment_image_srcset(absint($atts['id']), 'full');
        $html = '<amp-img src="' . esc_url($atts['url']) . '" alt="' . esc_attr($atts['alt']) . '" srcset="' . esc_html($srcset) . '" title="' . esc_attr($atts['title']) . '" width="' . esc_attr($image[1]) . '" height="' . esc_attr($image[2]) . '" layout="responsive"></amp-img>';
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
