class Pokemon{
	constructor(name, level){
		this.name = name;
		this.level = Number(level);
	}

	show(){
		console.log(`${this.info()}`);
	}

	info(){
		return `${this.name}|${this.level}`;
	}

	valueOf(){
		return this.level;
	}
}

module.exports = Pokemon;