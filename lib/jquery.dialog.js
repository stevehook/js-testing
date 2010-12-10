(function($, undefined) {
  $.fn.dialog = function(options) {
    var settings = $.extend($.fn.dialog.defaults, options || {});
    return this.each(function() {
      var $this = $(this);
      var frame = createFrame();
      frame.appendTo("body");
      load();
      position(frame);
      setEventHandlers(frame);
      show(frame);
      
      function createFrame() {
        var html = $.tmpl(settings.template, settings);
        var frame = $(html);
        if (settings.displayOKCancel) { 
          $(settings.okCancelButtonsTemplate).appendTo($('.dialogFooter', frame));
        }
        return frame;
      }
      
      function position(frame) {
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        frame.css('width', settings.width);
        frame.css('height', settings.height);
        frame.css('top', (windowHeight - frame.height())/2 + 'px');
        frame.css('left', (windowWidth - frame.width())/2 + 'px');
      }
      
      function show(frame) {
        frame.fadeIn(settings.effectTimeout);
      }
      
      function close(ok) {
        // TODO: Call ok/cancel event handlers
        // TODO: Detach event handlers
        frame.fadeOut(settings.effectTimeout, function() { frame.detach(); });
      }
      
      function load() {
        if (settings.url) {
          $.ajax({
            url: settings.url,
            async: false,
            success: function(result) { $('.dialogBody', frame).append(result); }
            // TODO: Handle failure
          });
        }
      }
      
      function setEventHandlers() {
        frame.draggable({ handle: '.dialogHeader' });
        frame.resizable({});
        $('.closeIcon', frame).click(function(event) { close(false); });
      }
      
      // TODO: Create an overlay to mask out the rest of the window
      // TODO: Stop keyboard events getting to the rest of the window
      // TODO: Stop mouse events getting to the rest of the window
      // TODO: Implement option to create an OK/Cancel button set in the footer
      // TODO: Implement option to create a Close button in the footer
      // TODO: Test multiple dialogs
      // TODO: Wizard style dialogs
    });
  };
  $.fn.dialog.defaults = {
    id: 'modalDialog',
    frameClass: 'dialogFrame',
    title: 'Title Undefined',
    effectTimeout: 250,
    width: '30em',
    height: '20em',
    displayOKCancel: true,
    template:
    "<div id='${id}' class='dialogFrame'>" +
      "<div class='dialogHeader'><span>${title}</span><a class='closeIcon'/></div>" +
      "<div class='dialogBody'></div>" +
      "<div class='dialogFooter'>${buttons}</div>" +
    "</div>",
    okCancelButtonsTemplate: "<input type='button' class='dialogButton dialogOK' value='OK'/>" + 
      "<input type='button' class='dialogButton dialogCancel' value='Cancel'/>"
  };
})(jQuery);