const { __ } = wp.i18n;
const {
  registerBlockType,
  ImagePlaceholder,
  BlockControls,
  MediaUpload
} = wp.blocks;
const { Button, Toolbar, IconButton } = wp.components;

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
    }
  },
  edit: props => {
    const { isSelected, attributes, className } = props;
    const onSelectImage = media => {
      props.setAttributes( {
        mediaURL: media.url,
        mediaID: media.id,
      } );
    };

    if(!attributes.mediaURL) {
      return [
        <ImagePlaceholder
          className={ className }
          key="easypanorama-placeholder"
          icon="format-image"
          onSelectImage={ onSelectImage}
        />
      ]
    }

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
