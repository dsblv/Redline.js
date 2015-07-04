/* !
 * Redline
 * Cool customizable html gauge
 * //github.com/dsblv/redline.js
 * by Dmitry Sobolev
 */



// Common.js-friendly stuff from jQuery

(function( global, factory ) {

    if ( typeof module === "object" && typeof module.exports === "object" ) {

        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "Redline.js requires a window with a document" );
                }
                return factory( w );
            };

    } else {
        factory( global );
    }

}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

/**
 * Bridget makes jQuery widgets
 * v1.1.0
 * MIT license
 */

( function( window ) {

'use strict';

// -------------------------- utils -------------------------- //

var slice = Array.prototype.slice;

function noop() {}

// -------------------------- definition -------------------------- //

function defineBridget( $ ) {

// bail if no jQuery
if ( !$ ) {
  return;
}

// -------------------------- addOptionMethod -------------------------- //

/**
 * adds option method -> $().plugin('option', {...})
 * @param {Function} PluginClass - constructor class
 */
function addOptionMethod( PluginClass ) {
  // don't overwrite original option method
  if ( PluginClass.prototype.option ) {
    return;
  }

  // option setter
  PluginClass.prototype.option = function( opts ) {
    // bail out if not an object
    if ( !$.isPlainObject( opts ) ){
      return;
    }
    this.options = $.extend( true, this.options, opts );
  };
}

// -------------------------- plugin bridge -------------------------- //

// helper function for logging errors
// $.error breaks jQuery chaining
var logError = typeof console === 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

/**
 * jQuery plugin bridge, access methods like $elem.plugin('method')
 * @param {String} namespace - plugin name
 * @param {Function} PluginClass - constructor class
 */
function bridge( namespace, PluginClass ) {
  // add to jQuery fn namespace
  $.fn[ namespace ] = function( options ) {
    if ( typeof options === 'string' ) {
      // call plugin method when first argument is a string
      // get arguments for method
      var args = slice.call( arguments, 1 );

      for ( var i=0, len = this.length; i < len; i++ ) {
        var elem = this[i];
        var instance = $.data( elem, namespace );
        if ( !instance ) {
          logError( "cannot call methods on " + namespace + " prior to initialization; " +
            "attempted to call '" + options + "'" );
          continue;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === '_' ) {
          logError( "no such method '" + options + "' for " + namespace + " instance" );
          continue;
        }

        // trigger method with arguments
        var returnValue = instance[ options ].apply( instance, args );

        // break look and return first value if provided
        if ( returnValue !== undefined ) {
          return returnValue;
        }
      }
      // return this if no return value
      return this;
    } else {
      return this.each( function() {
        var instance = $.data( this, namespace );
        if ( instance ) {
          // apply options & init
          instance.option( options );
          instance._init();
        } else {
          // initialize new instance
          instance = new PluginClass( this, options );
          $.data( this, namespace, instance );
        }
      });
    }
  };

}

// -------------------------- bridget -------------------------- //

/**
 * converts a Prototypical class into a proper jQuery plugin
 *   the class must have a ._init method
 * @param {String} namespace - plugin name, used in $().pluginName
 * @param {Function} PluginClass - constructor class
 */
$.bridget = function( namespace, PluginClass ) {
  addOptionMethod( PluginClass );
  bridge( namespace, PluginClass );
};

return $.bridget;

}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [ 'jquery' ], defineBridget );
} else if ( typeof exports === 'object' ) {
  defineBridget( require('jquery') );
} else {
  // get jquery from browser global
  defineBridget( window.jQuery );
}

})( window );
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


function rotate( element, angle ) {
    element.style.transform =
    element.style[prefix.lowercase + 'Transform'] = 'rotate(' + angle + 'deg)';
}


/**
 * @param {Element} element
 * @param {Object} options
 * @constructor
 */
function Redline ( element, options ) {

    // default values
    var defaults = {
        aperture    : 180,
        marks       : [0, 1, 2, 3, 4, 5, 6],
        innerMarks  : false,
        position    : 0
    }

    // DOM elements 
    this.el         = element;
    this.handEl     = element.getElementsByClassName('redline-hand-wrap')[0];
    this.captionsEl = element.getElementsByClassName('redline-captions')[0];

    if ( window.jQuery )
        this.$el = window.jQuery( this.el );

    this.attributes = defaults;

    this._extend( options )
        ._calculateAngle()
        ._init();

}

// getter method
Redline.prototype.get = function ( key ) {
    return this.attributes[key];
}

// setter method
Redline.prototype.set = function ( key, value ) {
    if ( typeof key === 'object' )
        return this._extend( key );

    this.attributes[key] = value;

    if ( key === 'position' )
        return this._calculateAngle();

    return this;
}

// sets multiple values
Redline.prototype._extend = function ( obj ) {
    var i = 0;

    if ( typeof obj === 'object' )
        for ( i in obj )
            this.set(i, obj[i]);

    return this;
}

// calculates actual hand angle
Redline.prototype._calculateAngle = function ( angle, position, getter ) {

    var angle      = angle    || this.get('aperture'),
        position   = position || this.get('position'),
        percentage = position / (this.get('marks').length - 1);
        handAngle  = (360 - angle) / 2 + angle * percentage;

    if ( getter )
        return handAngle;

    return this.set('handAngle', handAngle)
               .moveHand();
}

// moves the arrow to specific angle
Redline.prototype.moveHand = function ( angle ) {
    var angle = angle || this.get('handAngle');

    rotate( this.handEl, angle );

    return this;
}


// sets angles
Redline.prototype.render = function () {
    var angle       = (360 - this.get('aperture'))/2 - 90,
        leftHalf    = this.el.getElementsByClassName('redline-dial-left-wrap')[0],
        rightHalf   = this.el.getElementsByClassName('redline-dial-right-wrap')[0];

    rotate( leftHalf, angle );
    rotate( rightHalf, -angle );

    return this._renderMarks();
}

// drops custom marks on a gauge
Redline.prototype._renderMarks = function () {
    var marks = this.get( 'marks' ),
        markList = this.captionsEl
                       .getElementsByTagName( 'ul' )[0];

    for ( var i in marks ) {
        /* every mark should be placed and rotated the right way */
        var mark  = window.document.createElement( 'li' ),
            angle = this._calculateAngle(null, i, true);

        mark.innerHTML = '<span><b>' + marks[i] + '</b></span>';
        rotate( mark, angle );
        
        var span = mark.getElementsByTagName( 'span' )[0];
        rotate( span, -angle );


        /* nice alignment for long captions */
        if ( marks[i].toString().length > 1 ) {
            if ( i < marks.length / 2 )
                mark.className = 'redline-caption-left-fit';
            else
                mark.className = 'redline-caption-right-fit';
        }

        /* ready to go */
        markList.appendChild(mark);
    }

    /* move marks inside if required */
    if ( this.get('innerMarks') )
        this.captionsEl.className += ' redline-captions-inner';

    return this.moveHand();
}

Redline.prototype._init = Redline.prototype.render;


Redline.prototype.point = function ( index ) {
    return this.set('position', index);
}

if ( typeof noGlobal === typeof undefined ) {
    window.Redline = Redline;
}

/* Converting to jquery plugin */
if ( window.jQuery && window.jQuery.bridget ) {
    jQuery.bridget( 'redline', Redline );
}

return Redline;

}));