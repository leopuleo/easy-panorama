;(function($){
  $( document ).ready(function() {
    $('.easy-panorama').paver({
      gracefulFailure: easyPanorama_localize_init_var.panorama.gracefulFailure,
      failureMessage: easyPanorama_localize_init_var.panorama.failureMessage,
      failureMessageInsert: easyPanorama_localize_init_var.panorama.failureMessageInsert,
      meta: easyPanorama_localize_init_var.panorama.meta,
      minimumOverflow: easyPanorama_localize_init_var.panorama.minimumOverflow,
      startPosition: easyPanorama_localize_init_var.panorama.startPosition
    });

    console.log(easyPanorama_localize_init_var.panorama);

    $('.panorama').paver();
  });
})(jQuery);
