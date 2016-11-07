const Pokemon = require("./pokemon"),
	  PokemonList = require("./pokemonList"),
	  Hidenseek = require("./hidenseek");

let method = process.argv[2],
	path = process.argv[3];

if (method == "seek"){
	Hidenseek.seek(path, (error, foundedPokemons) => {
		if (error) throw error;
		foundedPokemons.show();
	});
}
else if(method == "hide"){
	let pokemons = require(process.argv[4]);
	let pokemonsObj = pokemons.map(data => new Pokemon(data.name, data.level));
	let pokemonList = new PokemonList(...pokemonsObj);

	Hidenseek.hide(path, pokemonList, (error, hiddenPokemons) => {
		if (error) throw error;
		hiddenPokemons.show();
	});
}
else{
	console.log(`seek <path> - to seek pokemons within path directory
hide <path> <pokemonDataPath> - to hide pokemons from pokemonDataPath in path directory`);
}