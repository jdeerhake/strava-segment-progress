var stravaAPI = require( '../lib/strava_api' );

var Athlete = require( './strava_item' ).extend({

  url: function() {
    return stravaAPI.endpoints.athlete({ id : this.get( 'id' ) });
  }

});

module.exports = Athlete;