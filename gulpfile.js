'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf');

var path = {
    build  : 'dist/',
    source : 'src/js/gauge.js',
    watch  : 'src/**/*'
};

gulp.task('js:build', function () {

    gulp.src(path.source)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build));

});


gulp.task('build', ['js:build']);


gulp.task('clean', function (cb) {
    rimraf(path.build, cb);
});


gulp.task('watch', function(){
    watch(path.watch, function(event, cb) {
        gulp.start('build');
    });
});


gulp.task('default', ['build', 'watch']);