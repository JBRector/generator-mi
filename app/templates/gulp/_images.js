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


var $ = require('./common.js');
var config = require('./config.js');

var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');

// Optimize all images
$.gulp.task('imagemin', function() {
    $.gulp.src(config.src + 'images/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe($.changed(config.contentDir + 'Images'))
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe($.gulp.dest(config.contentDir + 'Images'));
});

// Create WebP versions of PNG and JPGs
$.gulp.task('images', ['imagemin'], function() {
    // Generate lossless WebP (from PNG)
    $.gulp.src(config.src + 'images/**/*.png')
        .pipe($.changed(config.contentDir + 'Images'))
        .pipe(webp({
            lossless: true
        }))
        .pipe($.gulp.dest(config.contentDir + 'Images'));

    // Generate lossy WebP (from JPG)
    $.gulp.src(config.src + 'images/**/*.jpg')
        .pipe($.changed(config.contentDir + 'Images'))
        .pipe(webp({
            quality: 80
        }))
        .pipe($.gulp.dest(config.contentDir + 'Images'));
});
