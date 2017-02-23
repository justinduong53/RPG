class Action{

	constructor(user,target,type){
		this.user = user;
		this.target = target;
		this.type = type;
	};

	perform(){
		if(this.type == 'basicAttack'){
			this.target.setHp(this.target.getHp()-this.user.getAtk());
		}
	}
}

module.exports = Action;
