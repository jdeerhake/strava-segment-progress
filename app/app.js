var Backbone = require( 'backbone' );
var $ = require( 'jquery' );
Backbone.$ = $;

var Athlete = require( './models/athlete' );
var AthleteView = require( './views/athlete' );
var Segment = require( './models/segment' );
var SegmentView = require( './views/segment' );
var SegmentEfforts = require( './collections/segment_efforts' );

var AppView = Backbone.View.extend({

  el: '#app',

  initialize: function() {
    this.athlete = new Athlete();
    this.segment = new Segment();
    window.se = this.segmentEfforts = new SegmentEfforts();

    new AthleteView({ model : this.athlete });
    new SegmentView({ model : this.segment });

    this.listenTo( this.athlete, 'change', this.fetchSegmentEfforts );
    this.listenTo( this.segment, 'change', this.fetchSegmentEfforts );
  },

  fetchSegmentEfforts: function() {
    if( this.athlete.isValid() && this.segment.isValid() ) {
      this.segmentEfforts.update( this.athlete, this.segment );
    }
  }

});


Backbone.$(function() {
  new AppView();

  $( '#examples' ).on( 'click', 'a', function() {
    var $this = $( this );
    $( '#athlete_id' ).val( $this.data( 'athlete-id' ) ).change();
    $( '#segment_id' ).val( $this.data( 'segment-id' ) ).change();
  });
});
