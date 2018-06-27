const io = require("socket.io")(3000);

function random(min, max, precision = 2) {
	const rand = Math.random() * (max - min) + min;
	const power = Math.pow(10, precision);
	return Math.floor(rand * power) / power;
}

const populationSize = 10;

const nextGeneration = prev =>
	prev.map(({ x, y, fitness }) => ({
		x: x > 500 ? x - random(5, 10) : x + random(5, 10),
		y: y > 500 ? y - random(5, 10) : y + random(5, 10),
		fitness: fitness >= 100 ? 100 : fitness + random(2, 6),
	}));

io.on("connection", socket => {
	const genesis = Array(populationSize)
		.fill()
		.map(() => ({
			x: random(0, 1000),
			y: random(0, 1000),
			fitness: random(0, 100),
		}));

	let population = genesis.slice();

	socket.emit("generation", { data: population });

	setInterval(() => {
		population = nextGeneration(population);
		socket.emit("generation", { data: population });
	}, 500);
});
