class Action{

	constructor(user,target,type){
		this.user = user;
		this.target = target;
		this.type = type;
	};
	moveSpeed(){
		if(this.type == 'basicAttack'){
			return this.user.getSpd();
		}
		else{
			return 100;
		}
	}
	perform(){
		if(this.type == 'basicAttack'){
			this.target.setHp(this.target.getHp()-this.user.getAtk());
		}
	}
}

module.exports = Action;
