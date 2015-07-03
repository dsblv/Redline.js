/* !
 * Gauge.js
 * Cool customizable html gauge
 * //github.com/dsblv/Gauge.js
 * by Dmitry Sobolev
 */

//= intro

function Gauge ( element, options ) {

    var defaults = {
        points            : [],
        position          : 0,

        baseLineLength    : .6,
        warningLineLength : .3,
        dangerLineLength  : .6,

        baseLineWidth     : 3, // px

        baseLineColor     : 'black',
        warningLineColor  : 'yellow',
        dangerLineColor   : 'red'
    }

    this.el = element;

    if ( window.jQuery )
        this.$el = window.jQuery( this.el );

    this.attributes = defaults;

    this._grabCSSSettings()
        .extend( options );

    this._init();

    return this;
}



Gauge.prototype.extend = function ( obj ) {
    var i = 0;

    if ( typeof obj === 'object' )
        for ( i in obj )
            this.attributes[ i ] = obj[ i ];

    return this;
}


Gauge.prototype._grabCSSSettings = function () {
    // grabbing css settings to draw nice canvas
    var values = {};

    return this.extend( values );
}

Gauge.prototype.draw = function () {

    return this;
}

Gauge.prototype._init = Gauge.prototype.draw;

//= outro