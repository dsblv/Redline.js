/* !
 * Gauge.js
 * Cool customizable html gauge
 * //github.com/dsblv/Gauge.js
 * by Dmitry Sobolev
 */


//= intro


/**
 * @param {Element} element
 * @param {Object} options
 * @constructor
 */
function Gauge ( element, options ) {

    var defaults = {
        points            : [],
        position          : 0
    }

    this.el = element;

    if ( window.jQuery )
        this.$el = window.jQuery( this.el );

    this.attributes = defaults;

    this._grabCSSSettings()
        .extend( options );

    this._init();
}


/**
 * adds new attributes to a Gauge or changes old ones
 * @param {Object} obj - object with new attributes
 */
Gauge.prototype.extend = function ( obj ) {
    var i = 0;

    if ( typeof obj === 'object' )
        for ( i in obj )
            this.attributes[i] = obj[i];

    return this;
}

// draws a frame on a canvas
Gauge.prototype.draw = function () {

    return this;
}


Gauge.prototype._init = Gauge.prototype.draw;

//= outro