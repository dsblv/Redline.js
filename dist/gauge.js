/* !
 * Gauge.js
 * Cool customizable html gauge
 * //github.com/dsblv/Gauge.js
 * by Dmitry Sobolev
 */



// Common.js-friendly stuff from jQuery

(function( global, factory ) {

    if ( typeof module === "object" && typeof module.exports === "object" ) {

        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "Gauge.js requires a window with a document" );
                }
                return factory( w );
            };

    } else {
        factory( global );
    }

}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
/*!
 * Browswer CSS prefix detection snippet by David Walsh
 * http://davidwalsh.name/vendor-prefix
 */

var prefix = (function () {
    var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
            .call(styles)
            .join('') 
            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
    };
})();


/**
 * @param {Element} element
 * @param {Object} options
 * @constructor
 */
function Gauge ( element, options ) {

    // default values
    var defaults = {
        angle       : 240,
        marks       : [0, 1, 2, 3, 4, 5, 6],
        innerMarks  : false,
        position    : 0
    }

    // DOM elements 
    this.el         = element;
    this.handEl     = element.getElementsByClassName('gaugejs-hand')[0];
    this.captionsEl = element.getElementsByClassName('gaugejs-captions')[0];

    if ( window.jQuery )
        this.$el = window.jQuery( this.el );



    this.attributes = defaults;

    this.extend( options )
        ._calculateAngle()
        ._init();

}

// getter method
Gauge.prototype.get = function ( key ) {
    return this.attributes[key];
}

// setter method
Gauge.prototype.set = function ( key, value ) {
    if ( typeof key === 'object' )
        return this.extend( key );

    this.attributes[key] = value;

    if ( key === 'position' )
        return this._calculateAngle();

    return this;
}

// sets multiple values
Gauge.prototype.extend = function ( obj ) {
    var i = 0;

    if ( typeof obj === 'object' )
        for ( i in obj )
            this.set(i, obj[i]);

    return this;
}

// calculates actual hand angle
Gauge.prototype._calculateAngle = function ( angle, position ) {

    var angle      = angle    || this.get('angle'),
        position   = position || this.get('position'),
        percentage = position / (this.get('marks').length - 1);
        handAngle  = (360 - angle) / 2 + angle * percentage;

    return this.set('handAngle', handAngle)
               .moveHand();
}

// moves the arrow to specific angle
Gauge.prototype.moveHand = function ( angle ) {
    var angle = angle || this.get('handAngle');

    this.handEl.style.transform = this.handEl.style[prefix.lowercase + 'Transform'] = 'rotate(' + angle + 'deg)';

    return this;
}


Gauge.prototype._init = Gauge.prototype.moveHand;

if ( typeof noGlobal === typeof undefined ) {
    window.Gauge = Gauge;
}

return Gauge;

}));


var thegauge = new Gauge( document.getElementById( 'gauge' ), { position : 4 } );

console.log( thegauge );