var SegmentView = require( './strava_item' ).extend({

  el: '#segment',

  template: require( '../../templates/segment.hbs' ),

  invalidMessage: 'Please enter a valid segment ID',

  events: {
    'change #segment_id': 'fetchSegmentDetails'
  },

  fetchSegmentDetails: function() {
    var id = this.$( '#segment_id' ).val();
    this.model.clear();
    this.model.set( 'id', id );
    this.model.fetch();
  }

});

module.exports = SegmentView;