require("./style.css");
//document.write(require("./content.js"));

var PIXI = require('pixi.js');

var PlayerCharacter = require('./gameScripts/Battle/PlayerCharacter.js');
var EnemyCharacter = require('./gameScripts/Battle/EnemyCharacter.js');
var Action = require('./gameScripts/Battle/Action.js');

var states = {
	World:0, Battle:1, Settings:2
};

var state;

var app = new PIXI.Application(450, 800, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

var worldButtons = [];
var battleButtons = [];

var sprites = {};
var loader;

var worldScene = new PIXI.Container();
app.stage.addChild(worldScene);
var battleScene = new PIXI.Container();
app.stage.addChild(battleScene);

var currentScene = worldScene;

//worldScene.visible=true;
battleScene.visible = false;

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
	

var enemies = [];
var players = [];
var currentPlayer;
var actionQueue = [];


var ActionLoader = new Action();


var hiro = new PlayerCharacter("Hiro",1,35,20,1,1,1,1,1,1,false,'Snek',0);
var yeezy = new PlayerCharacter("Yeezy",1,35,20,1,1,2,1,1,1,false,'Snek',1);
var saey = new PlayerCharacter("Saey",1,0,20,1,1,1,1,3,1,false,'Snek',2);
var jayz = new PlayerCharacter("JayZ",1,35,20,1,1,1,4,1,1,false,'Snek',3);
var biggy = new PlayerCharacter("Biggy",1,0,20,1,1,1,5,1,1,false,'Snek',4);

var rat = new EnemyCharacter("Rat",1,15,10,1,1,1,6,1,1,false,'Monster',0);

function battle(){

}

function battleSequence(){
	actionQueue.push(new Action(enemies[0],players[0],'basicAttack'));
	for (var i = 1;i<actionQueue.length;i++){
		var j = i;
		while (j > 0 && actionQueue[j-1].user.getSpd() > actionQueue[j].user.getSpd()){
			var temp = actionQueue[j];
			actionQueue[j] = actionQueue[j-1];
			actionQueue[j-1] = temp;
			j = j-1;
		}
	}
	console.log(actionQueue);
}

function spriteLoad(){

	

	var worldButtonPositions = [
	    sprites.textureButton.width/2.5, app.renderer.height-sprites.textureButton.height/2-app.renderer.height/8,
	    app.renderer.width/4+sprites.textureButton.width/2.5, app.renderer.height-sprites.textureButton.height/2-app.renderer.height/8,
	    2*app.renderer.width/4+sprites.textureButton.width/2.5, app.renderer.height-sprites.textureButton.height/2-app.renderer.height/8,
	    3*app.renderer.width/4+sprites.textureButton.width/2.5, app.renderer.height-sprites.textureButton.height/2-app.renderer.height/8,
	];

	var battleButtonPositions = [
		sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)/2,
		sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)*1.5,
		sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)*2.5,
		sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)*3.5,
		sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)*4.5,
		sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)*5.5,
	];
	//---------------------- World State -----------------------------------//


		sprites.bgTop.anchor.set(0.5);

		sprites.bgTop.height = 0.58*app.renderer.height
		sprites.bgTop.x = app.renderer.width /2;
		sprites.bgTop.y = sprites.bgTop.height/2;
		

		//app.stage.addChild(sprites.bgTop);
		battleScene.addChild(sprites.bgTop);
		
		sprites.bgBottom.anchor.set(0.5);

		sprites.bgBottom.height = 0.42*app.renderer.height
		sprites.bgBottom.x = app.renderer.width /2;
		sprites.bgBottom.y = sprites.bgTop.height+sprites.bgBottom.height/2;
		

		//app.stage.addChild(sprites.bgBottom);
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

		for (var i = 0;  i < battleButtonPositions.length;i++){

			var button = new PIXI.Sprite(sprites.textureButton);
			button.buttonMode = true;


			button.height = ((0.42*app.renderer.height)/6)

			button.anchor.set(0.5);
			button.x = battleButtonPositions[i*2];
			button.y = battleButtonPositions[i*2 + 1];

		    button.interactive = true;
		    button.buttonMode = true;

			button.on('pointerdown', onButtonDown)
	        button.on('pointerup', onButtonUp)
	        button.on('pointerupoutside', onButtonUp)
	        button.on('pointerover', onButtonOver)
	        button.on('pointerout', onButtonOut);

	        battleScene.addChild(button);

	        battleButtons.push(button);

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

    	players.push(hiro);
    	players.push(yeezy);
    	players.push(saey);
    	players.push(jayz);
    	players.push(biggy);

		enemies.push(rat);
		currentPlayer = players[0].pos;


		state = battle;
		currentScene = battleScene;
		worldScene.visible = false;
		battleScene.visible = true;




	}
	if(this == battleButtons[0]){

		var lastPlayer = currentPlayer;
		
		for (var i = currentPlayer+1;i<players.length;i++){
			if(players[i].getHp() != 0){

				actionQueue.push(new Action(players[currentPlayer],enemies[0],'basicAttack'));
				currentPlayer = i;
				break;
			}

		}
		if(currentPlayer == lastPlayer){
			actionQueue.push(new Action(players[currentPlayer],enemies[0],'basicAttack'));
			battleSequence();
		}	
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

	