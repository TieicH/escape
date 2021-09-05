const { pipe, task, src, dest, watch, series } = require('gulp');
const del = require('del');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('node-sass'));
const serve = require('gulp-serve');
const template = require('gulp-template');
const rename = require('gulp-rename');
const dotenv = require('dotenv');

dotenv.config();

const DIST_DIR = './dist';


task('envConfig', function() {
  const CONFIG_PATH = 'src/js/env_config.template.js';
  const { API_KEY, SHEET_ID } = process.env;
  return src(CONFIG_PATH)
    .pipe(template({ API_KEY, SHEET_ID }))
    .pipe(rename('config.js'))
    .pipe(dest(`${DIST_DIR}/js`));
});

const envConfig = task('envConfig');

task('processHtml', function() {
  console.log('processing html files');
  return src(['src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest(DIST_DIR));
});

const processHtmlFiles = task('processHtml');

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

task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  console.log('running cleaning');
  return del(DIST_DIR);
});

const clean = task("clean");

task('default', series('clean', function(cb) {
    envConfig();
    buildStyles();
    processHtmlFiles();
    copyAssets();
    copyJs();
    cb();
  }));

const defaultTask = task('default');

task('serve', serve(DIST_DIR));

exports.watch = function () {
  console.log('running watch');
  watch('./src/css/*.scss', buildStyles);
  watch('./src/js/*.js', copyJs);
  watch(['./src/**/*.html', './src/includes/*.html'], processHtmlFiles);
  watch('./src/img/*', copyAssets);
};

exports.start = task('serve');

exports.default = defaultTask;
