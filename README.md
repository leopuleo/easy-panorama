# Easy Panorama (WordPress Plugin)
[![Build Status](https://travis-ci.org/leopuleo/easy-panorama.svg?branch=master)](https://travis-ci.org/leopuleo/easy-panorama)

Embed interactive wide/panoramic images on your site. Optimised for responsive layouts, it works great with devices equipped with motion sensors.

# Description

Easy Panorama plugin for WordPress websites allows you to display wide/panoramic images in a more accessible way: enjoy your panoramic photos scrolling them on the x-axis or moving your mobile device.

You can start embedding your panoramic images using the handy **shortcode** (TinyMCE editor) or the new **Block**.

Easy Panorama uses the packed [Paver](http://terrymun.github.io/paver/?source=easy-panorama-wp-plugin) :smile:.

# Main features

1. Enqueuing of Paver Javascript and CSS files.
2. Customization of Paver appearance and behaviour from the Panorama Settings page.
3. Other geek settings in the Advanced Settings page.
4. [easy_panorama] shortcode to embed panoramic images with no hassle.
5. Custom Panorama Block for a better editing experience 🎉.

## Shortcode (Classic WordPress editor)

![Easy Panorama Shortcode](https://www.adventuresbook.net/wp-content/uploads/2018/04/easy-panorama-shortcode.gif)

Include your favourite panoramic images in posts and pages using the **built-in shortcode functionality**.

If you are using the classic WordPress editor (TinyMCE), you will find the *Add Panorama* button above the editor: click on the button and select the image you want to include. 
The shortcode will be inserted in the editor and replaced by the panoramic viewer when you visit the website.

You can customize the appearance and behaviour of the panoramic viewer through the Easy Panorama settings page or adding specific attributes to each shortcode: these will override the general settings.

### Shortcode attributes cheat sheet:
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

## Block (Gutenberg editor)
![Easy Panorama Block](https://www.adventuresbook.net/wp-content/uploads/2018/04/easy-panorama-gutenberg-block.gif)
Include your favourite panoramic images in posts and pages using the **built-in block functionality**.

If you are using the Gutenberg editor (WordPress >= 5.0), you find the **Panorama** block ready to be embedded in your post.
Search for "Panorama" within the blocks list, select it and choose the image you want to include.
You can customize the appearance and behaviour of each panoramic viewer thanks to the Inspector Control.

### Block features
* Embed your panoramic/wide images in the new editor with no hassle.
* Preview your panorama within the editor.
* Customize the appearance and behaviour of each panoramic viewer thanks to the Inspector Control.
* Transform "Image" blocks into "Panorama" blocks with one click.
* Transform "Panorama" blocks into "Image" blocks with one click.
* Transform previous inserted `[easy_panorama]` shortcodes into "Panorama" blocks with one click.

![Easy Panorama Shortcode Transform](https://www.adventuresbook.net/wp-content/uploads/2018/04/easy-panorama-block-transform.gif)

# Requirements
Easy Panorama requires:
* [WordPress](https://wordpress.org/) >= 4.5 (Required for TinyMCE shortcode)
* [WordPress](https://wordpress.org/) >= 5.0 (Required for the new custom Panorama Block feature)
* [PHP](https://secure.php.net/manual/en/install.php) >= 5.6
* [Node](https://nodejs.org/en/) >= 8.9.X (Required for Block feature development)
* [Yarn](https://yarnpkg.com/en/docs/install) (Required for Block feature development)

# Contribution
There are many ways to contribute to this plugin:

1. Report a bug, submit a pull request or new feature proposal: visit the [Github repo](https://github.com/leopuleo/easy-panorama).
2. Translate it in your language: visit the [WordPress translation page](https://translate.wordpress.org/projects/wp-plugins/easy-panorama).
3. Rate it 5 stars on [WordPress.org](https://wordpress.org/support/view/plugin-reviews/easy-panorama?filter=5#postform).
4. [Buy me a beer! :beer:](//paypal.me/LeonardoGiacone)

# Support
Visit the [WordPress.org](https://wordpress.org/support/plugin/easy-panorama) or [Github Issue Tracker](https://github.com/leopuleo/easy-panorama/issues).

# Licence
[GPL-2.0+](http://www.gnu.org/licenses/gpl-2.0.txt)
