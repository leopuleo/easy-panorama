const { __ } = wp.i18n;

const { Component } = wp.element;

const {
  ImagePlaceholder,
  BlockControls,
  MediaUpload,
  InspectorControls
} = wp.blocks;

const {
  Button,
  Toolbar,
  IconButton,
  RangeControl,
  ToggleControl,
  TextControl,
  SelectControl,
  PanelBody,
  Dashicon,
  Tooltip,
  withAPIData,
  Placeholder
} = wp.components;

class PanoramaBlock extends Component {
  constructor() {
    super( ...arguments );
    this.setImageData = this.setImageData.bind( this );
    this.onSelectImage = this.onSelectImage.bind( this );
    this.onChangeMediaAlt = this.onChangeMediaAlt.bind( this );
    this.onChangeMediaTitle = this.onChangeMediaTitle.bind( this );
    this.onChangeContainerHeight = this.onChangeContainerHeight.bind( this );
    this.onChangeStartPosition = this.onChangeStartPosition.bind( this );
    this.onChangeGracefulFailure = this.onChangeGracefulFailure.bind( this );
    this.onChangeFailureMessage = this.onChangeFailureMessage.bind( this );
    this.onChangeFailureMessageInsert = this.onChangeFailureMessageInsert.bind( this );
    this.onChangeMinimumOverflow = this.onChangeMinimumOverflow.bind( this );
    this.onChangeDisplayMeta = this.onChangeDisplayMeta.bind( this );
  }

  componentDidUpdate() {
    const { image } = this.props;
    if(image && image.data) {
      this.setImageData(image.data);
    }
  }

  setImageData ( data ) {
    const { attributes: { id, url, alt, title }, setAttributes } = this.props;
    if( !url ) {
      setAttributes( {
        url: data.source_url
      })
    }
    if( !alt ) {
      setAttributes( {
        alt: data.alt_text
      })
    }
    if( !title ) {
      setAttributes( {
        title: data.title.rendered
      })
    }
  }

  onSelectImage( media ) {
    this.props.setAttributes( {
      url: media.url,
      id: media.id,
      alt: media.alt,
      title: media.title
    } );
  };

  onChangeMediaAlt( alt ){
    this.props.setAttributes( {
      alt: alt
    } );
  };

  onChangeMediaTitle( title ) {
    this.props.setAttributes( {
      title: title
    } );
  };

  onChangeContainerHeight(height) {
    this.props.setAttributes( {
      containerHeight: Number(height)
    } );
  };

  onChangeStartPosition( position ) {
    this.props.setAttributes( {
      startPosition: position
    } );
  };

  onChangeGracefulFailure() {
    const { attributes: { gracefulFailure }, setAttributes } = this.props;
    setAttributes( {
      gracefulFailure: !gracefulFailure
    } );
  };

  onChangeFailureMessage( message ) {
    this.props.setAttributes( {
      failureMessage: message
    } );
  }

  onChangeFailureMessageInsert( position ) {
    this.props.setAttributes( {
      failureMessageInsert: position
    } );
  }

  onChangeMinimumOverflow( value ) {
    this.props.setAttributes( {
      minimumOverflow: value
    })
  }

  onChangeDisplayMeta() {
    const { attributes: { displayMeta }, setAttributes } = this.props;
    setAttributes( {
      displayMeta: !displayMeta
    } );
  }

  render() {
    const {
      isSelected,
      className,
      image,
      attributes: {
        url,
        id,
        alt,
        title,
        containerHeight,
        startPosition,
        gracefulFailure,
        failureMessage,
        failureMessageInsert,
        minimumOverflow,
        displayMeta
      }
    } = this.props;

    const panoramaStyle = {
      height: containerHeight + 'px'
    };

    if ( image && image.isLoading ) {
      return [
        <Placeholder
          icon="format-image"
          label={ __( 'Panorama' ) }
          className="easypanorama-loading"
        >
          <span> { __( 'Loading...' ) } </span>
        </Placeholder>,
      ];
    }

    if ( image && image.error ) {
      const { error: { status } } = image;
      let message = __( 'Generic error' );

      if(status === 404) {
        message = __( 'Image not found: invalid attachment ID.' );
      }

      return [
        <Placeholder
          icon="format-image"
          label={ __( 'Panorama' ) }
          className="easypanorama-loading"
        >
          <span>{ message }</span>
        </Placeholder>,
      ];
    }

    if(!url) {
      return [
        <ImagePlaceholder
          icon="format-image"
          label={ __( 'Panorama' ) }
          className={ className }
          key="easypanorama-placeholder"
          onSelectImage={ this.onSelectImage }
        />
      ]
    };

    const controls = (
      isSelected && (
        <BlockControls key="easypanorama-controls">
          <Toolbar>
            <MediaUpload
              onSelect={ this.onSelectImage }
              type="image"
              value={ this.id }
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
          <PanelBody title={ __( 'Panorama settings' ) } key="easypanorama-inspector-settings">
            <TextControl
              label={ __( 'Panorama height' ) }
              help={ __('Insert the height for this panoramic image container.') }
              type={ 'number' }
              value={ containerHeight }
              onChange={ this.onChangeContainerHeight }
            />
            <RangeControl
              label={ __( 'Start position' ) }
              help={ __( 'Determines the start position of the panorama: insert a value from 0 (left) to 10 (right).' ) }
              value={ startPosition }
              onChange={ this.onChangeStartPosition }
              min={ 0 }
              max={ 10 }
            />
            <ToggleControl
              label={ __('Show meta on overlay') }
              checked={ displayMeta }
              onChange={ this.onChangeDisplayMeta }
            />
            { displayMeta && (
              <TextControl
                label={ __( 'Title' ) }
                help={ __('Give a title to this image, it will be displayed over the image. This is the alt meta of the image.') }
                value={ alt }
                onChange={ this.onChangeMediaAlt }
              />
            ) }
            { displayMeta && (
              <TextControl
                label={ __( 'Description' ) }
                help={ __('Give a description to this image, it will be displayed over the image. This is the title meta of the image.') }
                value={ title }
                onChange={ this.onChangeMediaTitle }
              />
            ) }
          </PanelBody>
          <PanelBody title={ __('Advanced settings')} key="easypanorama-inspector-advanced">
            <TextControl
              label={ __( 'Minimum overflow' ) }
              help={ __('The excess width in pixels the container must have before panorama kicks in.') }
              type={ 'number' }
              value={ minimumOverflow }
              onChange={ this.onChangeMinimumOverflow }
            />
            <ToggleControl
              label={ __('Insert failure message') }
              checked={ gracefulFailure }
              onChange={ this.onChangeGracefulFailure }
            />
            { gracefulFailure && (
              <SelectControl
                label={ __( 'Position' ) }
                value={ failureMessageInsert }
                options={ [
                  { value: 'after', label: 'After the panorama container' },
                  { value: 'before', label: 'Before the panorama container' },
                ] }
                onChange={ this.onChangeFailureMessageInsert }
              />
            ) }
            { gracefulFailure && (
               <TextControl
                label={ __( 'Message' ) }
                help={ __('This message will appear in mobile devices with no gyroscopic data or no physical orientation support.') }
                value={ failureMessage }
                onChange={ this.onChangeFailureMessage }
              />
            ) }
          </PanelBody>
        </InspectorControls>
      ),
      <div className={ className }>
        <div style={ panoramaStyle } className="panorama--image">
          <img src={ url } alt={ alt } title={ title } />
        </div>
        <span className="panorama--help-text">
          <Tooltip text={ __( 'This is a preview, some features are not available.' ) }>
            <span className="panorama--help-icon">
              <Dashicon size="25" icon="info" />
            </span>
          </Tooltip>
        </span>
      </div>
    ];
  }
}

export default withAPIData( ( props ) => {
  const { id } = props.attributes;
  if ( !id ) {
    return {};
  }
  return {
    image: `/wp/v2/media/${ id }`,
  };
} )( PanoramaBlock );
