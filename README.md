jquery.dialogue.js
=============

A lightweight, awesome and beautiful browser dialog alternative for jquery. Easily customizable via CSS and definitely gets the job done.


Use
-------

    <script src="jquery-1.5.2.min.js" type="text/javascript"></script>
    <script src="jquery.dialogue.js" type="text/javascript"></script>
    <link href="jquery.dialogue.css" rel="stylesheet" media="screen" type="text/css" />

Examples
-------

    $.dialogue.alert('hello world'); 
    $.dialogue.alert('hello world', {titleText : 'Custom Alert Title'}); 
    $.dialogue.confirm('Are you sure you want to continue?', {titleText : 'Confirm'});
    $.dialogue.input('Is this cool?', {}, function(r) { $.dialogue.alert(r); }); 
    $.dialogue.input('Example w/ a custom dimension', {width : 350, height : 150}); 

    see demo.html

More Examples
-------

### Confirm w/ callback

    $.dialogue.confirm("Are you sure?", {}, function(v) {

      if(v) {
        // do your thing
      } else {
        // do nothing
      }

    });


Ruby on Rails?
-------
Not a problem! Just find and override your rails.js w/ this code. If someone else has a better idea of doing this let us know!

    $('a[data-confirm], a[data-method], a[data-remote]').live('click.rails', function(e) {
        var link = $(this);

        var message = link.data('confirm');
        
        $.dialogue.confirm(message, {}, function(r) {

          if(r) {

            if (link.data('remote') != undefined) {
              handleRemote(link);
              return false;
            } else if (link.data('method')) {
              handleMethod(link);
              return false;
            }

          } else {
            return false;
          }

        });

        return false; 
    }); 



Contributing
------------
Want to contribute? Great! There are two ways to add markups.


License
------------
MIT


Credits
------------
Most credits go to http://thrivingkings.com/apprise for the Initial Code and the CSS. We're using it on our app and we've been improving and refactoring it eventually rewriting everything again from scratch.


Others
------------
Copyright 2011 - ProudCloud.net {:build => 'a better web'}
