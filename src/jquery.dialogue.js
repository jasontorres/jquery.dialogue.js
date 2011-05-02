$.dialogue = {

  currentType : "",

  parseOptions : function(options) {

		var options = $.extend({},
			$.dialogue.options,
			options || {}
		);    

    return options;
  },
  setup : function(options) {
    
    var options = this.parseOptions(options);
    // Create the wrapper and overlays
    $('body')
      .append('<div class="dialogueOverlay" id="dialogueOverlay"></div>')
      .append('<div class="dialogueOuter"></div>');

    $('.dialogueOverlay')
      .css('height', $(document).height())
      .css('width', $(document).width())
      .fadeIn(100);

    // dialog size
    if(options['width'])
      $('.dialogueOuter').css('width', options['width']);

    if(options['height'])
      $('.dialogueOuter').css('height', options['height']);

  
    // dialog title
    if(options && options['titleText'])
      $('.dialogueOuter').append('<div class="dialogueTitle">' + options['titleText'] +'</div>');
    
    // dialog position
    $('.dialogueOuter')
      .css("left", ($(window).width() - $('.dialogueOuter').width()) / 2 + $(window).scrollLeft() + "px")   
      .css("top", (($(window).height() - $('.dialogueOuter').height()) / 2 + $(window).scrollTop()) - $('.dialogueOuter').height() + "px")
        .fadeIn(200)
      .append('<div class="dialogueInner"></div>');    

    $('.dialogueInner')
      .append('<div class="dialogueContent"></div>')
      .append('<div class="dialogueButtons"></div>');

  },
  alert : function(data, options, callback) {

    var options = this.parseOptions(options);
    this.setup(options);
 
    this.setContent(data);

    $('.dialogueButtons').append('<button value="ok">' + options['okText'] + '</button>'); 
 
    this.handleEvent('alert', options, callback);

  },
  confirm : function(data, options, callback) {

    var options = this.parseOptions(options);
    this.setup(options);
 
    this.setContent(data);

    $('.dialogueButtons')
      .append('<button value="ok">' + options['okText'] + '</button>')
      .append('<button value="cancel">' + options['cancelText'] + '</button>'); 

    this.handleEvent('confirm', options, callback); 

  },
  input : function(data, options, callback) {

    var options = this.parseOptions(options);
    this.setup(options);

    // override the title
    this.setTitle(data);

    if(options['defaultText']) {
        $('.dialogueContent').append('<div class="aInput"><input type="text" class="dialogueTextbox" value="' + options['defaultText'] + '" /></div>');
    } else {
        $('.dialogueContent').append('<div class="aInput"><input type="text" class="dialogueTextbox" /></div>');
    }

    $('.dialogueTextbox').focus();

    $('.dialogueButtons')
      .append('<button value="ok">' + options['okText'] + '</button>');

    this.handleEvent('input', options, callback); 

  },
  setTitle: function(data) {
    $('.dialogueTitle').html(data);
  },
  setContent : function(data) {

    if(typeof(data) == "string") {
      $('.dialogueContent').html(data);
    } else if(typeof(data) == "object") {
      $('.dialogueContent').html(data.html());
    }

  },
  handleEvent : function(type, options, callback) {

    this.currentType = type;

    $('.dialogueButtons > button').click(function() {

        var wButton = $(this).attr("value");
        if (wButton == 'ok') {

            if(type == 'alert') {
              if(callback) callback(true);
              $.dialogue.close();   
              return true;
            } else if (type == 'confirm') {
              if(callback) callback(true);
              $.dialogue.close();                 
              return true;
            } else if (type == 'input') {
              var str = $('.dialogueContent > .dialogueTextbox').val();
              $.dialogue.close();             
              callback(str);
              return str;
            } else {
              return true;
            }

        } else if (wButton == 'cancel') {
            $.dialogue.close();               
            if (callback) {
                callback(false);
            } else {
                return false;
            }
        }

    });

  },
  close : function() {
    $('.dialogueOverlay').remove(); $('.dialogueOuter').remove();
  },
  ok : function() {
    $('.dialogueButtons > button[value="ok"]').click();
  },
  cancel : function() {
    $('.dialogueButtons > button[value="cancel"]').click();
  }
};

$(document).keydown(function(e) {
  if ($('.dialogueOverlay').is(':visible')) {
    
    if (e.keyCode == 13) {
      $.dialogue.ok();
      return false;
    }

    if (e.keyCode == 27) {
      if($.dialogue.currentType == "alert") {
        $.dialogue.ok();
      } else {
        $.dialogue.cancel();
      }
      return false
    }

  }
});

$.dialogue.options = {
  'okText': 'Ok',   // Ok button default text
  'cancelText': 'Cancel',   // Cancel button default text
  'yesText': 'Yes',   // Yes button default text
  'noText': 'No', // No button default text
  'titleText' : 'Alert', // Title text
  'defaultText' : '',
  'width' : 'auto',
  'height' : 'auto'
};


