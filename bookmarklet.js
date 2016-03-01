if (typeof window.jQuery !== 'undefined') {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '//code.jquery.com/jquery-1.12.1.min.js';
    document.body.appendChild(s);
}

function getSelectedText() {
    return '' + document.getSelection();
}

window.jQuery.ajax({
    url: 'http://hanoi.internal.azavea.com/hasher/decrypt',
    data: {d: getSelectedText()},
    dataType: 'jsonp',
    jsonp: 'jsonp',
    success: function(data, status, xhr) {
        if (data && data.original && data.decrypted) {
            while (document.body.innerHTML.indexOf(data.original) !== -1) {
                document.body.innerHTML = document.body.innerHTML.replace(
                    data.original, data.decrypted);
            }
        }
    }
});
