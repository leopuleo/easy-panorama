const { __ } = wp.i18n;

const {
  registerBlockType,
  createBlock
} = wp.blocks;

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
        tag: 'easy_panorama',
        attributes: {
          id: {
            type: 'number',
            shortcode: ( { named: { id } } ) => {
              return id;
            },
          },
          url: {
            type: 'string',
            shortcode: ( { named: { url } } ) => {
              return url;
            },
          },
          title: {
            type: 'string',
            shortcode: ( { named: { title } } ) => {
              return title;
            },
          },
          alt: {
            type: 'string',
            shortcode: ( { named: { alt } } ) => {
              return alt;
            },
          },
          height: {
            type: 'number',
            shortcode: ( { named: { height } } ) => {
              return height;
            },
          },
          graceful_failure: {
            type: 'bool',
            shortcode: ( { named: { graceful_failure } } ) => {
              return graceful_failure;
            },
          },
          failure_message: {
            type: 'string',
            shortcode: ( { named: { failure_message } } ) => {
              return failure_message;
            },
          },
          failure_message_insert: {
            type: 'string',
            shortcode: ( { named: { failure_message_insert } } ) => {
              return failure_message_insert;
            },
          },
          meta: {
            type: 'bool',
            shortcode: ( { named: { meta } } ) => {
              return meta;
            },
          },
          minimum_overflow: {
            type: 'number',
            shortcode: ( { named: { minimum_overflow } } ) => {
              return minimum_overflow;
            },
          },
          start_position: {
            type: 'number',
            shortcode: ( { named: { start_position } } ) => {
              return start_position;
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
