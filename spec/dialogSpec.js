describe("My dialog", function() {
  var dialog;
  $.jstub.stub($, 'ajax', { url: 'ajax.html', async: false, success: $.jstub.any }, 'some body text...', 0, 'success');

  beforeEach(function() {
    dialog = $('<div/>').dialog({ url: 'ajax.html', effectTimeout: 10 });
  });

  afterEach(function() {
    $('.dialogFrame').detach();
  });

  it("should be present", function() {
    expect($("#modalDialog").length).toEqual(1);
  });

  it("should be visible", function() {
    expect($("#modalDialog").css('display')).toEqual('block');
  });

  it("should be positioned in the centre", function() {
    var dialog = $("#modalDialog");
    expect(dialog.position().left).toBeCloseTo(($(window).width() - dialog.width())/2);
    expect(dialog.position().top).toBeCloseTo(($(window).height() - dialog.height())/2);
  });

  it("dialog should close when we click the close button", function() {
    $('.closeIcon').click();
    
    waitsFor(function() {
      return $('.dialogFrame').length == 0;
    }, "Waiting for Dialog to close", 10000);
    
    runs(function() {
      expect($('.dialogFrame').length).toEqual(0);
    });
  });
});