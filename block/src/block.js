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
    const { attributes: { url }, image } = this.props;
    if( !url && image && image.data ) {
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

    if ( !url && image && image.isLoading ) {
      return [
        <Placeholder
          key="easypanorama-loading"
          icon="format-image"
          label={ __( 'Panorama' ) }
          className="easypanorama-loading"
        >
          <span>{ __( 'Loading...' ) }</span>
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
          key="easypanorama-error"
          icon="format-image"
          label={ __( 'Panorama' ) }
          className="easypanorama-error"
        >
          <span>{ message }</span>
        </Placeholder>,
      ];
    }

    if(!url) {
      return [
        <ImagePlaceholder
          key="easypanorama-placeholder"
          icon="format-image"
          label={ __( 'Panorama' ) }
          className={ className }
          onSelectImage={ this.onSelectImage }
        />
      ]
    };

    const controls = (
      isSelected && (
        <BlockControls key="easypanorama-controls">
          <Toolbar key="easypanorama-toolbar">
            <MediaUpload
              key="easypanorama-mediaupload"
              onSelect={ this.onSelectImage }
              type="image"
              value={ this.id }
              render={ ( { open } ) => (
                <IconButton
                  key="easypanorama-openmedia"
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
              key="easypanorama-control-containerHeight"
              label={ __( 'Container height' ) }
              help={ __('Insert the height for this panoramic image container.') }
              type={ 'number' }
              value={ containerHeight }
              onChange={ this.onChangeContainerHeight }
            />
            <RangeControl
              key="easypanorama-control-startPosition"
              label={ __( 'Start position' ) }
              help={ __( 'Determines the start position of the panorama: insert a value from 0 (left) to 10 (right).' ) }
              value={ startPosition }
              onChange={ this.onChangeStartPosition }
              min={ 0 }
              max={ 10 }
            />
            <ToggleControl
              key="easypanorama-control-displayMeta"
              label={ __('Show meta on overlay') }
              checked={ displayMeta }
              onChange={ this.onChangeDisplayMeta }
            />
            { displayMeta && (
              <TextControl
                key="easypanorama-control-title"
                label={ __( 'Title' ) }
                value={ title }
                onChange={ this.onChangeMediaTitle }
              />
            ) }
            { displayMeta && (
              <TextControl
                key="easypanorama-control-alt"
                label={ __( 'Description' ) }
                value={ alt }
                onChange={ this.onChangeMediaAlt }
              />
            ) }
          </PanelBody>
          <PanelBody title={ __('Advanced settings')} key="easypanorama-inspector-advanced">
            <TextControl
              key="easypanorama-control-minimumOverflow"
              label={ __( 'Minimum overflow' ) }
              help={ __('The excess width in pixels the container must have before panorama kicks in.') }
              type={ 'number' }
              value={ minimumOverflow }
              onChange={ this.onChangeMinimumOverflow }
            />
            <ToggleControl
              key="easypanorama-control-gracefulFailure"
              label={ __('Insert failure message') }
              checked={ gracefulFailure }
              onChange={ this.onChangeGracefulFailure }
            />
            { gracefulFailure && (
              <SelectControl
                key="easypanorama-control-failureMessageInsert"
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
                key="easypanorama-control-failureMessage"
                label={ __( 'Message' ) }
                help={ __('This message will appear in mobile devices with no gyroscopic data or no physical orientation support.') }
                value={ failureMessage }
                onChange={ this.onChangeFailureMessage }
              />
            ) }
          </PanelBody>
        </InspectorControls>
      ),
      <div className={ className } key="easypanorama-block-editor">
        <div style={ panoramaStyle } className="panorama--image" key="easypanorama-panorama-container">
          <img src={ url } alt={ alt } title={ title } className={`wp-image-${ id }`} key="easypanorama-panorama-image"/>
        </div>
        <span className="panorama--help-text" key="easypanorama-block-help">
          <Tooltip text={ __( 'This is a preview, some features are not available.' ) } key="easypanorama-block-help-tooltip">
            <span className="panorama--help-icon" key="easypanorama-block-help-icon-container">
              <Dashicon size="25" icon="info" key="easypanorama-block-help-icon"/>
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
