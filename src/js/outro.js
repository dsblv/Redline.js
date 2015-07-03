if ( typeof noGlobal === typeof undefined ) {
    window.Redline = Redline;
}

/* Converting to jquery plugin */
if ( window.jQuery && window.jQuery.bridget ) {
    jQuery.bridget( 'redline', Redline );
}

return Redline;

}));