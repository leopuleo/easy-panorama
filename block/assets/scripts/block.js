const { __ } = wp.i18n;
const {
  registerBlockType,
  ImagePlaceholder,
  BlockControls,
  MediaUpload,
  InspectorControls
} = wp.blocks;
const { Button, Toolbar, IconButton, RangeControl, ToggleControl, TextControl } = wp.components;

registerBlockType( 'easy-panorama/block', {
  title: __( 'Panorama' ),
  icon: 'format-image',
  category: 'layout',
  attributes: {
    mediaID: {
      type: 'number',
    },
    mediaURL: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
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
  edit: props => {
    const { isSelected, attributes, className } = props;
    console.log(attributes);

    const onSelectImage = media => {
      props.setAttributes( {
        mediaURL: media.url,
        mediaID: media.id,
      } );
    };

    const onChangeContainerHeight = (height) => {
      props.setAttributes( {
        containerHeight: Number(height)
      } );
    };

    const onChangeStartPosition = (position) => {
      props.setAttributes( {
        startPosition: position
      } );
    };

    const onChangeGracefulFailure = () => {
      props.setAttributes( {
        gracefulFailure: !attributes.gracefulFailure
      } );
    };

    const onChangeFailureMessage = (message) => {
      props.setAttributes( {
        failureMessage: message
      } );
    }

    if(!attributes.mediaURL) {
      return [
        <ImagePlaceholder
          className={ className }
          key="easypanorama-placeholder"
          icon="format-image"
          onSelectImage={ onSelectImage}
        />
      ]
    };

    const controls = (
      isSelected && (
        <BlockControls key="easypanorama-controls">
          <Toolbar>
            <MediaUpload
              onSelect={ onSelectImage }
              type="image"
              value={ this.mediaID }
              render={ ( { open } ) => (
                <IconButton
                  className="components-toolbar__control"
                  label={ __( 'Edit image' ) }
                  icon="edit"
                  onClick={ open }
                />
              ) }
            />
          </Toolbar>
        </BlockControls>
      )
    );

    return [
      controls,
      isSelected && (
        <InspectorControls key="easypanorama-inspector">
          <h2>{ __( 'Panorama Settings' ) }</h2>
          <TextControl
            label={ __( 'Panorama height' ) }
            help={ __('Insert the height for this panoramic image container.') }
            type={ 'number' }
            value={ attributes.containerHeight }
            onChange={ onChangeContainerHeight }
          />
          <RangeControl
            label={ __( 'Start position' ) }
            help={ __( 'Determines the start position of the panorama. Insert a value from 0 (left) to 10 (right).' ) }
            value={ attributes.startPosition }
            onChange={ onChangeStartPosition }
            min={ 0 }
            max={ 10 }
          />
          <ToggleControl
            label={ __('Insert failure message') }
            checked={ attributes.gracefulFailure }
            onChange={ onChangeGracefulFailure }
          />
          <TextControl
            label={ __( 'Failure message' ) }
            help={ __('This message will appear in mobile devices with no gyroscopic data or no physical orientation support.') }
            value={ attributes.failureMessage }
            onChange={ onChangeFailureMessage }
          />
        </InspectorControls>
      ),
      <div className={ className }>
        <div className="panorama-image">
            <img src={ attributes.mediaURL } />
        </div>
      </div>
    ];
  },
  save: props => {
    const {
      className,
      attributes: {
        mediaURL
      }
    } = props;

    const panoramaStyle = {
      height: '400px'
    };

    return (
      <div className={ className }>
        {
          mediaURL && (
            <div className="easy-panorama" style={panoramaStyle}>
              <img className="easy-panorama-image" src={ mediaURL } />
            </div>
          )
        }
      </div>
    );
  }
} );
