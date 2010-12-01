(function($, undefined) {
  $.fn.dialog = function(options) {
    var settings = $.extend($.fn.dialog.defaults, options || {});
    return this.each(function() {
      var $this = $(this);
      var frame = createFrame();
      frame.appendTo("body");
      load();
      position(frame);
      show(frame);
      
      function createFrame() {
        var html = $.tmpl(settings.template, settings);
        var frame = $(html);
        return frame;
      }
      
      function position(frame) {
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        frame.css('top', (windowHeight - frame.height())/2 + 'px');
        frame.css('left', (windowWidth - frame.width())/2 + 'px');
      }
      
      function show(frame) {
        frame.show();
      }
      
      function load() {
        if (settings.url) {
          $.ajax({
            url: settings.url,
            async: false,
            success: function(result) { $(frame, '.dialogBody').append(result); }
            // TODO: Handle failure
          });
        }
      }
    });
  };
  $.fn.dialog.defaults = {
    id : 'modalDialog',
    frameClass : 'dialogFrame',
    title : 'Title Undefined',
    template: 
    "<div id='${id}' class='dialogFrame'>" +
      "<div class='dialogHeader'><span>${title}</span><a class='dialogClose'/></div>" +
      "<div class='dialogBody'></div>" +
      "<div class='dialogFooter'></div>" +
    "</div>"
  };
})(jQuery);