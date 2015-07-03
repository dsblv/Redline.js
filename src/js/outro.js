if ( typeof noGlobal === typeof undefined ) {
    window.Gauge = Gauge;
}

return Gauge;

}));


var thegauge = new Gauge(document.getElementById( 'gauge' ));

console.log( thegauge );