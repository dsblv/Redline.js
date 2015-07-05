#Redline.js#

Highly flexible JavaScript-driven html gauge.

[Live Demo](http://dsblv.github.io/Redline.js/)

##Features##

* Lightweight
* Fully customizable via CSS
* Custom marks & aperture
* Compatible with jQuery

##Usage##

First add some style by hooking up `redline.css`. You can build your own theme by compiling `src/scss/redline.scss` with custom variables. You can also override basic style via CSS as the demo (`demo/style.css`) shows.

###JavaScript###

There are two ways of using Redline.js in a browser: with jQuery or without.

###Using jQuery###

Just point jQuery to your `.gauge` container and spice with some **options**.

```javascript
$( '#gauge' ).redline( options );
```

When gauge is initialized, you can move it's arrow with *point* method:

```javascript
$( '#gauge' ).redline( 'point', 5 );
```

This method takes new arrow position as an argument. Arrow position is an index of the mark it points to. If it's fractional, arrow will point between two marks.

###Without jQuery###

Redline can also be used as a class. All methods are the same, the only difference is how you call them:

```javascript
var gauge = new Redline( options );

gauge.point( 5 );

// or

gauge.set( 'position', 5 );
```

###Options###

You can initialize Redline with a set of options.

```javascript
var options = {
    aperture    : 240, // gauge's aperture in degrees
    marks       : [{ caption: '0', type: 'srart' }, 1, 2, 'stop'], // array of custom marks
    innerMarks  : true, // if true — marks are kept inside the gauge
    position    : 0 // default gauge position
}

$( '#gauge' ).redline( options );
```

##Installation##

You can install Redline.js via **npm**:

```
npm install redline
```