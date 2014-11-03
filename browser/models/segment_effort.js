var Backbone = require( 'backbone' );
var moment = require( 'moment' );

var stravaAPI = require( '../strava_api' );


var SegmentEffort = Backbone.Model.extend({

  defaults: {},

  initialize: function( props ) {
    var time = moment( this.get( 'start_date' ) );

    this.set( 'timestamp', time.unix() );
  },

  url: function() {
    return stravaAPI.endpoints.segmentEffort({ id : this.get( 'id' ) });
  },

  sync: stravaAPI.sync,

  dataPoint: function( attr ) {
    attr = attr || 'moving_time';
    return [ this.get( 'timestamp' ), this.get( attr ) ];
  }

});

module.exports = SegmentEffort;