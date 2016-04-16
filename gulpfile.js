/*jslint browser: true, devel: true, node: true, nomen: true, regexp: true, 
unparam: true, indent: 4, maxlen: 80*/

(function () {
    
    var gulp = require('gulp'),
        browserSync = require('browser-sync').create(),
        reload = browserSync.reload,
        plumber = require('gulp-plumber'),
        rename = require('gulp-rename'),
        sourcemaps = require('gulp-sourcemaps'),
        less = require('gulp-less'),
        autoPrefixer = require('gulp-autoprefixer'),
        cssComb = require('gulp-csscomb'),
        frontnote = require('gulp-frontnote'),
        cleanCss = require('gulp-clean-css'),
        jshint = require('gulp-jshint'),
        browserify = require('gulp-browserify'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        jade = require('gulp-jade'),
        minifyHtml = require('gulp-minify-html'),
        imageMin = require('gulp-imagemin'),
        cache = require('gulp-cache'),
        notify = require('gulp-notify');

    //if node version is lower than v.0.1.2
    require('es6-promise').polyfill(),

    gulp.task('less',function(){
        gulp.src(['src/less/style.less'])
            .pipe(plumber({
                handleError: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(frontnote({
                out: 'docs/css'
            }))
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(autoPrefixer())
            .pipe(cssComb())
            .pipe(gulp.dest('app/css'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(cleanCss())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('app/css'))
            .pipe(reload({stream:true}))
            .pipe(notify('css task finished'))
    });

    gulp.task('js',function(){
        gulp.src(['src/js/**/*.js'])
            .pipe(plumber({
                handleError: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(concat('app.js'))
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(browserify())
            .pipe(gulp.dest('app/js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())
            .pipe(gulp.dest('app/js'))
            .pipe(reload())
            .pipe(notify('js task finished'))
    });

    gulp.task('jade',function(){
        gulp.src(['src/jade/**/*.jade'])
            .pipe(plumber({
                handleError: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(jade())
            .pipe(minifyHtml())
            .pipe(gulp.dest('app'))
            .pipe(reload())
            .pipe(notify('html task finished'))
    });

    gulp.task('image',function(){
        gulp.src(['src/img/**/*'])
            .pipe(plumber({
                handleError: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(cache(imageMin()))
            .pipe(gulp.dest('app/img'))
            .pipe(reload())
            .pipe(notify('image task finished'))
    });

    gulp.task('default',function(){
        browserSync.init({
            server: './app'
        });
        gulp.watch('./src/js/**/*.js',['js']);
        gulp.watch('./src/less/**/*.less',['less']);
        gulp.watch('./src/jade/**/*.jade',['jade']);
        gulp.watch('./src/img/**/*',['image']);
    });

}());