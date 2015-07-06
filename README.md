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

##Custimization##

Redline.js gauge can be custimized entirely via CSS. Threre's also a possibility to customize each segment separately. To do so, just specify a type for a segment in `options.marks` array like this:

```javascript
// ~~~
    marks: [
        { caption: 'R', type: 'red' },
        { caption: 'A', type: 'orange' },
        { caption: 'I', type: 'yellow' },
        { caption: 'N', type: 'green' },
        { caption: 'B', type: 'blue' },
        { caption: 'O', type: 'indigo' },
        { caption: 'W', type: 'violet' }
    ]
// ~~~
```

*Type* will be attached to a segment element as a class: `.redline-dial-segment-*type*` so you can specify custom styles for it's color, font, mark size etc.

There are also two default classes: `.redline-dial-segment-warning` and `.redline-dial-segment-danger` that are attached to penultimate and last 
segment respectively, but can be overrided in `options`.

You can found an example of fully customized gauge in `demo/`.

##Installation##

You can install Redline.js via **npm**:

```
npm install redline
```

Or **bower**

```
bower install redline
```