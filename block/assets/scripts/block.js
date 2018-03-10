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
    mediaAlt: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'alt',
    },
    mediaTitle: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'title',
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
        mediaAlt,
        mediaTitle,
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
        mediaAlt: media.alt,
        mediaTitle: media.title
      } );
    };

    const panoramaStyle = {
      height: containerHeight + 'px'
    };

    const onChangeMediaAlt = (alt) => {
      props.setAttributes( {
        mediaAlt: alt
      } );
    };

    const onChangeMediaTitle = (title) => {
      props.setAttributes( {
        mediaTitle: title
      } );
    };

    const onChangeContainerHeight = (height) => {
      props.setAttributes( {
        containerHeight: Number(height)
      } );
    };

    const adjustStartPosition = (position) => {
      return position / 10;
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
          <PanelBody title={ __( 'Panorama Settings' ) }>
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
          </PanelBody>
          <PanelBody title={ __( 'Image Settings' ) }>
            <TextControl
              label={ __( 'Textual Alternative' ) }
              help={ __('Describe the purpose of the image. Leave empty if the image is not a key part of the content.') }
              value={ mediaAlt }
              onChange={ onChangeMediaAlt }
            />
            <TextControl
              label={ __( 'Image Title' ) }
              help={ __('Describe the purpose of the image. Leave empty if the image is not a key part of the content.') }
              value={ mediaTitle }
              onChange={ onChangeMediaTitle }
            />
          </PanelBody>
          <PanelBody title={ __('Advanced Settings')}>
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
        </InspectorControls>
      ),
      <div className={ className }>
        <div style={panoramaStyle} className="panorama-image" data-paver data-start-position={adjustStartPosition(startPosition)} data-graceful-failure={gracefulFailure} data-failure-message={failureMessage}>
            <img src={ mediaURL } alt={ mediaAlt } title={ mediaTitle } />
        </div>
      </div>
    ];
  },
  save: props => {
    const {
      className,
      attributes: {
        mediaURL,
        mediaAlt,
        mediaTitle,
        containerHeight,
        startPosition,
        gracefulFailure,
        failureMessage
      }
    } = props;

    const panoramaStyle = {
      height: containerHeight + 'px'
    };

    const adjustStartPosition = (position) => {
      return position / 10;
    };

    return (
      <div className={ className }>
        {
          mediaURL && (
            <figure>
              <div className="easy-panorama" data-start-position={adjustStartPosition(startPosition)} data-graceful-failure={gracefulFailure} data-failure-message={failureMessage} style={panoramaStyle}>
                <img className="easy-panorama-image" src={ mediaURL } alt={ mediaAlt } title={ mediaTitle } />
              </div>
            </figure>
          )
        }
      </div>
    );
  }
} );
