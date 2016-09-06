=== Plugin Name ===
Contributors: LeoPeo
Donate link: https://paypal.me/LeonardoGiacone
Tags: image, video, gallery, fancybox, panorama, lightbox, images, video, responsive, mobile, vimeo, youtube
Requires at least: 3.0.1
Tested up to: 4.4.1
Stable tag: 0.9
License:  GPL-2.0+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt


Easily enable the Panorama jQuery extension on all media links. Optimized for responsive layouts and touch devices.

== Description ==

Easy Panorama plugin for WordPress websites gives you a flexible, aesthetic and mobile-friendly Lightbox solution for just about all media links on your website. Easy Panorama uses the packed [Panorama](http://brutaldesign.github.io/panorama/?source=easy-panorama-wp-plugin) and is multisite compatible.

= Main features =

1. Enqueuing of Panorama Javascript and CSS files.
2. Customization of Panorama lightbox appereance and behaviour from the Lightbox Settings page.
3. Autodetection of links to images or videos. You can exclude/include media types from the Autodetection Settings page.
4. Other geek settings in the Advanced Settings page.

= Autodetection =

Select one or more options from Autodetection setting page, Easy Panorama automatically detects the media type and add `class="panorama"` to their links.
Otherwise, add `class="panorama"` yourself to make the magic happen.

If you like to exclude some images or videos from autodetection enter the selector that groups these elements.
By default, Easy Panorama uses `.no-panorama`.

= Contribution =

There are many ways to contribute to this plugin:

1. Report a bug, submit pull request or new feature proposal: visit the [Github repo](https://github.com/leopuleo/easy-panorama).
2. Translate it in your language: visit the [WordPress translation page](https://translate.wordpress.org/projects/wp-plugins/easy-panorama).
3. Rate it 5 stars on [WordPress.org](https://wordpress.org/support/view/plugin-reviews/easy-panorama?filter=5#postform).
4. [Buy me a beer!](//paypal.me/LeonardoGiacone)


= Support =

Need help? Read the [FAQ](https://wordpress.org/plugins/easy-panorama/faq/) or visit the [WordPress.org](https://wordpress.org/support/plugin/easy-panorama) support page / [Github Issue Tracker](https://github.com/leopuleo/easy-panorama/issues).

Note: this plugin use Panorama jQuery plugin as Lightbox solution. For any issues and pull requests related to Panorama functionalities please visit the [Panorama Repo](https://github.com/brutaldesign/panorama).


== Installation ==

1. Download the plugin from Wordpress repository.
1. Upload the plugin folder in `/plugins/`.
1. Activate the plugin.

Done! Now all link to image or Youtube/Vimeo opens in a beautiful mobile-friendly Lightbox.
Visit the new admin page (Settings > Easy Panorama) to enable/disable the autodetection for selected media type and customize the lightbox behaviour.


== Frequently Asked Questions ==

= Can I use Easy Panorama to show Google Maps iframe? =
Yes, Panorama support inline content, here below an example of code:

First create the selector that contains the Google Maps iframe, usually it's hidden within the page:
`<div id="mymap" style="display:none;">IFRAME_MAP</div>`

Then create your link, pointing at the selector:
`<a href="#mymap" class="panorama" title="My Map Title">Click to open the map</a>`

Done! Clicking on the link, the Google Maps iframe will be showed within the lightbox.


== Screenshots ==

1. Example of Panorama lightbox

2. Easy Panorama setting page


== Changelog ==

= 0.9 - Major release (27/01/2016) =
* New feature: Added Lightbox Setting Page. Customize the Panorama lightbox behaviour. Discover more about [Panorama options](http://brutaldesign.github.io/panorama/?source=easy-panorama-wp-plugin).
* New feature: Esclude media from autodetection. Exclude some images or videos from autodetection entering the selector that groups these elements.
* New feature: Advanced settings Page. Customize geek options, like javascript files position (header/footer) and choose to enqueue minified or unminified version of the files.
* New feature: Overview page.
* Security issue: Fix Panorama XSS vulnerability (see [Panorama pull request](https://github.com/brutaldesign/panorama/pull/268)).
* Updated readme.txt.
* Updated licence.

= 1.0.2 (22/11/2015) =
* Bug fix: moved from wp_print_scripts to wp_enqueue_scripts. Better compatibiliy with [Soil plugin](https://github.com/roots/soil) from Roots. Thanks to [Gifford Nowland](https://github.com/gnowland)

= 1.0.1 (28/10/2015) =
* Bug fix: better image format detection (jpg -> .jpg). Thanks to [jas8522](https://github.com/jas8522)
* Updated readme.txt

= 1.0 - Major release (14/09/2015) =
* Updated Panorama to 1.4.1
* Bug fix: Added support to UPPERCASE image extension
* Bug fix: Removed Panorama to Youtube User and Channel links
* New feature: Added admin page for autodetection settings.

= 0.9.1 (14/04/2015) =
* Bug fix: Added JPEG extension support
* Bug fix: Use image title as link title (alt fallback)

= 0.9 (02/02/2015) =
* First commit
