var Character = require ('./Character.js');


class PlayerCharacter extends Character{
	constructor(name,
				 lvl,
				 hp,
				 mp,
				 str,
				 int,
				 vit,
				 agi,
				 dex,
				 luc,
				 ranged,
				 job,
				 pos,){

		super(name,
				 lvl,
				 hp,
				 mp,
				 str,
				 int,
				 vit,
				 agi,
				 dex,
				 luc,
				 ranged,
				 job,
				 pos)
	}


}


module.exports = PlayerCharacter;

