var gulp = require( 'gulp' );
var plumber = require( 'gulp-plumber' );
var browserify = require( 'gulp-browserify' );
var less = require( 'gulp-less' );
var gulpif = require( 'gulp-if' );
var uglify = require( 'gulp-uglify' );
var minifyCSS = require( 'gulp-minify-css' );

var prod = process.env.NODE_ENV === 'production';

var paths = {
  scripts : [ 'app/**/*' ],
  less    : [ 'styles/*' ],
  output : 'generated'
};

var conf = {
  browserify : {
    source: paths.scripts,
    debug: !prod,
    transform: 'hbsfy'
  }
};

gulp.task( 'scripts', function() {
  gulp.src( 'app/app.js' )
    .pipe( plumber() )
    .pipe( browserify( conf.browserify ) )
    .pipe( gulpif( prod, uglify() ) )
    .pipe( gulp.dest( paths.output ) );
});

gulp.task( 'stylesheets', function() {
  gulp.src( 'styles/app.less' )
    .pipe( plumber() )
    .pipe( less() )
    .pipe( gulpif( prod, minifyCSS() ) )
    .pipe( gulp.dest( paths.output ) );
});

gulp.task( 'watch', function() {
  gulp.watch( paths.scripts, [ 'scripts' ]);
  gulp.watch( paths.less, [ 'stylesheets' ]);
});

gulp.task( 'compile', [ 'scripts', 'stylesheets' ]);

gulp.task( 'default', [ 'watch' ]);