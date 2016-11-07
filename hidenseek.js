const fs = require('fs');
const random = require('./random');
const PokemonList = require('./pokemonList');
const fileName = 'pokemon.txt';

function hide(path, pokemonList, callback){

	const foldersCount = 10;

	let hiddenMax = Math.min(pokemonList.length, 3),
		hiddenCount = random.randomNumber(1, hiddenMax),
		hiddenPokemons = new PokemonList,
		hiddenPokemonsIndex = random.randomList(0, pokemonList.length - 1, hiddenCount),
		hiddenFoldersIndex = random.randomList(1, foldersCount, hiddenCount);

	function savePokemonInList(pokemonObj){
		hiddenPokemons.push(pokemonObj);
	  	if (hiddenPokemons.length == hiddenCount)
	  		callback(null, hiddenPokemons);
	}

	function createFile(folderIndex, folderName){
   		if(hiddenFoldersIndex.indexOf(folderIndex) != -1){
   			let pokemonObj = pokemonList[hiddenPokemonsIndex.shift()];

   			fs.writeFile(path + "/" + folderName + "/" + fileName, pokemonObj.info(), (error) => {
			  	if (error) callback(error, null);
			  	savePokemonInList(pokemonObj);
			});
   		}
	}

	function createFolders(error){
		if (error) callback(error, null);
	  	
  		for (let i = 1; i <= foldersCount; i++) {
  			let folderName = String(i);
  			if (folderName.length < 2)
  				folderName = '0'+ folderName;

		   	fs.mkdir(path + "/" + folderName, (error) => {
		   		if (error) callback(error, null);
		   		createFile(i, folderName);
		   	});
		}
	}

	function checkAccess(){
		fs.access(path, fs.constants.W_OK, createFolders);
	}

	checkAccess();
}

function seek(path, callback){

	let foundedPokemons = new PokemonList(),
		readedFolders = 0,
		foldersCount;

	function readFiles(error, data){
		readedFolders++;

	  	if (!error){
	  		let pokemonData = data.split("|");
		  	foundedPokemons.add(pokemonData[0], pokemonData[1]);

		  	if (readedFolders == foldersCount)
	  			callback(null, foundedPokemons);
	  	}
	}

	function searchFiles(error, folders){
		if (error) callback(error, null);
		foldersCount = folders.length;

	  	folders.forEach(function(folder) {
      		fs.readFile(path + folder + '/' + fileName, 'utf8', readFiles);
	  	});
	}

	function getFolders(){
		fs.readdir(path, searchFiles);
	}
	
	getFolders();
}

module.exports = {
	hide,
	seek
}


