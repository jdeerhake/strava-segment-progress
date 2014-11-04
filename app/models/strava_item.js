var Backbone = require( 'backbone' );

var stravaAPI = require( '../lib/strava_api' );

var StravaItem = Backbone.Model.extend({

  defaults: {},

  sync: stravaAPI.sync,

  validate: function( attr ) {
    if( !attr.id ) { return 'ID not set'; }
    if( !attr.resource_state ) { return 'Not loaded from API'; }
  }

});

module.exports = StravaItem;