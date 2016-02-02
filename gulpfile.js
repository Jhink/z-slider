/* ==================================
        Dependencies Loading
   ================================== */

var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    jshint       = require('jshint'),
    concatCss    = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sass         = require('gulp-sass'),
    rename       = require('gulp-rename'),
    sourcemaps   = require('gulp-sourcemaps'),
    browserSync  = require('browser-sync').create();

/* Settings */

var config = {
    src : {
        html    : './src/*.html',
        styles  : './src/assets/styles/**/*.{sass,scss}',
        scripts : './src/assets/scripts/*.js',
        images  : './src/assets/images/**/*.*',
        fonts  : './src/assets/fonts/**/*'
    },
    dest : {
        html   : './dest/',
        css    : './dest/assets/css/',
        js     : './dest/assets/js/',
        img    : './dest/assets/img/',
        fonts : './dest/assets/fonts/',
        maps   : './dest/assets/css/maps/'
    }
};
/* ==================================
        Tasks
   ================================== */

/* Scripts */
gulp.task( 'scripts', function() {
    gulp.src(config.src.scripts)
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest.js))
        .pipe(browserSync.stream());
});

/* Styles */
gulp.task( 'styles', function() {
    gulp.src( config.src.styles )
        /*.pipe(sourcemaps.init())*/
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        /*.pipe(sourcemaps.write(config.dest.maps))*/
        /*.pipe(autoprefixer({ browsers: ['last 3 versions'] }))*/
        .pipe(gulp.dest(config.dest.css))
        .pipe(browserSync.stream());
});

gulp.task( 'html', function() {
    gulp.src( config.src.html )
        .pipe( gulp.dest( config.dest.html ) )
        .pipe(browserSync.stream());
});

gulp.task( 'images', function() {
    gulp.src( config.src.images )
        .pipe( gulp.dest( config.dest.img ) );
});

gulp.task( 'fonts', function() {
    gulp.src( config.src.fonts )
        .pipe( gulp.dest(config.dest.fonts) );
});

gulp.task('serve', ['styles', 'html', 'scripts'], function() {

    browserSync.init({
        server: "./dest",
        port: 7000
    });

    gulp.watch(config.src.styles, ['styles']);
    gulp.watch(config.src.html, ['html']);
    gulp.watch(config.src.scripts, ['scripts']);
});

/* ==================================
        "To Production" Tasks
   ================================== */

gulp.task('prod', function () {
    gulp.src(config.src.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
        .pipe(gulp.dest(config.dest.css));
});

gulp.task('watch', function() {
  gulp.watch([gulp.src.styles], ['styles']);
  gulp.watch([gulp.src.scripts], ['scripts']);
  gulp.watch([gulp.src.html], ['html']);
});

gulp.task('default', ['html', 'scripts', 'styles', 'images', 'fonts', 'serve']);
