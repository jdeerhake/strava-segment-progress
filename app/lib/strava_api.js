var _ = require( 'underscore' );
var url = require( 'url' );

var protocol = 'https';
var baseURL = 'www.strava.com';
var accessToken = require( '../key' ).strava;


// Backbone sync method override for Strava JSONP API
var sync = function( method, model, options ) {
  var config = _.extend( options, {
    dataType: 'jsonp',
    url: model.url( options )
  });

  return require( 'jquery' ).ajax( config );
}


function urlMaker( tmpl, tmplVars, params ) {
  var path = require( 'mustache' ).render( tmpl, tmplVars ),
    finalParams = _.extend({ access_token : accessToken }, params );

  return url.format({
    protocol : protocol,
    host : baseURL,
    pathname : path,
    query : finalParams
  });
}

var endpoints = {
  athlete : _.partial( urlMaker, '/api/v3/athletes/{{ id }}' ),
  segment : _.partial( urlMaker, '/api/v3/segments/{{ id }}' ),
  segmentEfforts : _.partial( urlMaker, '/api/v3/segments/{{ segment_id }}/all_efforts' ),
  segmentEffort : _.partial( urlMaker, '/api/v3/segment_efforts/{{ id }}' ),
};


module.exports = {
  endpoints : endpoints,
  sync : sync
};