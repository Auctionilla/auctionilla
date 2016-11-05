'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const symlink = require('gulp-sym');

/**
 * Sass compilation
 */
gulp.task('sass', () => {
  return gulp.src('resources/assets/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'));
});

// create js
gulp.task('symlink-js', () => {
  return gulp.src('resources/assets/js')
    .pipe(symlink('public/js', { force: true }));
});

// create js
gulp.task('symlink-css', () => {
  return gulp.src('resources/assets/css')
    .pipe(symlink('public/css', { force: true }));
});

/**
 * Create image folder symlink
 */
gulp.task('symlink-images', () => {
  return gulp.src('resources/assets/images')
    .pipe(symlink('public/images', { force: true }));
});

/**
 * Create fonts folder symlink
 */
gulp.task('symlink-fonts', () => {
  return gulp.src('resources/assets/fonts')
    .pipe(symlink('public/fonts', { force: true }));
});

/**
 * Task for creating symlinks
 */
gulp.task('symlink', ['symlink-images', 'symlink-fonts','symlink-js', 'symlink-css']);

gulp.task('default', ['sass', 'symlink']);
gulp.task('watch', () => {
  gulp.watch('resources/assets/sass/**/*.scss', ['sass']);
});
