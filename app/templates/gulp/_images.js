var $ = require('./common.js');
var config = require('./config.js');

var imagemin = require('gulp-imagemin');

$.gulp.task('images', function() {
    return $.gulp.src(config.src + 'images/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe($.changed(config.contentDir + 'Images'))
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe($.gulp.dest(config.contentDir + 'Images'));
});
