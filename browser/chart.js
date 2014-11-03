var d3 = require( 'd3' );
var $ = require( 'jquery' );

var range = {
  pad : function( range, factor ) {
    return [ range[0] * ( 1 - factor ), range[1] * ( 1 + factor ) ];
  },
  clip : function( range, min, max ) {
    return [ Math.max( range[0], min ), Math.min( range[1], max ) ];
  },
  expand : function( range, min, max ) {
    return [ Math.min( range[0], min ), Math.max( range[1], max ) ];
  }
};

var margin = 50;

function Chart( selector, dataSeries, conf ) {
  var $el = $( selector );
  var w = this.w = $el.width();
  var h = this.h = $el.height();

  this.data = [ dataSeries ];

  var x = this.x = d3.time.scale().range([ 0, w - margin ]);
  var y = this.y = d3.scale.linear().range([ h - margin, 0 ]);

  this.xAxis = d3.svg.axis().scale( this.x ).orient( 'bottom' );
  this.yAxis = d3.svg.axis().scale( this.y ).orient( 'left' );

  this.yAxis.tickFormat(function( t ) {
    var m = Math.floor( t / 60 );
    var s = t % 60;
    if( s === 0 ) { s = '00'; }
    return m + ':' + s;
  });

  this.line = d3.svg.line().x(function( p ) { return x( p[ 0 ] ); })
                           .y(function( p ) { return y( p[ 1 ] ); });

  this.svg = d3.select( selector )
                .append( 'svg' )
                .attr( 'width', w )
                .attr( 'height', h )
                .append( 'g' )
                .attr( 'transform', 'translate(' + margin + ',10)' );
}

Chart.prototype = {
  draw : function() {
    this.x.domain( this.data[0].domain() );
    this.y.domain( range.pad( this.data[0].range(), 0.1 ) );

    this.svg.append( 'g' )
      .attr( 'class', 'x axis' )
      .attr( 'transform', 'translate(0,' + ( this.h - margin ) + ')' )
      .call( this.xAxis );

    this.svg.append( 'g' )
      .attr( 'class', 'y axis' )
      .call( this.yAxis );

    this.path = this.svg.append( 'path' )
      .datum( this.data[ 0 ].data() )
      .attr( 'class', 'line' )
      .attr( 'd', this.line );
  }
};


module.exports = Chart;