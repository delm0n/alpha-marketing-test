const gulp = require("gulp");
const { src, series, parallel, dest } = require("gulp");

const imagemin = require("gulp-imagemin"); // оптимизирует изображения
const pngquant = require("imagemin-pngquant"); // качественно сжимает png
const webp = require("gulp-webp"); // конвертирует изображения в webp

const clean = require("gulp-clean"); //очистка директории

const rigger = require("gulp-rigger"); //склеивание html

const gcmq = require("gulp-group-css-media-queries"); // сливает однинаковые media
const cleancss = require("gulp-clean-css"); // минифицирует css
const sass = require("gulp-sass")(require("sass")); //scss -> css

// пути к файлам
const paths = {
  html: {
    src: "src/*.html",
    dest: "docs/",
  },

  css: {
    src: "src/scss/main.scss",
    dest: "style/",
  },

  img: {
    src: "src/images/**.png",
    dest: "docs/images/",
  },
};

// оптимизация изображений
function imgTask() {
  return src(paths.img.src)
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        pngquant({ quality: [0.8, 0.8] }),
      ])
    )
    .pipe(gulp.dest(paths.img.dest));
}
function webpTask() {
  return src(paths.img.src).pipe(webp()).pipe(gulp.dest(paths.img.dest));
}

//сборка html
function htmlTask() {
  return src(paths.html.src).pipe(rigger()).pipe(gulp.dest(paths.html.dest));
}

// сбор стилей
function cssTask() {
  return src(paths.css.src)
    .pipe(sass())
    .pipe(gcmq())

    .pipe(
      cleancss({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    )
    .pipe(gulp.dest(paths.css.dest));
}

function docsClean() {
  return gulp.src("docs/*", { read: false }).pipe(clean());
}

// запуск задач при изменении файлов
gulp.task("watch", function () {
  gulp.watch("src/**/*.html", parallel(htmlTask, cssTask));
  gulp.watch(paths.img.src, parallel(imgTask, webpTask));
  gulp.watch("src/scss/**/*.scss", parallel(htmlTask, cssTask));
});

exports.build = series(
  docsClean,
  parallel(imgTask, webpTask, htmlTask, cssTask)
);
