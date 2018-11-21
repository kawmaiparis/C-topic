const gulp  = require('gulp')
const ap    = require('gulp-autoprefixer')
const del   = require('del')
const sass  = require('gulp-sass')
const nj    = require('gulp-nunjucks-render')
const sftp  = require('gulp-sftp')

const vendorJsFiles = [
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/what-input/dist/what-input.min.js',
  './node_modules/foundation-sites/dist/js/foundation.min.js',
]

gulp.task('sass', () => {
  gulp.src('./src/sass/app.scss')
    .pipe(sass({
      includePaths: './node_modules/foundation-sites/scss'
    }))
    .pipe(ap({
      browsers: ['last 2 versions', 'ie >= 9', 'Android >= 2.3', 'ios >= 7']
    }))
    .pipe(gulp.dest('./build/css'))
})

gulp.task('js:app', () => {
  gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./build/js'))
})

gulp.task('js:vendor', () => {
  gulp.src(vendorJsFiles)
    .pipe(gulp.dest('./build/js/vendor'))
})

gulp.task('nunjucks', () => {
  gulp.src('./src/pages/*.njk')
    .pipe(nj({path: ['./src/pages']}))
    .pipe(gulp.dest('./build/'))
})

gulp.task('images', () => {
  gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./build/images'))
})

gulp.task('watch:sass', ['sass'], () => {
  gulp.watch('./src/sass/**/*.scss', ['sass'])
})

gulp.task('watch:js:app', ['js:app'], () => {
  gulp.watch('./src/js/**/*.js', ['js:app'])
})

gulp.task('watch:nunjucks', ['nunjucks'], () => {
  gulp.watch('./src/pages/**/*.njk', ['nunjucks'])
})

gulp.task('watch:images', ['images'], () => {
  gulp.watch('./src/images/**/*', ['images'])
})

gulp.task('watch', ['watch:sass', 'watch:js:app', 'watch:nunjucks', 'watch:images'])

gulp.task('clean', () => {
  del('./build')
})

gulp.task('default', ['sass', 'js:app', 'js:vendor', 'nunjucks', 'images'], () => {

})

gulp.task('deploy', ['default'], () => {
  return gulp.src('./build/**/*')
    .pipe(sftp({
      host: 'sftp.doc.ic.ac.uk',
      user: 'ftm17',
      key: '/home/fraser/.ssh/imperial',
      remotePath: '/homes/ftm17/public_html/topics'
    }))
})
