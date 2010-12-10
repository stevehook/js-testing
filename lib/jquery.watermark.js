(function($, undefined) {
  $.fn.watermark = function(options) {
    var settings = $.extend($.fn.watermark.defaults, options || {});
    return this.each(function() {
      var $this = $(this);
      if (typeof(settings.message) === 'string') {
        $this.focus(function() { hide(); })
          .blur(function() { showIfEmpty(); });
        showIfEmpty();
      }
      function showIfEmpty() {
        if (!$this.val()) { show(); }
      };
      function show() {
        $this.val(settings.message);
        $this.addClass(settings.watermarkClass);
      };
      function hide() {
        if ($this.hasClass(settings.watermarkClass)) {
          $this.val('');
          $this.removeClass(settings.watermarkClass);
        }
      };
    });
  };
  $.fn.watermark.defaults = {
    watermarkClass : 'watermarked',
    message : 'enter details here...'
  };
})(jQuery);