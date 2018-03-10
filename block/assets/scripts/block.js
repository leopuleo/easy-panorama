const { __ } = wp.i18n;
const {
  registerBlockType,
  ImagePlaceholder,
  BlockControls,
  MediaUpload,
  InspectorControls
} = wp.blocks;
const { Button, Toolbar, IconButton, RangeControl, ToggleControl, TextControl, PanelBody } = wp.components;

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
    const {
      isSelected,
      className,
      attributes: {
        mediaURL,
        mediaID,
        containerHeight,
        startPosition,
        gracefulFailure,
        failureMessage
      }
    } = props;

    const onSelectImage = media => {
      props.setAttributes( {
        mediaURL: media.url,
        mediaID: media.id,
      } );
    };

    const panoramaStyle = {
      height: containerHeight + 'px'
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
        gracefulFailure: !gracefulFailure
      } );
    };

    const onChangeFailureMessage = (message) => {
      props.setAttributes( {
        failureMessage: message
      } );
    }

    if(!mediaURL) {
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
          <PanelBody
            title={ __( 'Panorama Settings' ) }
          >
            <TextControl
              label={ __( 'Panorama height' ) }
              help={ __('Insert the height for this panoramic image container.') }
              type={ 'number' }
              value={ containerHeight }
              onChange={ onChangeContainerHeight }
            />
            <RangeControl
              label={ __( 'Start position' ) }
              help={ __( 'Determines the start position of the panorama. Insert a value from 0 (left) to 10 (right).' ) }
              value={ startPosition }
              onChange={ onChangeStartPosition }
              min={ 0 }
              max={ 10 }
            />
            <ToggleControl
              label={ __('Insert failure message') }
              checked={ gracefulFailure }
              onChange={ onChangeGracefulFailure }
            />
            <TextControl
              label={ __( 'Failure message' ) }
              help={ __('This message will appear in mobile devices with no gyroscopic data or no physical orientation support.') }
              value={ failureMessage }
              onChange={ onChangeFailureMessage }
            />
          </PanelBody>
          <PanelBody
            title={ __( 'Image Settings' ) }
          >
          </PanelBody>
        </InspectorControls>
      ),
      <div className={ className }>
        <div style={panoramaStyle} className="panorama-image" data-paver data-start-position={startPosition} data-graceful-failure={gracefulFailure} data-failure-message={failureMessage}>
            <img src={ mediaURL } />
        </div>
      </div>
    ];
  },
  save: props => {
    const {
      className,
      attributes: {
        mediaURL,
        containerHeight,
        startPosition,
        gracefulFailure,
        failureMessage
      }
    } = props;
    const panoramaStyle = {
      height: containerHeight + 'px'
    };

    return (
      <div className={ className }>
        {
          mediaURL && (
            <figure>
              <div className="easy-panorama" data-start-position={startPosition} data-graceful-failure={gracefulFailure} data-failure-message={failureMessage} style={panoramaStyle}>
                <img className="easy-panorama-image" src={ mediaURL } />
              </div>
            </figure>
          )
        }
      </div>
    );
  }
} );
