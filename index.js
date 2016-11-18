const Pokemon = require("./pokemon"),
	  PokemonList = require("./pokemonList"),
	  Hidenseek = require("./hidenseek");

let method = process.argv[2],
	path = process.argv[3];

if (method == "seek"){
    Hidenseek.seek(path)
        .then(foundedPokemons => foundedPokemons.show())
        .catch(error => console.log(error));
}
else if(method == "hide"){
	let pokemons = require(process.argv[4]);
	let pokemonsObj = pokemons.map(data => new Pokemon(data.name, data.level));
	let pokemonList = new PokemonList(...pokemonsObj);

	Hidenseek.hide(path, pokemonList)
		.then(hiddenPokemons => hiddenPokemons.show())
		.catch(error => console.log(error));
}
else{
	console.log(`seek <path> - to seek pokemons within path directory
hide <path> <pokemonDataPath> - to hide pokemons from pokemonDataPath in path directory`);
}