const { __ } = wp.i18n;

const { Component } = wp.element;

const {
  MediaPlaceholder,
  MediaUpload,
  MediaUploadCheck,
  BlockControls,
  InspectorControls
} = wp.editor

const {
  Toolbar,
  IconButton,
  RangeControl,
  ToggleControl,
  TextControl,
  SelectControl,
  PanelBody,
  Dashicon,
  Tooltip,
  Placeholder
} = wp.components;

const { withSelect } = wp.data;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

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

  componentDidMount() {
    const { attributes: { url }, image } = this.props;
    if( !url && image && image.data !== undefined ) {
      this.setImageData(image.data);
    }
  }

  componentDidUpdate() {
    const { attributes: { url }, image } = this.props;
    if( !url && image ) {
      this.setImageData(image);
    }
  }

  /**
   * @description Set component data from received params
   * @param {object} Image data
   * @return {array} Errors
   */
  setImageData ( data ) {
    const { attributes: { url, alt, title }, setAttributes } = this.props;
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

  /**
   * @description Handle component image selection
   * @param {object} Component media data
   */
  onSelectImage( media ) {
    this.props.setAttributes( {
      url: media.url,
      id: media.id,
      alt: media.alt,
      title: media.title
    } );
  };

  /**
   * @description Handle component image alt update
   * @param {string} Image alt
   */
  onChangeMediaAlt( alt ){
    this.props.setAttributes( {
      alt: alt
    } );
  };

  /**
   * @description Handle component image title update
   * @param {string} Image title
   */
  onChangeMediaTitle( title ) {
    this.props.setAttributes( {
      title: title
    } );
  };

  /**
   * @description Handle component container height update
   * @param {string} Container height
   */
  onChangeContainerHeight(height) {
    this.props.setAttributes( {
      containerHeight: Number(height)
    } );
  };

  /**
   * @description Handle component startPosition update
   * @param {string} startPosition
   */
  onChangeStartPosition( position ) {
    this.props.setAttributes( {
      startPosition: position
    } );
  };

  /**
   * @description Handle component gracefulFailure update
   * @param none
   */
  onChangeGracefulFailure() {
    const { attributes: { gracefulFailure }, setAttributes } = this.props;
    setAttributes( {
      gracefulFailure: !gracefulFailure
    } );
  };

  /**
   * @description Handle component failureMessage update
   * @param {string} failureMessage
   */
  onChangeFailureMessage( message ) {
    this.props.setAttributes( {
      failureMessage: message
    } );
  }

  /**
   * @description Handle component failureMessageInsert update
   * @param {string} failureMessageInsert
   */
  onChangeFailureMessageInsert( position ) {
    this.props.setAttributes( {
      failureMessageInsert: position
    } );
  }

  /**
   * @description Handle component minimumOverflow update
   * @param {string} minimumOverflow
   */
  onChangeMinimumOverflow( value ) {
    this.props.setAttributes( {
      minimumOverflow: value
    })
  }

  /**
   * @description Handle component displayMeta update
   * @param none
   */
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

    if ( !url && image ) {
      return [
        <Placeholder
          key="easypanorama-loading"
          icon="cover-image"
          label={ __( 'Panorama' ) }
          className="easypanorama-loading"
        >
          <span>{ __( 'Loading...' ) }</span>
        </Placeholder>,
      ];
    }

    if(!url && !image) {
      return [
        <MediaPlaceholder
          key="easypanorama-placeholder"
          icon="cover-image"
          labels={ {
            title: __( 'Panorama' ),
            name: __( 'images' ),
          } }
          className={ className }
          onSelect={ this.onSelectImage }
          accept="image/*"
          allowedTypes={ ALLOWED_MEDIA_TYPES }
        />
      ]
    };

    const controls = (
      isSelected && (
        <BlockControls key="easypanorama-controls">
          <Toolbar key="easypanorama-toolbar">
            <MediaUploadCheck>
              <MediaUpload
                key="easypanorama-mediaupload"
                onSelect={ this.onSelectImage }
                allowedTypes={ ALLOWED_MEDIA_TYPES }
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
            </MediaUploadCheck>
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
      <div className={ className } key="epblock">
        <div style={ panoramaStyle } className="epblock__image-container" key="easypanorama-block">
          <img src={ url } alt={ alt } title={ title } className={`wp-image-${ id }`} key="easypanorama-block-image"/>
        </div>
        <div className="epblock__help-text" key="easypanorama-block-help">
          <Tooltip text={ __( 'This is a preview, some features are not available.' ) } key="easypanorama-block-help-tooltip">
            <span className="epblock__help-icon" key="easypanorama-block-help-icon-container">
              <Dashicon size="25" icon="info" key="easypanorama-block-help-icon"/>
            </span>
          </Tooltip>
        </div>
      </div>
    ];
  }
}

export default withSelect( ( select, ownProps ) => {
	const { getMedia } = select( 'core' );
  const { attributes: { id } } = ownProps;
	return {
		image: id ? getMedia( id ) : null,
	};
} )( PanoramaBlock );
