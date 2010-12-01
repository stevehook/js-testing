(function($, undefined) {
  $.fn.onoff = function(options) {
    var settings = $.extend($.fn.onoff.defaults, options || {});
    return this.each(function() {
      var $this = $(this);
      var container = setupElements();
      var inner = $("div.onoffInner", container);
      var buttonWidth = setSizes();
      setInitialValue();
      container.click(function() { toggle(); });
      
      // TODO: Setup keyboard events
      
      function toggle() {
        if ($this.val() == settings.offValue) {
          $this.val(settings.onValue);
          container.scrollLeft(buttonWidth);
        } else {
          $this.val(settings.offValue);
          container.scrollLeft(0);
        }
      }
      
      function setupElements() {
        var container = $(
          "<div class='onoffContainer'><div class='onoffInner'><div class='onoffLabel onLabel'>" + settings.onText + 
          "</div><div class='onoffButton'></div><div class='onoffLabel offLabel'>" + settings.offText + 
          "</div></div></div>");
        container.insertAfter($this);
        $this.hide();
        return container;
      };
      
      function setSizes() {
        var maxWidth = 0;
        $("div", inner).each(function() { maxWidth = Math.max($(this).width(), maxWidth); });
        maxWidth += (settings.textPadding * 2);
        $("div", inner).each(function() { $(this).width(maxWidth); });
        inner.width(maxWidth * 3);
        container.width(maxWidth * 2);
        var labelHeight = $("div", inner).height();
        container.height(labelHeight);
        $(".onoffButton", container).height(labelHeight);
        return maxWidth;
      };
      
      function setInitialValue() {
        if ($this.val() == settings.offValue) { container.scrollLeft(buttonWidth); }
      }
    });
  };
  $.fn.onoff.defaults = {
    onText : 'on',
    offText : 'off',
    onValue : 'True',
    offValue : 'False',
    textPadding : 5
  };
})(jQuery);