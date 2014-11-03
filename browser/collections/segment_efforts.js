var Backbone = require( 'backbone' );
var stravaAPI = require( '../strava_api' );

var SegmentEfforts = Backbone.Collection.extend({

  model: require( '../models/segment_effort' ),

  url: function( options ) {
    var segmentID = options.data.segment_id;
    delete options.data.segment_id;
    return stravaAPI.endpoints.segmentEfforts({ segment_id : segmentID });
  },

  sync : stravaAPI.sync,

  comparator: 'timestamp',

  update: function( athlete, segment ) {
    this.reset();
    this.fetch({ data : {
      athlete_id: athlete.get( 'id' ),
      segment_id: segment.get( 'id' )
    } });
  },

  dataSeries: function() {
    return this.reduce(function( collect, next ) {
      collect.push([ next.get( 'timestamp' ), next.get( 'moving_time' ) ]);
      return collect;
    }, []);
  },

  drawChart: function() {

  }

});

module.exports = SegmentEfforts;