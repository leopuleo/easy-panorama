/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var _this = this;

var __ = wp.i18n.__;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    ImagePlaceholder = _wp$blocks.ImagePlaceholder,
    BlockControls = _wp$blocks.BlockControls,
    MediaUpload = _wp$blocks.MediaUpload;
var _wp$components = wp.components,
    Button = _wp$components.Button,
    Toolbar = _wp$components.Toolbar,
    IconButton = _wp$components.IconButton;


registerBlockType('easy-panorama/block', {
  title: __('Panorama'),
  icon: 'format-image',
  category: 'layout',
  attributes: {
    mediaID: {
      type: 'number'
    },
    mediaURL: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src'
    }
  },
  edit: function edit(props) {
    var isSelected = props.isSelected,
        attributes = props.attributes,
        className = props.className;

    console.log(attributes);
    var onSelectImage = function onSelectImage(media) {
      props.setAttributes({
        mediaURL: media.url,
        mediaID: media.id
      });
    };

    if (!attributes.mediaURL) {
      return [wp.element.createElement(ImagePlaceholder, {
        className: className,
        key: 'easypanorama-placeholder',
        icon: 'format-image',
        onSelectImage: onSelectImage
      })];
    }

    var controls = isSelected && wp.element.createElement(
      BlockControls,
      { key: 'easypanorama-controls' },
      wp.element.createElement(
        Toolbar,
        null,
        wp.element.createElement(MediaUpload, {
          onSelect: onSelectImage,
          type: 'image',
          value: _this.mediaID,
          render: function render(_ref) {
            var open = _ref.open;
            return wp.element.createElement(IconButton, {
              className: 'components-toolbar__control',
              label: __('Edit image'),
              icon: 'edit',
              onClick: open
            });
          }
        })
      )
    );

    return [controls, wp.element.createElement(
      'div',
      { className: className },
      wp.element.createElement(
        'div',
        { className: 'panorama-image' },
        wp.element.createElement('img', { src: attributes.mediaURL })
      )
    )];
  },
  save: function save(props) {
    var className = props.className,
        mediaURL = props.attributes.mediaURL;


    var panoramaStyle = {
      height: '400px'
    };

    return wp.element.createElement(
      'div',
      { className: className },
      mediaURL && wp.element.createElement(
        'div',
        { className: 'easy-panorama', style: panoramaStyle },
        wp.element.createElement('img', { className: 'easy-panorama-image', src: mediaURL })
      )
    );
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=block.build.js.map