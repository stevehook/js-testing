(function($, undefined) {
  $.fn.autoselect = function(options) {
    var settings = $.extend($.fn.autoselect.defaults, options || {});
    return this.each(function() {
      var $this = $(this);
      $this.keydown(function(event) {
        setTimeout(function() {
          console.log('keydown');
          fetchResults($this.val());
          }, settings.wait);
      });
      
      function fetchResults(val) {
        if (settings.url) {
          $.ajax({
            url: settings.url,
            async: false,
            dataType: 'json',
            data: { searchFor: val },
            success: function(results) { showResults(results); }
            // TODO: Handle failure
          });
        }
      }
      
      function showResults(results) {
        var html = "<div class='dropdown'>"
        $.each(results.matches, function(index, r) { html += "<div class='dropdownItem'>" + r + "</div>"; });
        html += "</div>";
        var dropdown = $(html);
        console.log(dropdown);
      }
    });
  };
  $.fn.autoselect.defaults = {
    wait: 250
  };
})(jQuery);