<?php

namespace EasyPanorama;

if (!defined('ABSPATH')) {
   exit;
}

/**
 * The admin-specific functionality of the plugin.
 *
 * @package       EasyPanorama
 * @subpackage    EasyPanorama/includes
 * @author        leopuleo
 */
class EasyPanoramaAdmin {

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
   * @since    1.0.0
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
   * Register the JavaScript for the admin area.
   *
   * @since    1.0.0
   * @access   public
   */
  public function enqueueScripts() {
    wp_enqueue_media();
    wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/easy-panorama-button.js', array( 'jquery'), $this->version, false);
  }

  /**
   * Register the plugin link in plugins list page.
   *
   * @since    1.0.0
   * @access   public
   */
  public function addPluginLinks($links) {
    $custom_links = array(
      '<a href="' . admin_url('options-general.php?page=easy-panorama-settings') . '">' . __('Settings', $this->plugin_name) . '</a>'
    );
    return array_merge($links, $custom_links);
  }

  /**
   * Add button to WP Editor
   *
   * @since    1.0.0
   * @access   public
   */
  public function addPanoramaButton() {
    echo '<button type="button" id="insert-panorama" class="button insert-panorama" data-editor="content"><span class="dashicons dashicons-camera" style="color:#82878c; vertical-align:text-top;"></span> ' .  __('Add Panorama', $this->plugin_name) . '</button>';
  }

  /**
   * Add plugin option page
   *
   * @since    1.0.0
   * @access   public
   */
  public function addSettingPage() {
    add_submenu_page(
      'options-general.php',
      apply_filters($this->plugin_name . '-settings-page-title', __('Easy Panorama Settings', $this->plugin_name)),
      apply_filters($this->plugin_name . '-settings-page-title', __('Easy Panorama', $this->plugin_name)),
      'install_plugins',
      $this->plugin_name . '-settings',
      array($this, 'easyPanoramaSettingsPage')
    );
  }

  /**
   * Register setting page sections and fields
   *
   * @since    1.0.0
   * @access   public
   */
  public function settingsInit() {

    // Register Settings
    register_setting('easyPanorama_panorama', 'easyPanorama_panorama', array($this, 'sanitizePanorama'));
    register_setting('easyPanorama_advanced', 'easyPanorama_advanced', array($this, 'sanitizeAdvanced'));
    register_setting('easyPanorama_overview', 'easyPanorama_overview');

    // Section: Panorama Settings
    add_settings_section(
      'panorama_section',
      __('Panorama settings', $this->plugin_name),
      array($this, 'panoramaSectionRender'),
      'easyPanorama_panorama'
    );

    // Section: Advanced Settings
    add_settings_section(
      'advanced_section',
      __('Advanced settings', $this->plugin_name),
      array($this, 'advancedSectionRender'),
      'easyPanorama_advanced'
    );

    // Section: Overview
    add_settings_section(
      'description_section',
      __('Overview', $this->plugin_name),
      array($this, 'descriptionSectionRender'),
      'easyPanorama_overview'
    );

    // Field: Panorama Settings -> containerHeight
    add_settings_field(
      'containerHeight',
      __('Panorama height', $this->plugin_name),
      array($this, 'containerHeightRender'),
      'easyPanorama_panorama',
      'panorama_section'
    );

    // Field: Panorama Settings -> gracefulFailure
    add_settings_field(
      'gracefulFailure',
      __('Insert failure message', $this->plugin_name),
      array($this, 'gracefulFailureRender'),
      'easyPanorama_panorama',
      'panorama_section'
    );

    // Field: Panorama Settings -> failureMessage
    add_settings_field(
      'failureMessage',
      __('Failure message', $this->plugin_name),
      array($this, 'failureMessageRender'),
      'easyPanorama_panorama',
      'panorama_section'
    );

    // Field: Panorama Settings -> failureMessageInsert
    add_settings_field(
      'failureMessageInsert',
      __('Failure message position', $this->plugin_name),
      array($this, 'failureMessageInsertRender'),
      'easyPanorama_panorama',
      'panorama_section'
    );

    // Field: Panorama Settings -> meta
    add_settings_field(
      'meta',
      __('Show image meta', $this->plugin_name),
      array($this, 'metaRender'),
      'easyPanorama_panorama',
      'panorama_section'
    );

    // Field: Panorama Settings -> minimumOverflow
    add_settings_field(
      'minimumOverflow',
      __('Minimum overflow', $this->plugin_name),
      array($this, 'minimumOverflowRender'),
      'easyPanorama_panorama',
      'panorama_section'
    );

    // Field: Panorama Settings -> startPosition
    add_settings_field(
      'startPosition',
      __('Start position', $this->plugin_name),
      array($this, 'startPositionRender'),
      'easyPanorama_panorama',
      'panorama_section'
    );

    // Field: Advanced Settings -> Loading Place
    add_settings_field(
      'loading_place',
      __('Loading place', $this->plugin_name),
      array($this, 'loadingPlaceRender'),
      'easyPanorama_advanced',
      'advanced_section'
    );
  }

  /**
   * Render setting page sections and fields
   *
   * @since    1.0.0
   * @access   public
   */

  // Section: Panorama Settings
  public function panoramaSectionRender() {
    ?>
      <p><?php _e('This plugin uses <strong><a href="http://terrymun.github.io/paver/?source=easy-panorama-wp-plugin" target="_blank">Paver</a></strong>, on this page you can customize Paver behaviour and panorama appearance.', $this->plugin_name); ?>
        <?php _e('The values here below will be used as defaults for <strong>Gutenberg blocks</strong> and <code>[easy_panorama]</code> <strong>shortcodes</strong>.', $this->plugin_name); ?>
        <?php _e('You will be able to customize the appearance of each block using the <strong>inspector control</strong> provided by Gutenberg.', $this->plugin_name); ?><br>
        <?php _e('Discover more about <strong><a href="http://terrymun.github.io/paver/demo/usage-notes.html?source=easy-panorama-wp-plugin" target="_blank">Paver configuration options</a></strong>.', $this->plugin_name); ?><br>
      </p>
    <?php
  }

  public function containerHeightRender() {
    ?>
    <label>
      <input id="easyPanorama_panorama[containerHeight]" type="number" name="easyPanorama_panorama[containerHeight]" value="<?php echo $this->options_panorama['containerHeight']; ?>" />
      <?php _e('px', $this->plugin_name); ?><br>
      <em><?php _e('Insert the height for all panoramic images container (Default: 400px).', $this->plugin_name); ?></em>
    </label>
    <?php
  }

  public function gracefulFailureRender() {
    ?>
    <label>
      <input type="hidden" id="hidden_easyPanorama_panorama[gracefulFailure]" name="easyPanorama_panorama[gracefulFailure]" value="0" />
      <input id="easyPanorama_panorama[gracefulFailure]" type="checkbox" name="easyPanorama_panorama[gracefulFailure]" value="1" <?php if ($this->options_panorama['gracefulFailure'] == 1) {echo 'checked="checked"';} ?> />
      <?php _e('Insert failure message', $this->plugin_name); ?><br>
      <em><?php _e('Allows the display of failure message at the desired DOM insertion location (Default: true).', $this->plugin_name); ?></em>
    </label>
    <?php
  }

  public function failureMessageRender() {
    ?>
    <label>
      <input id="easyPanorama_panorama[failureMessage]" type="text" name="easyPanorama_panorama[failureMessage]" value="<?php echo $this->options_panorama['failureMessage']; ?>" /><br>
      <em><?php _e('This message will appear in mobile devices with no gyroscopic data or no physical orientation support. (Default: <code>Scroll left/right to pan through panorama.</code>).', $this->plugin_name); ?></em>
    </label>
    <?php
  }

  public function failureMessageInsertRender() {
    ?>
    <input id="easyPanorama_panorama[failureMessageInsert]" type="radio" name="easyPanorama_panorama[failureMessageInsert]" value="after" <?php if ($this->options_panorama['failureMessageInsert'] == 'after') {echo 'checked="checked"';} ?> /><?php _e('After', $this->plugin_name); ?>
    <input id="easyPanorama_panorama[failureMessageInsert]" type="radio" name="easyPanorama_panorama[failureMessageInsert]" value="before" <?php if ($this->options_panorama['failureMessageInsert'] == 'before') {echo 'checked="checked"';} ?> /><?php _e('Before', $this->plugin_name); ?><br>
    <em><?php _e('Select the location where the failure message will be inserted. (Default: After).', $this->plugin_name); ?></em>
    <?php
  }

  public function metaRender() {
    ?>
    <label>
      <input type="hidden" id="hidden_easyPanorama_panorama[meta]" name="easyPanorama_panorama[meta]" value="0" />
      <input id="easyPanorama_panorama[meta]" type="checkbox" name="easyPanorama_panorama[meta]" value="1" <?php if ($this->options_panorama['meta'] == 1) {echo 'checked="checked"';} ?> />
      <?php _e('Show alt/title meta on overlay', $this->plugin_name); ?><br>
      <em><?php _e('Determines whether a metadata overlay should be displayed. When enabled, the plugin will retrieve the value(s) of the title and/or alt and inject them into the Paver container. (Default: false).', $this->plugin_name); ?></em>
    </label>
    <?php
  }

  public function minimumOverflowRender() {
    ?>
    <label>
      <input id="easyPanorama_panorama[minimumOverflow]" type="number" name="easyPanorama_panorama[minimumOverflow]" value="<?php echo $this->options_panorama['minimumOverflow'];?>" />
      <?php _e('px', $this->plugin_name); ?><br>
      <em><?php _e('The excess width the picture must have before Paver kicks in (Default: 0px).', $this->plugin_name); ?></em>
    </label>
    <?php
  }

  public function startPositionRender() {
    ?>
    <input id="easyPanorama_panorama[startPosition]" type="radio" name="easyPanorama_panorama[startPosition]" value="0" <?php if ($this->options_panorama['startPosition'] == '0') {echo 'checked="checked"';} ?> /><?php _e('Left', $this->plugin_name); ?>
    <input id="easyPanorama_panorama[startPosition]" type="radio" name="easyPanorama_panorama[startPosition]" value="0.5" <?php if ($this->options_panorama['startPosition'] == '0.5') {echo 'checked="checked"';} ?> /><?php _e('Center', $this->plugin_name); ?>
    <input id="easyPanorama_panorama[startPosition]" type="radio" name="easyPanorama_panorama[startPosition]" value="1" <?php if ($this->options_panorama['startPosition'] == '1') {echo 'checked="checked"';} ?> /><?php _e('Right', $this->plugin_name); ?><br>
    <em><?php _e('Determines the start position of the panorama (Default: Center).', $this->plugin_name); ?></em>
    <?php
  }



  // Section: Advanced Settings
  public function advancedSectionRender() {
    ?>
      <p><?php _e('In this page you can customize the Easy Panorama advanced settings.', $this->plugin_name); ?> <?php _e('Please be carefull, the wrong settings combination can break your site.', $this->plugin_name); ?><br>
      </p>
    <?php
  }

  public function loadingPlaceRender() {
    ?>
      <input id="easySwipeBox_advanced[loadingPlace]" type="radio" name="easySwipeBox_advanced[loadingPlace]" value="header" <?php if ($this->options_advanced['loadingPlace'] == 'header') {echo 'checked="checked"';} ?> /><?php _e('Header', $this->plugin_name); ?>
      <input id="easySwipeBox_advanced[loadingPlace]" type="radio" name="easySwipeBox_advanced[loadingPlace]" value="footer" <?php if ($this->options_advanced['loadingPlace'] == 'footer') {echo 'checked="checked"';} ?> /><?php _e('Footer', $this->plugin_name); ?><br>
      <em><?php _e('Select where all the lightbox scripts should be placed. (Default: Footer).', $this->plugin_name); ?></em>
    <?php
  }

  // Section: Overview
  public function descriptionSectionRender() {
    ?>
      <p><?php _e('The options in this section are provided by the plugin Easy Panorama and determine the panoramic view behaviour controlled by <strong><a href="http://terrymun.github.io/paver/demo/usage-notes.html?source=easy-panorama-wp-plugin" target="_blank">Paver</a></strong>.
', $this->plugin_name); ?></p>
      <hr>
      <h3><?php _e('Plugin main features', $this->plugin_name); ?></h3>
      <ol>
        <li><?php _e('Enqueuing of Paver Javascript and CSS files.', $this->plugin_name); ?></li>
        <li><?php _e('Customization of Paver appearance and behaviour from the <strong>Panorama Settings</strong> page.', $this->plugin_name); ?></li>
        <li><?php _e('Other geek settings in the <strong>Advanced Settings</strong> page.', $this->plugin_name); ?></li>
        <li><?php _e('<code>[easy_panorama]</code> shortcode to embed panoramic images with no hassle.', $this->plugin_name); ?></li>
        <li><?php _e('Custom <strong>Gutenberg block</strong> for a better editing experience 🎉.', $this->plugin_name); ?></li>
      </ol>
      <hr>

      <h3><?php _e('Contribution', $this->plugin_name); ?></h3>
      <p><?php _e('There are many ways to contribute to this plugin:', $this->plugin_name); ?></p>
      <ol>
        <li><?php _e('Report a bug, submit pull request or new feature proposal: visit the <strong><a href="https://github.com/leopuleo/easy-panorama" target="_blank">Github Repo</a></strong>.', $this->plugin_name); ?></li>
        <li><?php _e('Translate it in your language: visit the <strong><a href="https://translate.wordpress.org/projects/wp-plugins/easy-panorama" target="_blank">WordPress translation page</a></strong>.', $this->plugin_name); ?></li>
        <li><?php _e('Rate it 5 stars on <strong><a href="https://wordpress.org/support/view/plugin-reviews/easy-panorama?filter=5#postform" target="_blank">WordPress.org</a></strong>.', $this->plugin_name); ?></li>
        <li><?php _e('<strong><a href="//paypal.me/LeonardoGiacone" target="_blank">Buy me a beer!</a></strong>', $this->plugin_name); ?></li>
      </ol>
      <hr>

      <h3><?php _e('Support', $this->plugin_name); ?></h3>
      <p><strong><?php _e('Need help?', $this->plugin_name); ?></strong>
      <?php _e('Visit the <strong><a href="https://wordpress.org/support/plugin/easy-panorama" target="_blank">WordPress.org support page</a></strong> /<strong><a href="https://github.com/leopuleo/easy-panorama/issues" target="_blank">Github Issue Tracker</a></strong>.', $this->plugin_name); ?></p>
      <p><strong><?php _e('Note:', $this->plugin_name); ?></strong> <?php _e('this plugin uses Paver jQuery plugin. For any issues or pull requests related to Paver appereance or behaviour please visit the <strong><a href="https://github.com/terrymun/paver?source=easy-panorama-wp-plugin" target="_blank">Paver Repo</a></strong>.', $this->plugin_name); ?></p>
    <?php
  }

  /**
   * Render the setting form and tabs
   *
   * @since    1.0.0
   * @access   public
   */
  public function easyPanoramaSettingsPage() {

    ?>
    <form method="post" action="options.php">
      <div class="wrap">
      <h2><?php _e('Easy Panorama Settings', $this->plugin_name); ?></h2>

    <?php
    if (isset($_GET['tab'])) {
        $active_tab = $_GET['tab'];
    } else {
      $active_tab = 'panorama_options';
    }
    ?>

    <h2 class="nav-tab-wrapper">
      <a href="<?php echo admin_url('options-general.php?page=easy-panorama-settings&tab=panorama_options');?>" class="nav-tab <?php echo $active_tab == 'panorama_options' ? 'nav-tab-active' : ''; ?>"><?php _e('Panorama', $this->plugin_name); ?></a>
      <a href="<?php echo admin_url('options-general.php?page=easy-panorama-settings&tab=advanced_options');?>" class="nav-tab <?php echo $active_tab == 'advanced_options' ? 'nav-tab-active' : ''; ?>"><?php _e('Advanced', $this->plugin_name); ?></a>
      <a href="<?php echo admin_url('options-general.php?page=easy-panorama-settings&tab=overview');?>" class="nav-tab <?php echo $active_tab == 'overview' ? 'nav-tab-active' : ''; ?>"><?php _e('Overview', $this->plugin_name); ?></a>
    </h2>

    <?php
    switch ($active_tab) {
      case 'panorama_options':
        settings_fields('easyPanorama_panorama');
        do_settings_sections('easyPanorama_panorama');
        submit_button();
        break;

      case 'advanced_options':
        settings_fields('easyPanorama_advanced');
        do_settings_sections('easyPanorama_advanced');
        submit_button();
        break;

      case 'overview':
        settings_fields('easyPanorama_overview');
        do_settings_sections('easyPanorama_overview');
        break;

      default:
        break;
    }
    ?>
      </div>
    </form>
    <?php
  }

  /**
   * Sanitize Panorama fields
   *
   * @since    1.0.0
   * @access   public
   */
  public function sanitizePanorama($input) {
    $valid_input = array();

    if (isset($input['containerHeight'])) {
      $valid_input['containerHeight'] = absint($input['containerHeight']);
    }
    if (isset($input['gracefulFailure'])) {
      $valid_input['gracefulFailure'] = (bool)($input['gracefulFailure']);
    }
    if (isset($input['failureMessage'])) {
      $valid_input['failureMessage'] = sanitize_text_field($input['failureMessage']);
    }
    if (isset($input['failureMessageInsert'])) {
      $valid_input['failureMessageInsert'] = sanitize_text_field($input['failureMessageInsert']);
    }
    if (isset($input['meta'])) {
      $valid_input['meta'] = (bool)($input['meta']);
    }
    if (isset($input['minimumOverflow'])) {
      $valid_input['minimumOverflow'] = absint($input['minimumOverflow']);
    }
    if (isset($input['startPosition'])) {
      $valid_input['startPosition'] = filter_var($input['startPosition'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    }
    return $valid_input;
  }

  /**
   * Sanitize advanced fields
   *
   * @since    1.0.0
   * @access   public
   */
  public function sanitizeAdvanced($input) {
    $valid_input = array();

    if (isset($input['loadingPlace'])) {
      $valid_input['loadingPlace'] = sanitize_text_field($input['loadingPlace']);
    }
    return $valid_input;
  }
}
