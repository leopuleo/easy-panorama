;(function($){
  $(document).ready(function(){
    $('#insert-panorama').click(open_media_window);
  });
  function open_media_window() {
    if (this.window === undefined) {
      this.window = wp.media({
        title: 'Insert a Panorama',
        library: {type: 'image'},
        multiple: false,
        button: {text: 'Insert Panorama'}
      });

      var self = this; // Needed to retrieve our variable in the anonymous function below
      this.window.on('select', function() {
        var first = self.window.state().get('selection').first().toJSON();
        wp.media.editor.insert('[easy_panorama id="' + first.id + '"]');
      });
    }
    this.window.open();
    return false;
}
})(jQuery);

