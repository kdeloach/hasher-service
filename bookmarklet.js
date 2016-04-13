var $ = window.jQuery;

if (typeof $ === 'undefined')
    addJs('https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js');

function addJs(src) {
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', src);
    document.body.appendChild(s);
}

function growl(kind, msg, lifespan) {
    lifespan = (typeof lifespan !== 'undefined' ? lifespan : 3000);

    var $container =  $('#growl-container');
    if ($container.size() === 0) {
        $container = $('<div id="growl-container">')
            .appendTo('body')
            .css({
                position: 'fixed',
                top: 0,
                right: 0
            });
    }

    var $el = $('<p>')
            .html(msg)
            .appendTo($container)
            .css({
                float: 'right',
                clear: 'right',
                background: (kind === 'info' ? 'lightyellow' :
                             kind === 'success' ? 'lightgreen' :
                             kind === 'error' ? 'red' : 'gray'),
                padding: 10,
                margin: 2,
                border: '1px solid #ddd',
                borderRadius: 6
            });

    if (lifespan > 0) {
        setTimeout(function() {
            $el.remove();
        }, lifespan);
    }

    return $el;
}

function d(word) {
    var $el = growl('info', 'Decrypting ' + word + ' <img src="http://hanoi.internal.azavea.com/hasher/static/loading.gif" alt="..." />', 0);
    $.ajax({
        url: 'http://hanoi.internal.azavea.com/hasher/decrypt',
        data: {d: word},
        dataType: 'jsonp',
        jsonp: 'jsonp',
        success: function(data, status, xhr) {
            $el.remove();
            if (data && data.original && data.decrypted) {
                growl('success', 'Finished decrypting ' + data.original);
                window.prompt("Decrypted value:", data.decrypted);
            } else {
                growl('error', 'Error decrypting password! Check console for more details.');
                console.debug(data, status);
            }
        },
        error: function(xhr, status, err) {
            growl('error', 'Error decrypting password! Check console for more details.');
            console.debug(status, err);
        }
    });
}

var word = '' + document.getSelection();
if (word.length === 0) {
    growl('info', 'Nothing to decrypt (did you select anything?)');
} else {
    d(word);
}
