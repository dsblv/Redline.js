'use strict';

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    rigger      = require('gulp-rigger'),
    prefixer    = require('gulp-autoprefixer'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    cssmin      = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    rename      = require("gulp-rename"),
    rimraf      = require('rimraf');

var path = {
    build  : 'dist/',
    source : {
        script : 'src/js/redline.js',
        style  : 'src/scss/redline.scss',
        html   : 'src/html/redline.html'
    },
    watch  : {
        script : 'src/js/**/*',
        style  : 'src/scss/**/*',
        html   : 'src/html/**/*'
    }
};


// Building scripts using rigger
gulp.task('script:build', function () {

    gulp.src(path.source.script)
        .pipe(rigger())
        .pipe(gulp.dest(path.build))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build));

});

// Rendering CSS from SASS, adding prefixes, minifying
gulp.task('style:build', function () {

    gulp.src(path.source.style)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(gulp.dest(path.build))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(cssmin({processImport: false}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build));

});

// Html file stays untouched
gulp.task('html:build', function () {
    gulp.src(path.source.html)
        .pipe(gulp.dest(path.build));
});

// Task that builds everything
gulp.task('build', ['script:build', 'style:build']);

// Task that cleans up the mess
gulp.task('clean', function (cb) {
    rimraf(path.build, cb);
});

// Watching for changes
gulp.task('watch', function(){

    for (var target in path.watch)
        (function (target) {
            watch(path.watch[target], function(event, cb) {
                gulp.start(target + ':build');
            });
        })(target);

});


gulp.task('default', ['build', 'watch']);