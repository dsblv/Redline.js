if ( typeof noGlobal === typeof undefined ) {
    window.Gauge = Gauge;
}

return Gauge;

}));


var thegauge = new Gauge( document.getElementById( 'gauge' ), { 
    marks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'daym'],
    position : 5
});

console.log( thegauge );