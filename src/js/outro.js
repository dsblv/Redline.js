if ( typeof noGlobal === typeof undefined ) {
    window.Gauge = Gauge;
}

if ( window.jQuery && window.jQuery.bridget ) {
    jQuery.bridget( 'gauge', Gauge );
}

return Gauge;

}));