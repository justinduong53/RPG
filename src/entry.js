require("./style.css");
//document.write(require("./content.js"));

var PIXI = require('pixi.js')

var states = {
	World:0, Battle:1, Settings:2
};

var state;

var app = new PIXI.Application(450, 800, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

var worldButtons = [];

var sprites = {};
var loader;

var worldScene = new PIXI.Container();
app.stage.addChild(worldScene);
var battleScene = new PIXI.Container();
app.stage.addChild(battleScene);

currentScene = battleScene;

worldScene.visible=false
//battleScene.visible = false;

function setup(){
	
	 
	loader = new PIXI.loaders.Loader();

	loader
		.add("bg","assets/images/bg.png")
		.add('button','assets/images/UI/button.png')
		.add('buttonDown','assets/images/UI/buttonDown.png')


		.load(function(loader, resources) {
				sprites.bgTop = new PIXI.Sprite.fromImage(resources["bg"].url);
				sprites.bgBottom = new PIXI.Sprite.fromImage(resources["bg"].url);
				sprites.textureButton = new PIXI.Texture.fromImage(resources["button"].url);
				sprites.textureButtonDown = new PIXI.Texture.fromImage(resources["buttonDown"].url);
				sprites.textureButtonOver = new PIXI.Texture.fromImage(resources["button"].url);

	});

	state = battle;
	loader.onComplete.add(() => {spriteLoad(),gameLoop()});

}

function gameLoop(){
	requestAnimationFrame(gameLoop);
	state();
	app.renderer.render(currentScene)
}

function battle(){

}

function spriteLoad(){

	

	var worldButtonPositions = [
	    sprites.textureButton.width/2.5, app.renderer.height-sprites.textureButton.height/2-app.renderer.height/8,
	    app.renderer.width/4+sprites.textureButton.width/2.5, app.renderer.height-sprites.textureButton.height/2-app.renderer.height/8,
	    2*app.renderer.width/4+sprites.textureButton.width/2.5, app.renderer.height-sprites.textureButton.height/2-app.renderer.height/8,
	    3*app.renderer.width/4+sprites.textureButton.width/2.5, app.renderer.height-sprites.textureButton.height/2-app.renderer.height/8,
	];
	//---------------------- World State -----------------------------------//


		sprites.bgTop.anchor.set(0.5);

		sprites.bgTop.height = 0.58*app.renderer.height
		sprites.bgTop.x = app.renderer.width /2;
		sprites.bgTop.y = sprites.bgTop.height/2;
		

		worldScene.addChild(sprites.bgTop);
		battleScene.addChild(sprites.bgTop);
		
		sprites.bgBottom.anchor.set(0.5);

		sprites.bgBottom.height = 0.42*app.renderer.height
		sprites.bgBottom.x = app.renderer.width /2;
		sprites.bgBottom.y = sprites.bgTop.height+sprites.bgBottom.height/2;
		

		worldScene.addChild(sprites.bgBottom);
		battleScene.addChild(sprites.bgBottom);

		for (var i = 0;  i < worldButtonPositions.length;i++){

			var button = new PIXI.Sprite(sprites.textureButton);
			button.buttonMode = true;

			button.width = 80
			button.height = 80

			button.anchor.set(0.5);
			button.x = worldButtonPositions[i*2];
			button.y = worldButtonPositions[i*2 + 1];

		    button.interactive = true;
		    button.buttonMode = true;

			button.on('pointerdown', onButtonDown)
	        button.on('pointerup', onButtonUp)
	        button.on('pointerupoutside', onButtonUp)
	        button.on('pointerover', onButtonOver)
	        button.on('pointerout', onButtonOut);

	        worldScene.addChild(button);

	        worldButtons.push(button);

		}
		//-------------------------
		//app.ticker.add(function(delta){

			//sprites.bgTop.rotation+= 0.1/delta;
			//for (var i = 0;  i < worldButtonPositions.length;i++){
			//	worldButtons[i].rotation+=0.1/delta;
			//}

		//});
	
	//---------------------- Battle State -----------------------------------//
}
function onButtonDown() {
	console.log("hi")
    this.isdown = true;
    this.texture = sprites.textureButtonDown;
    this.alpha = 1;
}
function onButtonUp() {

    this.isdown = false;
    if (this.isOver) {
        this.texture = sprites.textureButtonOver;
    }
    else {
        this.texture = sprites.textureButton;
    }
    if(this == worldButtons[3]){
		state = battle;
		currentScene = battleScene;
		worldScene.visible = false;
		battleScene.visible = true;

	}
}

function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = sprites.textureButtonOver;
}

function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = sprites.textureButton;
}
setup();

	