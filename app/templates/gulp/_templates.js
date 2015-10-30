var $ = require('./common.js');
var config = require('./config.js');

<% if (use_Jade) { %>
var jade = require('gulp-jade');
var jadeInheritance = require('gulp-jade-inheritance');
var filter = require('gulp-filter');

var jadeSrc = './' + config.src + 'views/';
<% } else { %>
var fileinclude = require('gulp-file-include');
<% } %>

$.gulp.task('views', function() {
    <% if (use_Jade) { %>
    return $.gulp.src(jadeSrc + '**/*.jade')
        .pipe($.plumber({ errorHandler: $.notify.onError('<%%= error.message %>') }))
        .pipe(jadeInheritance({ basedir: jadeSrc }))
        .pipe(jade({
            basedir: jadeSrc,
            pretty: true,
            locals: { production: config.prod }
        }))
        .pipe(filter(function(file) {
            var exclude;
            if (config.outputJadeIncludes) exclude = new RegExp('templates|mixins', 'g');
            else exclude = new RegExp('templates|mixins|includes', 'g');

            return !exclude.test(file.path);
        }))
        .pipe($.gulp.dest(config.dest));
    <% } else { %>
        $.gulp.src([config.src + 'views/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe($.gulp.dest(config.dest));
    <% } %>
});
