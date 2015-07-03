'use strict';

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    prefixer    = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    cssmin      = require('gulp-minify-css'),
    sourcemaps  = require('gulp-sourcemaps'),
    rigger      = require('gulp-rigger'),
    rimraf      = require('rimraf');

var path = {
    build  : 'dist/',
    source : {
        script : 'src/js/gauge.js',
        style  : 'src/scss/gauge.scss'
    },
    watch  : {
        script : 'src/js/**/*',
        style  : 'src/scss/**/*'
    }
};

gulp.task('script:build', function () {

    gulp.src(path.source.script)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build));

});

gulp.task('style:build', function () {

    gulp.src(path.source.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin({processImport: false}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build));
});


gulp.task('build', ['script:build', 'style:build']);


gulp.task('clean', function (cb) {
    rimraf(path.build, cb);
});


gulp.task('watch', function(){
    watch(path.watch.script, function(event, cb) {
        gulp.start('script:build');
    });
    watch(path.watch.style, function(event, cb) {
        gulp.start('style:build');
    });
});


gulp.task('default', ['build', 'watch']);