var Backbone = require( 'backbone' );

var StravaItemView = Backbone.View.extend({

  initialize: function() {
    this.listenTo( this.model, 'change', this.render );
    this.listenTo( this.model, 'destroy', this.remove );
  },

  render: function() {
    var el = this.$( '.details' );

    if( this.model.isValid() ) {
      el.html( this.template( this.model.toJSON() ) );
    } else {
      el.html( this.invalidMessage );
    }
  },

  clear: function() {
    this.model.destroy();
  }

});

module.exports = StravaItemView;