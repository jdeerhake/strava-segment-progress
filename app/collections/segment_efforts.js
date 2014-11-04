var Backbone = require( 'backbone' );
var _ = require( 'underscore' );

var stravaAPI = require( '../lib/strava_api' );
var Chart = require( '../lib/chart' );
var DataSeries = require( '../lib/data_series' );

var SegmentEfforts = Backbone.Collection.extend({

  model: require( '../models/segment_effort' ),

  url: function( options ) {
    var segmentID = options.data.segment_id;
    delete options.data.segment_id;
    return stravaAPI.endpoints.segmentEfforts({ segment_id : segmentID });
  },

  sync : stravaAPI.sync,

  comparator: 'timestamp',

  initialize: function() {
    this.listenTo( this, 'add', _.debounce( this.drawChart, 50 ) );
  },

  update: function( athlete, segment ) {
    this.reset();
    this.fetch({ data : {
      athlete_id: athlete.get( 'id' ),
      segment_id: segment.get( 'id' )
    } });
  },

  dataSeries: function() {
    return new DataSeries( this.invoke( 'dataPoint' ) );
  },

  drawChart: function() {
    document.getElementById( 'efforts' ).innerHTML = '';
    var chart = new Chart( '#efforts', this.dataSeries() );
    chart.draw();
  }

});

module.exports = SegmentEfforts;