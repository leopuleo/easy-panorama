;(function($){
  $( document ).ready(function() {
    // Shortcode init
    $('.easy-panorama').paver({
      gracefulFailure: easyPanorama_localize_init_var.panorama.gracefulFailure,
      failureMessage: easyPanorama_localize_init_var.panorama.failureMessage,
      failureMessageInsert: easyPanorama_localize_init_var.panorama.failureMessageInsert,
      meta: easyPanorama_localize_init_var.panorama.meta,
      minimumOverflow: easyPanorama_localize_init_var.panorama.minimumOverflow,
      startPosition: easyPanorama_localize_init_var.panorama.startPosition
    });
    // Block init
    $('.easy-panorama-block').paver();
  });
})(jQuery);
