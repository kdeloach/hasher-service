var getSelectedText = function() {
    return '' + document.getSelection();
};
/* Source: http://stackoverflow.com/a/6969486 */
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
$.ajax({
    /* Hanoi */
    url: 'http://hanoi.internal.azavea.com/hasher/decrypt',
    data: {d: getSelectedText()},
    dataType: 'jsonp',
    jsonp: 'jsonp',
    success: function(data, status, xhr) {
        if (data && data.original && data.decrypted) {
            document.body.innerHTML = document.body.innerHTML.replace(
                new RegExp(escapeRegExp(data.original), 'g'), data.decrypted);
        }
    }
});
