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
      plugins_url( 'dist/block.build.js', __FILE__ ),
      array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
      filemtime( plugin_dir_path( __FILE__ ) . 'dist/block.build.js' )
    );

    wp_enqueue_style(
      'easy-panorama-block-editor',
      plugins_url( 'dist/editor.css', __FILE__ ),
      array( 'wp-edit-blocks' ),
      filemtime( plugin_dir_path( __FILE__ ) . 'dist/editor.css' )
    );
  }
}