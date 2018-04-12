const { __ } = wp.i18n;
const {
  registerBlockType,
  ImagePlaceholder,
  BlockControls,
  MediaUpload,
  InspectorControls,
  createBlock
} = wp.blocks;
const {
  Button,
  Toolbar,
  IconButton,
  RangeControl,
  ToggleControl,
  TextControl,
  PanelBody,
  Dashicon,
  Tooltip,
} = wp.components;

const { withSelect } = wp.data;

import PanoramaBlock from './block';


registerBlockType( 'easy-panorama/block', {
  title: __( 'Panorama' ),
  icon: 'format-image',
  category: 'layout',
  attributes: {
    id: {
      type: 'number',
    },
    url: {
      type: 'string',
    },
    alt: {
      type: 'string',
    },
    title: {
      type: 'string',
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
    from: [
      {
        type: 'shortcode',
        // Shortcode tag can also be an array of shortcode aliases
        tag: 'easy_panorama',
        attributes: {
          // An attribute can be source from the shortcode attributes
          mediaURL: {
            type: 'string',
            shortcode: ( { named: { id } } ) => {
                withSelect( ( select ) => {
                  const { getMedia } = select( 'core' );
                  console.log(getMedia(id));
                })
            },
          },
        },
      },
    ]
  },

  edit: PanoramaBlock,

  save() {
    // Rendering in PHP
    return null;
  },
});
