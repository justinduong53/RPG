/*
var
//info basic
name,
lvl,
hp,
mp,
//In battle stats
atk,
def,
mgc,
acc,
spd,
eva,
crit,
mdef,

//stats
str, //atk, *ranged atk
int, //mgc,mp
vit, //hp, def
agi, //spd, eva
dex, //acc, *ranged atk,
luc, //crit, *chance

//type

ranged, //ranged weapon or not. 
job,   
pos; //position of character 1 - 6
//status effects
/*
poison,
sleep,
blind,
stunned,
confusion,
*/

//buffs

//bind effects
/*
headBind,
armBind,
legBind,
*/

//equipment
/*
head,
face,
body,
weapon,
offhand,
feet,
accessory,
*/

class Character{
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
				 pos){

	this.name = name;
	this.lvl = lvl;
	this.hp = hp;
	this.mp = mp;
	this.str = str;
	this.int = int;
	this.vit = vit;
	this.agi = agi;
	this.dex = dex;
	this.luc = luc;
	this.ranged = ranged;
	this.job = job;
	this.pos = pos;
	//Non-Constructor variables
	this.exp = 0;
	this.atk = 1+str;
	this.def = 1+vit;
	this.mgc = 1+int
	this.acc = 1+dex;
	this.spd = 1+agi;
	this.eva = 1+agi;
	this.crit = 1+luc;
	this.mdef = 1+int;
	}

	getName(){
		return this.name;
	}
	setName(n){
		this.name = n;
	}
	getLvl(){
		return this.lvl;
	}
	setLvl(n){
		this.lvl = n;
	}
	getHp(){
		return this.hp;
	}
	setHp(n){
		this.hp = n;
	}
	getMp(){
		return this.mp;
	}
	setMp(n){
		this.mp = n;
	}
	//Battle Stats
	getAtk(){
		return this.atk;
	}
	setAtk(n){
		this.atk = n;
	}
	getDef(){
		return this.def;
	}
	setDef(n){
		this.def = n;
	}
	getMgc(){
		return this.mgc;
	}
	setMgc(n){
		this.mgc = n;
	}
	getAcc(){
		return this.acc;
	}
	setAcc(n){
		this.acc = n;
	}
	getSpd(){
		return this.spd;
	}
	setSpd(n){
		this.spd = n;
	}
	getEva(){
		return this.eva;
	}
	setEva(n){
		this.eva = n;
	}
	getSpd(){
		return this.spd;
	}
	setSpd(n){
		this.spd = n;
	}
	getEva(){
		return this.eva;
	}
	setEva(n){
		this.eva = n;
	}

	getCrit(){
		return this.crit;
	}
	setCrit(n){
		this.crit = n;
	}
	getMdef(){
		return this.mdef;
	}
	setMdef(n){
		this.mdef = n;
	}
	//Base Stats
	getStr(){
		return this.str;
	}
	setStr(n){
		this.str = n;
	}
	getInt(){
		return this.int;
	}
	setInt(n){
		this.int = n;
	}
	getVit(){
		return this.vit;
	}
	setVit(n){
		this.vit = n;
	}
	getAgi(){
		return this.agi;
	}
	setAgi(n){
		this.agi = n;
	}
	getDex(){
		return this.int;
	}
	setDex(n){
		this.dex = n;
	}
	getLuc(){
		return this.luc;
	}
	setLuc(n){
		this.luc = n;
	}
	//Type Variables
	getRanged(){
		return this.ranged;
	}
	setRanged(n){
		this.ranged = n;
	}
	getJob(){
		return this.job;
	}
	setJob(n){
		this.job = n;
	}
	getPos(){
		return this.pos;
	}
	setPos(n){
		this.pos = n;
	}
	getExp(){
		return this.exp;
	}
	setExp(n){
		this.exp = n;
	}

}

module.exports = Character;
