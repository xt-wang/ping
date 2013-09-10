/**
 * PGV 统计函数
 * @param _domain: 统计域，默认为 location.host
 * @param _path: 要统计的URL, 可以为空。 e.g. "/foo/bar.html"
function PgvCount(_domain, _path) {
    pvDoc = document;
    pvLoc = location;
    pvRepeatCount = 1;
    pvCurDomain = _domain || location.host;
    if(_path) {
        pvCurUrl = _path;
    }
    if(typeof pgvMain == 'function') {
        pgvMain();
    } else {
        jQuery.getScript('http://pingjs.qq.com/ping.js', function() {
            typeof pgvMain == 'function' && PgvCount(_domain, _path);
        });
    }
} 
  */