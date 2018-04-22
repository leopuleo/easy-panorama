const { __ } = wp.i18n;

const {
  registerBlockType,
  createBlock
} = wp.blocks;

const { settings } = easyPanorama;

import './i18n.js';
import './editor.scss';
import PanoramaBlock from './block';

registerBlockType( 'easy-panorama/block', {
  title: __( 'Panorama' ),
  description: __('Panorama is a great way to share wide/panoramic images on your site.'),
  icon: 'cover-image',
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
      default: settings.containerHeight
    },
    startPosition: {
      type: 'number',
      default: settings.startPosition
    },
    gracefulFailure: {
      type: 'bool',
      default: settings.gracefulFailure
    },
    failureMessage: {
      type: 'string',
      default: settings.failureMessage
    },
    failureMessageInsert: {
      type: 'string',
      default: settings.failureMessage
    },
    minimumOverflow: {
      type: 'number',
      default: settings.minimumOverflow
    },
    displayMeta: {
      type: 'bool',
      default: settings.displayMeta
    }
  },
  supports: {
    html: false
  },
  transforms: {
    from: [
      {
        type: 'block',
        isMultiBlock: true,
        blocks: [ 'core/image' ],
        transform: ( attributes ) => {
          return createBlock( 'easy-panorama/block', ...attributes );
        },
      },
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
    ],
    to: [
      {
        type: 'block',
        blocks: [ 'core/image' ],
        transform: ( { id, url, alt, title } ) => {
          return createBlock( 'core/image', { id, url, alt, title } );
        },
      },
    ],
  },

  edit: PanoramaBlock,

  save: props => {
    const {
      className,
      attributes: {
        id,
        url,
        alt,
        title
      }
    } = props;
    return (
      <div className={ className } key="easypanorama-block-save">
        {
          url && (
            <figure key="easypanorama-block-save-figure">
              <img key="easypanorama-block-save-image" className={`wp-image-${ id }`} src={ url } alt={ alt } title={ title } />
            </figure>
          )
        }
      </div>
    );
  }
});
