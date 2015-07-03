'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    rjs = require('gulp-requirejs'),
    rimraf = require('rimraf');

var path = {
    build: 'dist/',
    src: 'src/js/',
    watch: 'src/**/*'
};

gulp.task('js:build', function () {

    /*rjs({
        baseUrl  : 'src/js/',
        name     : 'gauge',
        out      : 'dist/gauge.js',
        optimize : 'none',

        // Include dependencies loaded with require
        findNestedDependencies: true,
        // Avoid inserting define() placeholder
        skipModuleInsertion: true,
        // Avoid breaking semicolons inserted by r.js
        skipSemiColonInsertion: true,
        wrap: {
            startFile: 'src/js/intro.js',
            endFile: 'src/js/outro.js'
        }
    })
        .pipe(gulp.dest(path.build));*/

    gulp.src(path.src + 'gauge.js')
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