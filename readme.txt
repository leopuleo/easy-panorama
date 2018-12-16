=== Easy Panorama ===
Contributors: LeoPeo
Tags: image, panorama, panoramic image, shortcode, responsive, mobile, paver, block, gutenberg
Donate link: https://paypal.me/LeonardoGiacone
Requires at least: 4.5
Tested up to: 5.0
Requires PHP: 5.6
Stable tag: 1.1.4
License: GPL-2.0+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt


Embed interactive wide/panoramic images on your site. Optimised for responsive layouts, it works great with devices equipped with motion sensors.

== Description ==

Easy Panorama plugin for WordPress websites allows you to display wide/panoramic images in a more accessible way: enjoy your panoramic photos scrolling them on the x-axis or moving your mobile device.

You can start embedding your panoramic images using the handy **shortcode** (TinyMCE editor) or the new **Block**.

Easy Panorama uses the packed [Paver](http://terrymun.github.io/paver/?source=easy-panorama-wp-plugin).

= Main features =
1. Enqueuing of Paver Javascript and CSS files.
2. Customization of Paver appearance and behaviour from the Panorama Settings page.
3. Other geek settings in the Advanced Settings page.
4. [easy_panorama] shortcode to embed panoramic images with no hassle.
5. Custom Panorama Block for a better editing experience.

= Shortcode (Classic WordPress editor) =

Include your favourite panoramic images in posts and pages using the **built-in shortcode functionality**.

If you are using the classic WordPress editor (TinyMCE), you will find the *Add Panorama* button above the editor: click on the button and select the image you want to include.
The shortcode will be inserted in the editor and replaced by the panoramic viewer when you visit the website.

You can customize the appearance and behaviour of the panoramic viewer through the Easy Panorama settings page or adding specific attributes to each shortcode: these will override the general settings.

= Shortcode attributes cheat sheet: =

* `id`: attachment/image WordPress id *(number)* - **Required**
* `url`: image url *(string)*
* `meta`: determines whether a metadata overlay should be displayed *(boolean)*
* `title`: image title, showed on overlay in case "Show image meta" ("meta" attribute) is set to true  *(string)*
* `alt`: image alternative text, showed on overlay in case "Show image meta" ("meta" attribute) is set to true  *(string)*
* `graceful_failure`: allows the display of failure message *(boolean)*
* `failure_message`: this message will appear in mobile devices with no gyroscopic data or no physical orientation support *(string)*
* `failure_message_insert`: the location where the failure message will be inserted *(before | after)*
* `minimum_overflow`: the excess width the picture must have before panoramic viewer kicks in *(number)*
* `start_position`: the start position of the panorama *(number from 0 to 1)*

= Block (Gutenberg editor) =

Include your favourite panoramic images in posts and pages using the **built-in block functionality**.

If you are using the Gutenberg editor (WordPress >= 5.0), you find the **Panorama** block ready to be embedded in your post.
Search for "Panorama" within the blocks list, select it and choose the image you want to include.
You can customize the appearance and behaviour of each panoramic viewer thanks to the Inspector Control.

= Block features =

* Embed your panoramic/wide images in the new editor with no hassle.
* Preview your panorama within the editor.
* Customize the appearance and behaviour of each panoramic viewer thanks to the Inspector Control.
* Transform "Image" blocks into "Panorama" blocks with one click.
* Transform "Panorama" blocks into "Image" blocks with one click.
* Transform previous inserted `[easy_panorama]` shortcodes into "Panorama" blocks with one click.

= Requirements =

Easy Panorama requires:

[WordPress](https://wordpress.org/) >= 4.5 (Required for TinyMCE shortcode)
[WordPress](https://wordpress.org/) >= 5.0 (Required for the new custom Panorama Block feature)
[PHP](https://secure.php.net/manual/en/install.php) >= 5.6
[Node](https://nodejs.org/en/) >= 8.9.X (Required for Block development)
[Yarn](https://yarnpkg.com/en/docs/install) (Required for Block development)

= Contribution =

There are many ways to contribute to this plugin:

1. Report a bug, submit pull request or new feature proposal: visit the [Github repo](https://github.com/leopuleo/easy-panorama).
2. Translate it in your language: visit the [WordPress translation page](https://translate.wordpress.org/projects/wp-plugins/easy-panorama).
3. Rate it 5 stars on [WordPress.org](https://wordpress.org/support/view/plugin-reviews/easy-panorama?filter=5#postform).
4. [Buy me a beer!](//paypal.me/LeonardoGiacone)


= Support =

Need help? Read the [FAQ](https://wordpress.org/plugins/easy-panorama/faq/) or visit the [WordPress.org](https://wordpress.org/support/plugin/easy-panorama) support page / [Github Issue Tracker](https://github.com/leopuleo/easy-panorama/issues).

== Installation ==

1. Download the plugin from Wordpress repository.
1. Upload the plugin folder in `/plugins/`.
1. Activate the plugin.

Done! Now you can embed panoramic pictures into WordPress editor clicking on the "Add panorama" button. Choose the image and insert into the post/page: this will be rendered as panorama image.
If you are using the Gutenberg editor (WordPress >= 5.0), you will find the Panorama Block within the blocks list.
Visit the new admin page (Settings > Easy Panorama) to customize Paver scripts behaviour.

== Frequently Asked Questions ==

No FAQs ready yet.

== Screenshots ==

1. How to embed a Panorama using [easy_panorama] shortcode

2. How to embed a Panorama using Easy Panorama Block

3. How to transform [easy_panorama] shortcode into block

4. Easy Panorama settings page

== Changelog ==

= 1.1.4 (15/12/2018) =
* Bug fix: Added <code><MediaUploadCheck></code> + <code>allowedType</code> control
* Design: Moved tooltip help icon at bottom/right corner of the block

= 1.1.3 (05/08/2018) =
* Bug fix: Replaced <code>withAPIData</code> with <code>withSelect</code>

= 1.1.2 (03/08/2018) =
* Bug fix: Updated from Gutenberg <code>wp.blocks</code> to <code>wp.editor</code>
* Bug fix: Updated from Gutenberg <code>ImagePlaceholder</code> to <code>MediaPlaceholder</code>

= 1.1.1 (02/05/2018) =
* Bug fix: Paver dependencies are now enqueued in the right order

= 1.1.0 MAJOR RELEASE (26/04/2018) =
* Updated Paver to 1.3.4
* New feature: Gutenberg Block
* New feature: <code>[easy_panorama]</code> accepts attributes for appearance and behaviour customization. See "Shortcode" section
* Updated readme.txt
* Updated plugin Overview page

= 1.0.2 (06/05/2017) =
* Bug fix: HTML error in “Add Panorama” button + changed HTML from <code><span></code> to <code><button></code>. Thanks to [icehouze](https://wordpress.org/support/users/icehouze/)

= 1.0.1 (08/10/2016) =
* Updated Paver to 1.3.2
* Bug fix: <code>startPosition</code> value is sanitized correctly: from <code>absint</code> to <code>float</code>
* Updated readme.txt
* Updated plugin Overview page

= 1.0.0 (09/09/2016) =
* First commit

== Upgrade Notice ==

= 1.1.0 =
Major release: enjoy the new "Panorama" Gutenberg block.
