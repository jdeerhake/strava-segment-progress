var Backbone = require( 'backbone' );
var moment = require( 'moment' );

var stravaAPI = require( '../strava_api' );


var SegmentEffort = Backbone.Model.extend({

  defaults: {},

  initialize: function( props ) {
    var time = moment( this.get( 'start_date' ) );

    this.set( 'timestamp', time.valueOf() );
  },

  url: function() {
    return stravaAPI.endpoints.segmentEffort({ id : this.get( 'id' ) });
  },

  sync: stravaAPI.sync

});

module.exports = SegmentEffort;