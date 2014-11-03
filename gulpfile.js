var gulp = require( 'gulp' );
var plumber = require( 'gulp-plumber' );
var browserify = require( 'gulp-browserify' );
var less = require( 'gulp-less' );


var paths = {
    scripts : [ 'browser/**/*' ],
    less    : [ 'styles/*' ],
    output : 'generated'
};

var conf = {
  browserify : {
      source: paths.scripts,
      debug: true,
      transform: 'hbsfy'
  }
};


gulp.task( 'scripts', function() {
    gulp.src( 'browser/app.js' )
        .pipe( plumber() )
        .pipe( browserify( conf.browserify ) )
        .pipe( gulp.dest( paths.output ) );
});

gulp.task( 'stylesheets', function() {
    gulp.src( paths.less )
        .pipe( plumber() )
        .pipe( less() )
        .pipe( gulp.dest( paths.output ) );
});

gulp.task( 'watch', function() {
    gulp.watch( paths.scripts, [ 'scripts' ]);
    gulp.watch( paths.less, [ 'stylesheets' ]);
});

gulp.task( 'compile', [ 'scripts', 'stylesheets' ]);

gulp.task( 'default', [ 'watch' ]);