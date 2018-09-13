var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb      = require('gulp-csscomb');


gulp.task('sass', function(){
  return gulp.src('dev/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer([
            'last 15 versions', '> 1%', 'ie 8', 'ie 7'
          ], {cascade: true}))
        .pipe(csscomb('mycsscomb.json'))
        .pipe(gulp.dest('dev/css'))
        .pipe(browserSync.reload({stream: true}));
});


//объединение библотек JS
gulp.task('scripts', function(){
  return gulp.src([
          'node_modules/angular/angular.min.js',
          'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js'
         ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('dev/js'));
});


gulp.task('app-scripts', function(){
  return gulp.src('dev/app/**/**.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dev/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'dev'
    },
    notify: false 
  });
});

//таск для удаления папки dist  до watch!
gulp.task('clean', function(){
  return del.sync('dist');
});

// таск очистки кеша запускается вручную когда надо почистить кеш
gulp.task('clear', function(){
  return cache.clearAll();
});

//таск для обработки картинок и выгрузки в дистрибутив
gulp.task('img', function(){
  return gulp.src('dev/images/**/*')
        .pipe(cache(imagemin({
          interlaced: true,
          svgoPlugins: [{removeViewBox: false}],
          une: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images'));
});


//Слежка за изменениями watch для проверки сохраняемых файлов
gulp.task('watch',['browser-sync', 'sass', 'app-scripts'],function(){
  gulp.watch('dev/sass/**.scss', ['sass']);//файлы за которыми следим и массив тасков которые будем выполнять
  gulp.watch('dev/**/**.html', browserSync.reload);
  gulp.watch('dev/app/**/*.js',['app-scripts']);
});

//таск по умолчанию запускается командой gulp
gulp.task('default', ['watch']);

//Сборка проекта отдельный
gulp.task('build', ['clean','img', 'sass',  'scripts', 'app-scripts'], function(){
  var buildCss = gulp.src('dev/css/main.css')
     .pipe(cssnano())
     .pipe(gulp.dest('dev/css'))
     .pipe(gulp.dest('dist/css'));

  var buildViews = gulp.src('dev/views/*.html')
     .pipe(gulp.dest('dist/views'));
  
  var buildJs = gulp.src('dev/js/*.js')
  .pipe(gulp.dest('dist/js'));
  
  var buildHtml = gulp.src('dev/index.html')
  .pipe(gulp.dest('dist'));

  
  var buildJson = gulp.src('dev/json/*.json')
      .pipe(gulp.dest('dist/json'));
});