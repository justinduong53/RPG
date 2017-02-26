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
		.add('status','assets/images/UI/blacksq.png')
		.add('statusLvl','assets/images/UI/greensq.png')
		.add('statusHP','assets/images/UI/orangesq.png')
		.add('statusMP','assets/images/UI/bluesq.png')
		.add('statusBar','assets/images/UI/greysq.png')
		.add('statusBarLoss','assets/images/UI/lgreysq.png')


		.load(function(loader, resources) {
				sprites.bgTop = new PIXI.Sprite.fromImage(resources["bg"].url);
				sprites.bgBottom = new PIXI.Sprite.fromImage(resources["bg"].url);
				sprites.textureButton = new PIXI.Texture.fromImage(resources["button"].url);
				sprites.textureButtonDown = new PIXI.Texture.fromImage(resources["buttonDown"].url);
				sprites.textureButtonOver = new PIXI.Texture.fromImage(resources["button"].url);
				sprites.status = new PIXI.Texture.fromImage(resources["status"].url);
				sprites.statusLvl = new PIXI.Texture.fromImage(resources["statusLvl"].url);
				sprites.statusHP = new PIXI.Texture.fromImage(resources["statusHP"].url);
				sprites.statusMP = new PIXI.Texture.fromImage(resources["statusMP"].url);
				sprites.statusBar = new PIXI.Texture.fromImage(resources["statusBar"].url);
				sprites.statusBarLoss = new PIXI.Texture.fromImage(resources["statusBarLoss"].url);
	});

	state = battle;
	loader.onComplete.add(() => {spriteLoad(),gameLoop()});

}

function gameLoop(){
	requestAnimationFrame(gameLoop);
	state();
	app.renderer.render(currentScene)
}
//Battle Variables
var turn = 0;

var enemies = [];
var players = [];
var currentPlayer;
var actionQueue = [];
var length = 0
var playerActionConfirmed = false;
var animationOver = true;
var animationTimer = 0;

var actionLoader = new Action();
var actionCount = 0;
var time;

var x = 0;
//static
var playerBattleStatus = [];
var playerBattleStatusPositions = [];
var playerLvlStatus = [];
var playerNameStatus = [];
var playerHPStatus = [];
var playerMPStatus = [];
var playerBarStatus = [];
//dyanmic 
var playerNameTxtStatus = [];
var playerLvlTxtStatus = [];
var playerHPTxtStatus = [];
var playerMPTxtStatus = [];
var playerHPStatusWidth = [];
var playerMPStatusWidth = [];

var hiro = new PlayerCharacter("Hiro",1,35,20,1,1,1,1,1,1,false,'Snek',0);
var yeezy = new PlayerCharacter("Yeezy",1,35,20,1,1,1,2,1,1,false,'Snek',1);
var saey = new PlayerCharacter("Saey",1,21,20,1,1,1,1,3,1,false,'Snek',2);
var jayz = new PlayerCharacter("JayZ",1,35,20,1,1,1,4,1,1,false,'Snek',3);
var biggy = new PlayerCharacter("Biggy",1,30,20,1,1,1,5,1,1,false,'Snek',5);

var rat = new EnemyCharacter("Rat",1,15,10,100,1,1,6,1,1,false,'Monster',0);
function world(){

}

function battle(){
	if(currentScene==battleScene){
		if(length> actionCount){	
			var newTime = Date.now() / 1000
			if(actionQueue[0].type == 'basicAttack'){
				if(newTime-time > 1){
					
					var actor = actionQueue.shift();
					actor.perform();
					console.log(actor.user.getName() + " used " + actor.type +" on "+actor.target.getName());
					if(actor.target.hp <= 0){
						for(var i = 0;i<actionQueue.length;i++){
							if(actionQueue[i].user == actor.target){
								var temp1 = actionQueue.slice(0,i);
								var temp2 = actionQueue.slice((i+1),actionQueue.length);
								actionQueue = temp1.concat(temp2);
								length--;
							}
						}
					}
					//console.log(temp1);
					time = Date.now()/1000;
					animationTimer=0;
					actionCount++;
					animationOver=true;
					currentPlayer = getFirstAlivePlayer();
					updatePlayerInfo();
				}
				else{
					battleButtons[3].x++
					animationTimer++;
				}

			}
			
		}
		else{
			playerActionConfirmed = false;
		}
	}
}

function battleSequence(){
	turn++;
	
	enemyTurn();
	actionCount = 0;
	length = actionQueue.length;
	for (var i = 1;i<length;i++){
		//console.log(actionQueue[i-1].user);
		var j = i;
		while (j > 0 && actionQueue[j-1].moveSpeed() < actionQueue[j].moveSpeed()){
			var temp = actionQueue[j];
			actionQueue[j] = actionQueue[j-1];
			actionQueue[j-1] = temp;
			j = j-1;
		}
	}

	
	time = Date.now()/1000;

}
function enemyTurn(){
	actionQueue.push(new Action(enemies[0],players[0],'basicAttack'));
}

function updatePlayerInfo(){
	for(var i = 0;i<players.length;i++){
		playerNameTxtStatus[players[i].getPos()].text = players[i].getName();
		playerLvlTxtStatus[players[i].getPos()].text = players[i].getLvl()+"";
		if(players[i].getHp()>0){
			playerHPStatusWidth[players[i].getPos()].width =90-90*(players[i].getHp()/players[i].getMaxHp());
			
		}
		else{
			playerHPStatusWidth[players[i].getPos()].width =90;
			players[i].setHp(0);
		}
		if(players[i].getMp()>0){
			playerMPStatusWidth[players[i].getPos()].width =90-90*(players[i].getMp()/players[i].getMaxMp());
			
		}
		else{
			playerMPStatusWidth[players[i].getPos()].width =90;
			players[i].setMp(0);
		}
		playerHPTxtStatus[players[i].getPos()].text = players[i].getHp()+"";
		playerMPTxtStatus[players[i].getPos()].text = players[i].getMp()+"";
	}
}

function getFirstAlivePlayer(){
	for(var i = 0;i<players.length;i++){
		if(players[i].getHp() > 0){
			return i
		}
	}
}

var styleLvl;
var styleHp;
var styleName;
function spriteLoad(){

	styleLvl = new PIXI.TextStyle({
	    fontFamily: 'Arial',
	    fontSize: 10,

	});
	styleHp = new PIXI.TextStyle({
	    fontFamily: 'Arial',
	    fontSize: 12,
	    fill: '#9FE0E4',
	});
	styleHpGlow = new PIXI.TextStyle({
	    fontFamily: 'Arial',
	    fontSize: 12,
	    fill: '#7AE7FF  ',
	    fontWeight: 600,
	});
	styleName = new PIXI.TextStyle({
	    fontFamily: 'Arial',
	    fontSize: 15,
	    fill: '#9FE7C7',
	});
	styleLvlNum = new PIXI.TextStyle({
	    fontFamily: 'Arial',
	    fontSize: 12,
	    fill: '#38B4D0',
	});

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
	var playerBattleStatusPositions = [
		250 + sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)/2,
		250 + sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)*1.5,
		250 + sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)*2.5,
		250 +sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)*3.5,
		250 +sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)*4.5,
		250 +sprites.textureButton.width/2,0.58*app.renderer.height+((0.42*app.renderer.height)/6)*5.5,
	]
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
		//---------------------- Battle State -----------------------------------//

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

		for (var i = 0;  i < 6 ;i++){
			var status = new PIXI.Sprite(sprites.status);
			console.log((0.42*app.renderer.height)/6);
			status.height = ((0.42*app.renderer.height)/6)-3;
			status.width = 200;
			status.anchor.set(0.5);
			status.x = playerBattleStatusPositions[i*2];
			status.y = playerBattleStatusPositions[i*2 + 1];

			battleScene.addChild(status);

			playerBattleStatus.push(status);

			var lvl = new PIXI.Sprite(sprites.statusLvl);

			lvl.alpha = 0.5
			lvl.anchor.set(0.5);

			lvl.width = 40;
			lvl.height = 20;

			lvl.x = playerBattleStatusPositions[i*2]-75;
			lvl.y = playerBattleStatusPositions[i*2 + 1]-12;

			battleScene.addChild(lvl);

			playerLvlStatus.push(lvl);

			var name = new PIXI.Sprite(sprites.statusLvl);

			name.alpha = 0.5
			name.anchor.set(0.5);

			name.width = 145;
			name.height = 20;

			name.x = playerBattleStatusPositions[i*2]+22;
			name.y = playerBattleStatusPositions[i*2 + 1]-12;

			battleScene.addChild(name);

			playerNameStatus.push(name);

			var bar = new PIXI.Sprite(sprites.statusBar);


			bar.anchor.set(0.5);

			bar.width = 93;
			bar.height = 6;

			bar.x = playerBattleStatusPositions[i*2]-47;
			bar.y = playerBattleStatusPositions[i*2 + 1]+18;

			battleScene.addChild(bar);

			playerBarStatus.push(bar);

			var hpBar = new PIXI.Sprite(sprites.statusHP);


			hpBar.anchor.set(0.5);

			hpBar.width = 90;
			hpBar.height = 5;

			hpBar.x = playerBattleStatusPositions[i*2]-47;
			hpBar.y = playerBattleStatusPositions[i*2 + 1]+18;

			battleScene.addChild(hpBar);

			playerHPStatus.push(hpBar);

			var hpBarLoss = new PIXI.Sprite(sprites.statusBarLoss);

			hpBarLoss.anchor.set(1);

			hpBarLoss.width = 90;
			hpBarLoss.height = 5;

			hpBarLoss.x = playerBattleStatusPositions[i*2]-2;
			hpBarLoss.y = playerBattleStatusPositions[i*2 + 1]+21;

			battleScene.addChild(hpBarLoss);

			playerHPStatusWidth.push(hpBarLoss);

			var bar2 = new PIXI.Sprite(sprites.statusBar);

			bar2.anchor.set(0.5);

			bar2.width = 93;
			bar2.height = 6;

			bar2.x = playerBattleStatusPositions[i*2]+47;
			bar2.y = playerBattleStatusPositions[i*2 + 1]+18;

			battleScene.addChild(bar2);

			playerBarStatus.push(bar2);


			var mpBar = new PIXI.Sprite(sprites.statusMP);


			mpBar.anchor.set(0.5);

			mpBar.width = 90;
			mpBar.height = 5;

			mpBar.x = playerBattleStatusPositions[i*2]+47;
			mpBar.y = playerBattleStatusPositions[i*2 + 1]+18;

			battleScene.addChild(mpBar);

			playerMPStatus.push(mpBar);


			var mpBarLoss = new PIXI.Sprite(sprites.statusBarLoss);

			mpBarLoss.anchor.set(1);

			mpBarLoss.width = 90;
			mpBarLoss.height = 5;

			mpBarLoss.x = playerBattleStatusPositions[i*2]+92;
			mpBarLoss.y = playerBattleStatusPositions[i*2 + 1]+21;

			battleScene.addChild(mpBarLoss);

			playerMPStatusWidth.push(mpBarLoss);

			var lvlTxt = new PIXI.Text('Lv',styleLvl);

			lvlTxt.x = playerBattleStatusPositions[i*2]-90;
			lvlTxt.y = playerBattleStatusPositions[i*2 + 1]-22;

			battleScene.addChild(lvlTxt);

			var hpTxt = new PIXI.Text('HP',styleHp);

			hpTxt.x = playerBattleStatusPositions[i*2]-92;
			hpTxt.y = playerBattleStatusPositions[i*2 + 1]-1;

			battleScene.addChild(hpTxt);

			var mpTxt = new PIXI.Text('MP',styleHp);

			mpTxt.x = playerBattleStatusPositions[i*2]+2;
			mpTxt.y = playerBattleStatusPositions[i*2 + 1]-1;


			battleScene.addChild(mpTxt);

			var hpNumTxt = new PIXI.Text('',styleHpGlow);

			hpNumTxt.x = playerBattleStatusPositions[i*2]-18;
			hpNumTxt.y = playerBattleStatusPositions[i*2 + 1]-1;


			battleScene.addChild(hpNumTxt);

			playerHPTxtStatus.push(hpNumTxt);

			var mpNumTxt = new PIXI.Text('',styleHpGlow);

			mpNumTxt.x = playerBattleStatusPositions[i*2]+75;
			mpNumTxt.y = playerBattleStatusPositions[i*2 + 1]-1;


			battleScene.addChild(mpNumTxt);

			playerMPTxtStatus.push(mpNumTxt);

			var lvlNumTxt = new PIXI.Text("",styleLvlNum);

			lvlNumTxt.x = playerBattleStatusPositions[i*2]-72;
			lvlNumTxt.y = playerBattleStatusPositions[i*2 + 1]-18;

			battleScene.addChild(lvlNumTxt);

			playerLvlTxtStatus.push(lvlNumTxt);

			var nameTxt = new PIXI.Text("",styleName);

			nameTxt.x = playerBattleStatusPositions[i*2]-45;
			nameTxt.y = playerBattleStatusPositions[i*2 + 1]-21;

			battleScene.addChild(nameTxt);
    		
    		playerNameTxtStatus.push(nameTxt);

		

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

    	turnNumber = 0
    	players.push(hiro);
    	players.push(yeezy);
    	players.push(saey);
    	players.push(jayz);
    	players.push(biggy);

    	

		enemies.push(rat);
		currentPlayer =  getFirstAlivePlayer();
		console.log(currentPlayer);
				

		state = battle;
		currentScene = battleScene;
		worldScene.visible = false;
		battleScene.visible = true;
		updatePlayerInfo();
	}


	if(this == battleButtons[0]){

		if(playerActionConfirmed == false){
			
			var lastPlayer = currentPlayer;

			
			for (var i = currentPlayer+1;i<players.length;i++){
				if(players[i].getHp() > 0){
					console.log("Pushed");
					actionQueue.push(new Action(players[currentPlayer],enemies[0],'basicAttack'));
					currentPlayer = i;
					break;
				}

			}
			if(currentPlayer == lastPlayer){
				console.log("Confirmed");
				actionQueue.push(new Action(players[currentPlayer],enemies[0],'basicAttack'));
				battleSequence();
				playerActionConfirmed = true;
			}	
		}
	}
	if(this == battleButtons[1]){
		console.log(actionQueue);
		updatePlayerInfo();
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

	