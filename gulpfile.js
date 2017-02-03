const SASS_PATH_LOCATION = 'src/stylesheets/global/**/*.scss';
const SASS_TASK_NAME = 'sass';
const SASS_BUILD_PATH = './dist';
const SASS_TASK_WATCH_NAME = 'watch';
const SASS_OPTIONS = {
    outputStyle: 'compressed'
};

let gulp = require('gulp');
let sass = require('gulp-sass');
let autoPreFixer = require('gulp-autoprefixer');

gulp.task(SASS_TASK_NAME, () => {
    return gulp.src(SASS_PATH_LOCATION)
        .pipe(sass(SASS_OPTIONS).on('error', sass.logError))
        .pipe(autoPreFixer())
        .pipe(gulp.dest(SASS_BUILD_PATH))
});

gulp.task(SASS_TASK_WATCH_NAME, () => {
    gulp.watch(SASS_PATH_LOCATION, [SASS_TASK_NAME]);
});