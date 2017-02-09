'use strict';

const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync');

// -------------------------------------------
// Configuration
// -------------------------------------------

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  examples: path.join(__dirname, 'examples')
};

const patterns = {
  js: path.join(paths.dist, '**/*.js')
};

gulp.task('copy', () =>
  gulp.src(patterns.js)
    .pipe(gulp.dest(path.join(paths.examples, 'dist')))
);

gulp.task('browser-sync', ['copy'], () => {
  browserSync.init({
    server: './examples',
    files: ['examples/**/*.*'],
    browser: 'google chrome',
    port: 7000
  });
});

gulp.task('watch', ['copy'], () => {
  gulp.watch(patterns.js, ['copy']);
});

gulp.task('default', ['watch', 'browser-sync']);
