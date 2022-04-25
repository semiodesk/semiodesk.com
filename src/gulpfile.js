var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify-es').default;
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var minifyCss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('compact-useref', function () {
  gulp
    .src('products/trinity/*.html', { allowEmpty: true })
    .pipe(gulp.dest('../products/trinity/'));
  gulp
    .src('products/tinyvirtuoso/*.html', { allowEmpty: true })
    .pipe(gulp.dest('../products/tinyvirtuoso/'));

  return (
    gulp
      .src('*.html', { allowEmpty: true })
      .pipe(useref({ }))
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulpIf("*.css", minifyCss()))
      .pipe(gulp.dest('..'))
  );
});

gulp.task('copy-fonts', function () {
  gulp
    .src(
      'node_modules/@fontsource/hind-madurai/files/*.{ttf,woff,woff2,eof,svg}'
    )
    .pipe(gulp.dest('../assets/css/files/'));

  gulp
    .src(
      'node_modules/@fontsource/roboto-condensed/files/*.{ttf,woff,woff2,eof,svg}'
    )
    .pipe(gulp.dest('../assets/css/files/'));

  return gulp
    .src(
      'node_modules/@fortawesome/fontawesome-free/webfonts/*.{ttf,woff,woff2,eof,svg}'
    )
    .pipe(gulp.dest('../assets/webfonts/'));
});

gulp.task('compact-images', function () {
  return (
    gulp
      .src('assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
      // Caching images that ran through imagemin
      .pipe(
        cache(
          imagemin({
            interlaced: true,
          })
        )
      )
      .pipe(gulp.dest('../assets/img'))
  );
});

gulp.task('copy-favicons', function () {
  return gulp.src('*.ico').pipe(gulp.dest('..'));
});

gulp.task(
  'deploy',
  gulp.series('copy-fonts', 'compact-useref', 'compact-images', 'copy-favicons')
);
