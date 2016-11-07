const Pokemon = require("./pokemon");

class PokemonList extends Array{
	add(name, level){
		let pokemon = new Pokemon(name, level);
		this.push(pokemon);
	}

	show(){
		for (let pokemon of this){
			pokemon.show();
		}
		console.log(`Pokemons count - ${this.length}`);
	}

	max(){
		let maxLevel = Math.max(...this);
		return this.find(element => element.level == maxLevel);
	}
}

module.exports = PokemonList;