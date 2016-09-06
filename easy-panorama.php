<?php

/**
 * Easy Panorama bootstrap file
 *
 * @link              https://github.com/leopuleo/easy-panorama
 * @since             0.9
 * @package           EasyPanorama
 *
 * @wordpress-plugin
 * Plugin Name: Easy Panorama
 * Plugin URI: https://github.com/leopuleo
 * Description: Easily enable <a href="http://brutaldesign.github.io/panorama/">Panorama jQuery extension</a> on all links to image or video (Youtube / Vimeo). Optimized for responsive layouts and touch devices.
 * Version:           0.9
 * Author: Leonardo Giacone
 * Author URI: https://github.com/leopuleo
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       easy-panorama
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
  die;
}

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-easy-panorama.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    0.9
 */
function run_easy_panorama() {

  $plugin = new EasyPanorama\EasyPanorama();
  $plugin->run();

}
run_easy_panorama();
