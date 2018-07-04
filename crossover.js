const Entity = require("./Entity");

// https://stackoverflow.com/a/11764168
function chunk(arr, len) {
	var chunks = [],
		i = 0,
		n = arr.length;

	while (i < n) {
		chunks.push(arr.slice(i, (i += len)));
	}

	return chunks;
}

module.exports = ({ from }) => {
	const pairs = chunk(from, 2);

	return pairs
		.map(([a, b]) => [
			new Entity({ x: a.x, y: b.y }),
			new Entity({ x: b.x, y: a.y }),
		])
		.reduce((acc, val) => acc.concat(val), []);
};
