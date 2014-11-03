var stravaAPI = require( '../strava_api' );

var Segment = require( './strava_item' ).extend({

  url: function() {
    return stravaAPI.endpoints.segment({ id : this.get( 'id' ) });
  }

});

module.exports = Segment;