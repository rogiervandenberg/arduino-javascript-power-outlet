var gulp = require('gulp'),
  connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(connect.reload());
});

gulp.task('reload_html', function() {
    gulp.src('**/*.html')
        .pipe(connect.reload());
});

gulp.task('reload_js', function() {
    gulp.src('js/*.js')
        .pipe(connect.reload());
});


gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch('**/*.html',['reload_html']);
    gulp.watch('js/*.js',['reload_js']);
})

gulp.task('default', ['styles', 'webserver', 'watch']);
