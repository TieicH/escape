const { pipe, task, src, dest, watch } = require('gulp');
const del = require('del');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('node-sass'));
const serve = require('gulp-serve');
 
const DIST_DIR = './dist';

task('fileinclude', function() {
  console.log('processing html files');
  return src(['src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('./dist'));
});

const processHtmlFiles = task('fileinclude');

task('copyJs', function() {
  console.log("moving javascript");
  return src('src/**/js/*.js')
    .pipe(dest(`${DIST_DIR}`));
});

const copyJs = task('copyJs');

task('copyAssets', function() {
  console.log("copy assets");
  return src('src/img/**/*')
    .pipe(dest(`${DIST_DIR}/img`));
});

const copyAssets = task('copyAssets');

task('buildStyles', function() {
  console.log("building styles");
  return src('./src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(`${DIST_DIR}/css`));
});

const buildStyles = task('buildStyles');


task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  console.log('cleaning');
  del(DIST_DIR, cb);
});

const clean = task("clean");

function defaultTask(cb) {
  // place code for your default task here
  clean();
  processHtmlFiles();
  buildStyles();
  copyJs();
  copyAssets();
  cb();
}

task('serve', serve(DIST_DIR));

exports.watch = function () {
  watch('./src/css/*.scss', buildStyles);
  watch('./src/js/*.js', copyJs);
  watch(['./src/**/*.html', './src/includes/*.html'], processHtmlFiles);
  watch('./src/img/*', copyAssets);
};

exports.start = task('serve');

exports.default = defaultTask;
