const fs = require('fs');
const random = require('./random');
const PokemonList = require('./pokemonList');
const fileName = 'pokemon.txt';

function hide(path, pokemonList, callback){
	const foldersCount = 10;
	let hiddenMax = Math.min(pokemonList.length, 3);
	let hiddenCount = random.randomNumber(1, hiddenMax);
	let hiddenPokemons = new PokemonList;

	fs.access(path, fs.constants.W_OK, (error) => {
		if (error) callback(error, null);
	  	
  		let hiddenPokemonsIndex = random.randomList(0, pokemonList.length - 1, hiddenCount);
  		let hiddenFoldersIndex = random.randomList(1, foldersCount, hiddenCount);

  		for (let i = 1; i <= foldersCount; i++) {
  			let folderName = String(i);
  			if (folderName.length < 2)
  				folderName = '0'+ folderName;

		   	fs.mkdir(path + "/" + folderName, (error) => {
		   		if (error) callback(error, null);

		   		if(hiddenFoldersIndex.indexOf(i) != -1){
		   			let pokemonObj = pokemonList[hiddenPokemonsIndex.shift()];

		   			fs.writeFile(path + "/" + folderName + "/" + fileName, pokemonObj.info(), (error) => {
					  	if (error) callback(error, null);

					  	hiddenPokemons.push(pokemonObj);

					  	if (hiddenPokemons.length == hiddenCount)
					  		callback(null, hiddenPokemons);
					});
		   		}
		   	});
		}
	});
}

function seek(path, callback){
	let foundedPokemons = new PokemonList(),
		readedFolders = 0;
	
	fs.readdir(path, function (error, folders) {
	  	if (error) callback(error, null);

	  	folders.forEach(function(folder) {
      		fs.readFile(path + folder + '/' + fileName, 'utf8', (error, data) => {
      			readedFolders++; 
			  	if (!error){
			  		let pokemonData = data.split("|");

				  	foundedPokemons.add(pokemonData[0], pokemonData[1]);

				  	if (readedFolders == folders.length)
			  			callback(null, foundedPokemons);
			  	}
			});
	  	});
	});
}

module.exports = {
	hide,
	seek
}


