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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(1);
var __ = wp.i18n.__;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    ImagePlaceholder = _wp$blocks.ImagePlaceholder,
    BlockControls = _wp$blocks.BlockControls,
    MediaUpload = _wp$blocks.MediaUpload,
    InspectorControls = _wp$blocks.InspectorControls,
    createBlock = _wp$blocks.createBlock;
var _wp$components = wp.components,
    Button = _wp$components.Button,
    Toolbar = _wp$components.Toolbar,
    IconButton = _wp$components.IconButton,
    RangeControl = _wp$components.RangeControl,
    ToggleControl = _wp$components.ToggleControl,
    TextControl = _wp$components.TextControl,
    PanelBody = _wp$components.PanelBody,
    Dashicon = _wp$components.Dashicon,
    Tooltip = _wp$components.Tooltip;
var withSelect = wp.data.withSelect;




registerBlockType('easy-panorama/block', {
  title: __('Panorama'),
  icon: 'format-image',
  category: 'layout',
  attributes: {
    id: {
      type: 'number'
    },
    url: {
      type: 'string'
    },
    alt: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    containerHeight: {
      type: 'number',
      default: 400
    },
    startPosition: {
      type: 'number',
      default: 5
    },
    gracefulFailure: {
      type: 'bool',
      default: true
    },
    failureMessage: {
      type: 'string',
      default: __('Scroll left/right to pan through panorama.')
    },
    displayMeta: {
      type: 'bool',
      default: false
    }
  },
  supports: {
    html: false
  },
  transforms: {
    from: [{
      type: 'shortcode',
      // Shortcode tag can also be an array of shortcode aliases
      tag: 'easy_panorama',
      attributes: {
        // An attribute can be source from the shortcode attributes
        mediaURL: {
          type: 'string',
          shortcode: function shortcode(_ref) {
            var id = _ref.named.id;

            withSelect(function (select) {
              var _select = select('core'),
                  getMedia = _select.getMedia;

              console.log(getMedia(id));
            });
          }
        }
      }
    }]
  },

  edit: __WEBPACK_IMPORTED_MODULE_0__block__["a" /* default */],

  save: function save() {
    // Rendering in PHP
    return null;
  }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var Component = wp.element.Component;
var _wp$blocks = wp.blocks,
    ImagePlaceholder = _wp$blocks.ImagePlaceholder,
    BlockControls = _wp$blocks.BlockControls,
    MediaUpload = _wp$blocks.MediaUpload,
    InspectorControls = _wp$blocks.InspectorControls;
var _wp$components = wp.components,
    Button = _wp$components.Button,
    Toolbar = _wp$components.Toolbar,
    IconButton = _wp$components.IconButton,
    RangeControl = _wp$components.RangeControl,
    ToggleControl = _wp$components.ToggleControl,
    TextControl = _wp$components.TextControl,
    PanelBody = _wp$components.PanelBody,
    Dashicon = _wp$components.Dashicon,
    Tooltip = _wp$components.Tooltip;

var PanoramaBlock = function (_Component) {
  _inherits(PanoramaBlock, _Component);

  function PanoramaBlock() {
    _classCallCheck(this, PanoramaBlock);

    var _this = _possibleConstructorReturn(this, (PanoramaBlock.__proto__ || Object.getPrototypeOf(PanoramaBlock)).apply(this, arguments));

    _this.onSelectImage = _this.onSelectImage.bind(_this);
    _this.onChangeMediaAlt = _this.onChangeMediaAlt.bind(_this);
    _this.onChangeMediaTitle = _this.onChangeMediaTitle.bind(_this);
    _this.onChangeContainerHeight = _this.onChangeContainerHeight.bind(_this);
    _this.onChangeStartPosition = _this.onChangeStartPosition.bind(_this);
    _this.onChangeGracefulFailure = _this.onChangeGracefulFailure.bind(_this);
    _this.onChangeFailureMessage = _this.onChangeFailureMessage.bind(_this);
    _this.onChangeDisplayMeta = _this.onChangeDisplayMeta.bind(_this);
    return _this;
  }

  _createClass(PanoramaBlock, [{
    key: 'onSelectImage',
    value: function onSelectImage(media) {
      this.props.setAttributes({
        url: media.url,
        id: media.id,
        alt: media.alt,
        title: media.title
      });
    }
  }, {
    key: 'onChangeMediaAlt',
    value: function onChangeMediaAlt(alt) {
      this.props.setAttributes({
        alt: alt
      });
    }
  }, {
    key: 'onChangeMediaTitle',
    value: function onChangeMediaTitle(title) {
      this.props.setAttributes({
        title: title
      });
    }
  }, {
    key: 'onChangeContainerHeight',
    value: function onChangeContainerHeight(height) {
      this.props.setAttributes({
        containerHeight: Number(height)
      });
    }
  }, {
    key: 'onChangeStartPosition',
    value: function onChangeStartPosition(position) {
      this.props.setAttributes({
        startPosition: position
      });
    }
  }, {
    key: 'onChangeGracefulFailure',
    value: function onChangeGracefulFailure() {
      var _props = this.props,
          gracefulFailure = _props.attributes.gracefulFailure,
          setAttributes = _props.setAttributes;

      setAttributes({
        gracefulFailure: !gracefulFailure
      });
    }
  }, {
    key: 'onChangeFailureMessage',
    value: function onChangeFailureMessage(message) {
      this.props.setAttributes({
        failureMessage: message
      });
    }
  }, {
    key: 'onChangeDisplayMeta',
    value: function onChangeDisplayMeta() {
      var _props2 = this.props,
          displayMeta = _props2.attributes.displayMeta,
          setAttributes = _props2.setAttributes;

      setAttributes({
        displayMeta: !displayMeta
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          isSelected = _props3.isSelected,
          className = _props3.className,
          _props3$attributes = _props3.attributes,
          url = _props3$attributes.url,
          id = _props3$attributes.id,
          alt = _props3$attributes.alt,
          title = _props3$attributes.title,
          containerHeight = _props3$attributes.containerHeight,
          startPosition = _props3$attributes.startPosition,
          gracefulFailure = _props3$attributes.gracefulFailure,
          failureMessage = _props3$attributes.failureMessage,
          displayMeta = _props3$attributes.displayMeta;


      var panoramaStyle = {
        height: containerHeight + 'px'
      };

      if (!url) {
        return [wp.element.createElement(ImagePlaceholder, {
          icon: 'format-image',
          label: __('Panorama'),
          className: className,
          key: 'easypanorama-placeholder',
          onSelectImage: this.onSelectImage
        })];
      };

      var controls = isSelected && wp.element.createElement(
        BlockControls,
        { key: 'easypanorama-controls' },
        wp.element.createElement(
          Toolbar,
          null,
          wp.element.createElement(MediaUpload, {
            onSelect: this.onSelectImage,
            type: 'image',
            value: this.id,
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

      return [controls, isSelected && wp.element.createElement(
        InspectorControls,
        { key: 'easypanorama-inspector' },
        wp.element.createElement(
          PanelBody,
          { title: __('Panorama Settings') },
          wp.element.createElement(TextControl, {
            label: __('Panorama height'),
            help: __('Insert the height for this panoramic image container.'),
            type: 'number',
            value: containerHeight,
            onChange: this.onChangeContainerHeight
          }),
          wp.element.createElement(RangeControl, {
            label: __('Start position'),
            help: __('Determines the start position of the panorama. Insert a value from 0 (left) to 10 (right).'),
            value: startPosition,
            onChange: this.onChangeStartPosition,
            min: 0,
            max: 10
          }),
          wp.element.createElement(ToggleControl, {
            label: __('Show alt/title meta on overlay'),
            checked: displayMeta,
            onChange: this.onChangeDisplayMeta
          }),
          displayMeta && wp.element.createElement(TextControl, {
            label: __('Title'),
            help: __('Give a title to this image, it will be displayed over the image. This is the alt meta of the image.'),
            value: alt,
            onChange: this.onChangeMediaAlt
          }),
          displayMeta && wp.element.createElement(TextControl, {
            label: __('Description'),
            help: __('Give a description to this image, it will be displayed over the image. This is the title meta of the image.'),
            value: title,
            onChange: this.onChangeMediaTitle
          })
        ),
        wp.element.createElement(
          PanelBody,
          { title: __('Advanced Settings') },
          wp.element.createElement(ToggleControl, {
            label: __('Insert failure message'),
            checked: gracefulFailure,
            onChange: this.onChangeGracefulFailure
          }),
          gracefulFailure && wp.element.createElement(TextControl, {
            label: __('Failure message'),
            help: __('This message will appear in mobile devices with no gyroscopic data or no physical orientation support.'),
            value: failureMessage,
            onChange: this.onChangeFailureMessage
          })
        )
      ), wp.element.createElement(
        'div',
        { className: className },
        wp.element.createElement(
          'div',
          { style: panoramaStyle, className: 'panorama--image' },
          wp.element.createElement('img', { src: url, alt: alt, title: title })
        ),
        wp.element.createElement(
          'span',
          { className: 'panorama--help-text' },
          wp.element.createElement(
            Tooltip,
            { text: __('This is a preview, some features are not available.') },
            wp.element.createElement(
              'span',
              { className: 'panorama--help-icon' },
              wp.element.createElement(Dashicon, { size: '25', icon: 'info' })
            )
          )
        )
      )];
    }
  }]);

  return PanoramaBlock;
}(Component);

/* harmony default export */ __webpack_exports__["a"] = (PanoramaBlock);

/***/ })
/******/ ]);
//# sourceMappingURL=block.js.map