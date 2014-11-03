var AthleteView = require( './strava_item' ).extend({

  el: '#athlete',

  template: require( '../../templates/athlete.hbs' ),

  invalidMessage: 'Please enter a valid Strava athlete ID',

  events: {
    'change #athlete_id' : 'fetchAthleteDetails'
  },

  fetchAthleteDetails: function() {
    var id = this.$( '#athlete_id' ).val();
    this.model.clear();
    this.model.set( 'id', id );
    this.model.fetch();
  }

});

module.exports = AthleteView;