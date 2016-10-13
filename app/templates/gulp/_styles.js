var $ = require('./common.js');
var config = require('./config.js');

var sass = require('gulp-sass');
var gulpStylelint = require('gulp-stylelint');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');

// Stylelint
$.gulp.task('lint-styles', function() {
    return $.gulp
        .src([
            config.src + 'styles/**/*.scss',
            '!' + config.src + 'styles/utils/**/*.scss',
            '!' + config.src + 'styles/global/_normalize.scss',
            '!' + config.src + 'styles/pattern-library/**/*.scss'
        ])
        .pipe(gulpStylelint({
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ]
        }));
});

$.gulp.task('styles', ['lint-styles'], function() {
    var postpros = [
        require('css-mqpacker')({sort: true}),
        require('autoprefixer')({'browsers': '> 0%'})
    ];

    if (config.prod) {
        postpros.push(
            require('postcss-zindex'),
            require('csswring')({ preserveHacks: true, removeAllComments: true })
        );
    }

    $.gulp.src(config.src + 'styles/*.scss')
        .pipe($.should(!config.prod, sourcemaps.init()))
        .pipe(sass({
            percision: 4,
            includePaths: ['./node_modules']
        }).on('error', $.notify.onError('<%%= error.message %>')))
        .pipe(postcss(postpros))
        .pipe($.should(!config.prod, sourcemaps.write()))
        .pipe($.gulp.dest(config.contentDir + 'Styles'));
});
