require("./style.css");
//document.write(require("./content.js"));

var PIXI = require('pixi.js')

var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

var = PIXI.Sprite.fromImage('assets/images/bg.png');
var x= 0;

bunny.anchor.set(0.5);

bunny.x = app.renderer.width /6;
bunny.y = app.renderer.height /6;

app.stage.addChild(bunny);

app.ticker.add(function(delta){

	bunny.rotation+= 0.1/delta;

});