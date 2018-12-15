<?php

/**
 * Easy Panorama bootstrap file
 *
 * @link              https://github.com/leopuleo/easy-panorama
 * @since             1.0.0
 * @package           EasyPanorama
 *
 * @wordpress-plugin
 * Plugin Name: Easy Panorama
 * Plugin URI: https://github.com/leopuleo
 * Description: Embed interactive wide/panoramic images on your site. Optimised for responsive layouts, it works great with devices equipped with motion sensors.
 * Version:           1.1.4
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
 * @since    1.0.0
 */
function run_easy_panorama() {
  $plugin = new EasyPanorama\EasyPanorama();
  $plugin->run();
}
run_easy_panorama();
