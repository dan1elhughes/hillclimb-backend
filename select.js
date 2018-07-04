module.exports = ({ amount, from, ranked }) => {
	const selected = [];

	let leftovers = ranked
		? from.slice().sort((a, b) => b.fitness - a.fitness)
		: from.slice().sort(() => 0.5 - Math.random());

	while (amount--) selected.push(leftovers.shift());

	return [selected, leftovers];
};
