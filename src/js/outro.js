if ( typeof noGlobal === typeof undefined ) {
    window.Gauge = Gauge;
}

if ( window.jQuery && window.jQuery.bridget ) {
    jQuery.bridget( 'gauge', Gauge );
}

return Gauge;

}));


/*var thegauge = new Gauge( document.getElementById( 'gauge' ), { 
    marks: [1, 'hello', 3, 4, 5, 6, 7, 8, 9, 'daym'],
    position : 5.6
});

console.log( thegauge );*/