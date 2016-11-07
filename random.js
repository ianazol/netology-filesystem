let randomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	max = Math.floor(Math.random() * (max - min + 1));
	return max + min;
};

let randomList = (min, max, count) => {
	let list = new Set();
	while(list.size < count){
		list.add(randomNumber(min, max));
	}
	return [...list];
}

module.exports = {
	randomNumber,
	randomList
}