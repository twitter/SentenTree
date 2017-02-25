'use strict';

const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

// -------------------------------------------
// Configuration
// -------------------------------------------

const paths = {
  src: path.join(__dirname, 'demo/src'),
  dist: path.join(__dirname, 'demo/dist'),
};

const patterns = {
  sass: path.join(paths.src, '**/*.scss')
};

gulp.task('sass', function () {
  return gulp.src('./demo/src/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      sourceMap: true
    }).on('error', sass.logError))
    .pipe(gulp.dest('./demo/dist'));
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './demo',
    files: [
      'demo/dist/**/*.*',
      'demo/index.html'
    ],
    browser: 'google chrome',
    port: 3003
  });
});

gulp.task('watch', ['sass'], () => {
  gulp.watch(patterns.sass, ['sass']);
});

gulp.task('server', ['watch', 'browser-sync']);
