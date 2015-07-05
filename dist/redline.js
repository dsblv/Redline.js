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

var vendorPrefix = (function () {
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


var _ = {
    'nodify': function ( map, selector, parent, prefix ) {
        function create ( attributes, prefix ) {
            var el = window.document.createElement( attributes.tagName );
            if ( attributes.className.length > 0 )
                el.className = ( typeof prefix === 'string' ) ?
                               prefix + '-' + attributes.className :
                               attributes.className;

            return el;
        }

        function translate ( selector ) {
            var info = selector.split('.');

            if ( info.length == 1 )
                return {
                    tagName   : 'div',
                    className : info[0]
                }
            else
                return {
                    tagName   : info[0],
                    className : info[1]
                }
        }

        function isNode ( el ) {
            return (typeof el === 'object' &&
                    typeof el.appendChild === typeof Function);
        }

        var attributes = translate( selector ),
            el;

        if ( isNode( parent ) ) {
            el = create( attributes, prefix );
            parent.appendChild( el );
        } else
            el = create( attributes );

        if ( typeof map === 'object' )
            for (node in map)
                _.nodify( map[node], node, el, prefix || selector );
        else
            _.nodify( null, map, el, prefix || selector );

        return el;
    },
    byClass: function ( class, parent ) {
        var parent = parent || window.document;

        return parent.getElementsByClassName( class )[0] || false;
    },
    rotate: function ( element, angle ) {
        element.style.transform =
        element.style[vendorPrefix.lowercase + 'Transform'] = 'rotate(' + angle + 'deg)';
    },
    addClass: function ( element, className ) {
        var classList = element.className.split( ' ' );

        if ( classList.indexOf( className ) == -1 )
            classList.push( className );

        element.className = classList.join( ' ' );
    }
}




// Main Redline class
function Redline ( element, options ) {

    // default values
    var defaults = {
        aperture    : 260,
        marks       : [0, 1, 2, 3, 4, 5, 6],
        innerMarks  : false,
        position    : 0
    }

    // DOM elements 
    this.el = element;

    if ( window.jQuery )
        this.$el = window.jQuery( this.el );

    this.attributes = defaults;

    this._extend( options )
        ._processMarks()
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

// handles marks array
Redline.prototype._processMarks = function ( marks ) {
    var marks = marks || this.get( 'marks' );

    for ( var index in marks )
        if ( typeof marks[index] != 'object' )
            marks[index] = { caption: marks[index].toString() };

    var length = marks.length;
    if ( !marks[length - 2].type )
        marks[length - 2].type = 'warning';

    if ( !marks[length - 1].type )
        marks[length - 1].type = 'danger';

    return this;
}


// creates segment
Redline.prototype._createSegment = function ( width, angle, index, loop ) {
    var width  = width || 0,
        angle  = angle || 0,
        prefix = 'redline-dial-segment',
        map    = {
            'wrap': {
                'wrap-wrap': 'line'
            },
            'mark': {
                'mark-wrap': 'span.'
            }
        },
        segment = _.nodify( map, prefix ),
        mark    = this.get( 'marks' )[index];

    // first let's rotate the segment
    _.rotate( segment, angle );

    // add class to it
    if ( typeof mark.type != 'undefined' )
        _.addClass( segment, prefix + '-' + mark.type );

    // then rotate wraps to acheive desired width 
    var outer   = _.byClass( prefix + '-wrap', segment ),
        inner   = _.byClass( prefix + '-wrap-wrap', outer ),
        caption = _.byClass( prefix + '-mark-wrap', segment );

    if ( ( index == 0 || index == this.get( 'marks' ).length - 1 ) && !loop )
        _.rotate( inner, -width/2 );
    else
        _.rotate( inner, -width );

    if ( index == ( this.get( 'marks' ).length - 1 ) && !loop )
        _.rotate( outer, 0 );
    else
        _.rotate( outer, width/2 );


    // then rotate caption back to horizontal
    _.rotate( caption, -angle );

    console.log(caption);

    // then align ling captions
    if ( mark.caption.toString().length > 1 ) {
        if ( index < this.get( 'marks' ).length / 2 )
            _.addClass( caption, prefix + '-mark-left-fit' );
        else
            _.addClass( caption, prefix + '-mark-right-fit' );
    }

    caption.getElementsByTagName( 'span' )[0].innerHTML = mark.caption;

    return segment;
}

// calculates actual hand angle
Redline.prototype._calculateAngle = function ( angle, position, getter ) {

    var aperture   = angle    || this.get('aperture'),
        position   = position || this.get('position'),
        noLoop     = 1 * ( aperture != 360 ),
        percentage = position / ( this.get('marks').length - noLoop );
        handAngle  = ( 360 - aperture ) / 2 + aperture * percentage;

    if ( getter )
        return handAngle;

    return this.set('handAngle', handAngle);
}

// moves the arrow to specific angle
Redline.prototype.moveHand = function ( angle ) {
    var angle = angle || this.get('handAngle');

    _.rotate( this.handEl, angle );

    return this;
}


// sets angles
Redline.prototype.render = function () {
    var aperture = this.get( 'aperture' ),
        marks    = this.get( 'marks' ),
        noLoop   = 1 * ( aperture != 360 ),
        width    = aperture / (marks.length - noLoop);
        prefix   = 'redline',
        map      = {
            'dial' : null,
            'hand' : {
                'hand-wrap' : {
                    'hand-arrow'  : null,
                    'hand-center' : null
                }
            }
        },
        redline  = _.nodify( map, prefix );

    this.el.innerHTML = '';
    this.el.appendChild( redline );
    this.el = redline;

    this.handEl = _.byClass( 'redline-hand-wrap', this.el );

    var dial     = _.byClass( 'redline-dial', this.el );

    for ( var index in marks ) {
        angle = this._calculateAngle(null, index, true);
        segment = this._createSegment( width, angle, index, aperture == 360 );

        console.log(index);

        dial.appendChild( segment );
    }

    if ( this.get( 'innerMarks' ) )
        _.addClass( this.el, 'redline-inner-marks' );

    return this;
}

Redline.prototype._init = Redline.prototype.render;


Redline.prototype.point = function ( index ) {
    return this.set('position', index)
               ._calculateAngle()
               .moveHand();
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