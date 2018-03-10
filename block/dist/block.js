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
    MediaUpload = _wp$blocks.MediaUpload,
    InspectorControls = _wp$blocks.InspectorControls;
var _wp$components = wp.components,
    Button = _wp$components.Button,
    Toolbar = _wp$components.Toolbar,
    IconButton = _wp$components.IconButton,
    RangeControl = _wp$components.RangeControl,
    ToggleControl = _wp$components.ToggleControl,
    TextControl = _wp$components.TextControl,
    PanelBody = _wp$components.PanelBody;


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
    }
  },
  edit: function edit(props) {
    var isSelected = props.isSelected,
        className = props.className,
        _props$attributes = props.attributes,
        mediaURL = _props$attributes.mediaURL,
        mediaID = _props$attributes.mediaID,
        containerHeight = _props$attributes.containerHeight,
        startPosition = _props$attributes.startPosition,
        gracefulFailure = _props$attributes.gracefulFailure,
        failureMessage = _props$attributes.failureMessage;


    var onSelectImage = function onSelectImage(media) {
      props.setAttributes({
        mediaURL: media.url,
        mediaID: media.id
      });
    };

    var panoramaStyle = {
      height: containerHeight + 'px'
    };

    var onChangeContainerHeight = function onChangeContainerHeight(height) {
      props.setAttributes({
        containerHeight: Number(height)
      });
    };

    var onChangeStartPosition = function onChangeStartPosition(position) {
      props.setAttributes({
        startPosition: position
      });
    };

    var onChangeGracefulFailure = function onChangeGracefulFailure() {
      props.setAttributes({
        gracefulFailure: !gracefulFailure
      });
    };

    var onChangeFailureMessage = function onChangeFailureMessage(message) {
      props.setAttributes({
        failureMessage: message
      });
    };

    if (!mediaURL) {
      return [wp.element.createElement(ImagePlaceholder, {
        className: className,
        key: 'easypanorama-placeholder',
        icon: 'format-image',
        onSelectImage: onSelectImage
      })];
    };

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

    return [controls, isSelected && wp.element.createElement(
      InspectorControls,
      { key: 'easypanorama-inspector' },
      wp.element.createElement(
        PanelBody,
        {
          title: __('Panorama Settings')
        },
        wp.element.createElement(TextControl, {
          label: __('Panorama height'),
          help: __('Insert the height for this panoramic image container.'),
          type: 'number',
          value: containerHeight,
          onChange: onChangeContainerHeight
        }),
        wp.element.createElement(RangeControl, {
          label: __('Start position'),
          help: __('Determines the start position of the panorama. Insert a value from 0 (left) to 10 (right).'),
          value: startPosition,
          onChange: onChangeStartPosition,
          min: 0,
          max: 10
        }),
        wp.element.createElement(ToggleControl, {
          label: __('Insert failure message'),
          checked: gracefulFailure,
          onChange: onChangeGracefulFailure
        }),
        wp.element.createElement(TextControl, {
          label: __('Failure message'),
          help: __('This message will appear in mobile devices with no gyroscopic data or no physical orientation support.'),
          value: failureMessage,
          onChange: onChangeFailureMessage
        })
      ),
      wp.element.createElement(PanelBody, {
        title: __('Image Settings')
      })
    ), wp.element.createElement(
      'div',
      { className: className },
      wp.element.createElement(
        'div',
        { style: panoramaStyle, className: 'panorama-image', 'data-paver': true, 'data-start-position': startPosition, 'data-graceful-failure': gracefulFailure, 'data-failure-message': failureMessage },
        wp.element.createElement('img', { src: mediaURL })
      )
    )];
  },
  save: function save(props) {
    var className = props.className,
        _props$attributes2 = props.attributes,
        mediaURL = _props$attributes2.mediaURL,
        containerHeight = _props$attributes2.containerHeight,
        startPosition = _props$attributes2.startPosition,
        gracefulFailure = _props$attributes2.gracefulFailure,
        failureMessage = _props$attributes2.failureMessage;

    var panoramaStyle = {
      height: containerHeight + 'px'
    };

    return wp.element.createElement(
      'div',
      { className: className },
      mediaURL && wp.element.createElement(
        'figure',
        null,
        wp.element.createElement(
          'div',
          { className: 'easy-panorama', 'data-start-position': startPosition, 'data-graceful-failure': gracefulFailure, 'data-failure-message': failureMessage, style: panoramaStyle },
          wp.element.createElement('img', { className: 'easy-panorama-image', src: mediaURL })
        )
      )
    );
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=block.js.map