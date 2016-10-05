var $ = require('./common.js');
var config = require('./config.js');

$.gulp.task('copy', function() {
    // Picturefill
    $.gulp.src(['./node_modules/picturefill/dist/picturefill.min.js'])
        .pipe($.changed(config.contentDir + 'Scripts'))
        .pipe($.gulp.dest(config.contentDir + 'Scripts'));

    // Favicon
    $.gulp.src([config.src + 'favicon.ico'])
        .pipe($.changed(config.dest))
        .pipe($.gulp.dest(config.dest));
});
