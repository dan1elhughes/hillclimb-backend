const Population = require("./Population");
const Entity = require("./Entity");

const io = require("socket.io")(3000);

const populationSize = 6;
const mutationRate = 0.3;
const crossoverRate = 0.3;

const x = new Entity();
const m = x.mutated();

console.log(x.genotype);
console.log(m.genotype);

console.log(x.fitness);
console.log(m.fitness);

io.on("connection", socket => {
	const population = new Population({
		populationSize,
		mutationRate,
		crossoverRate,
	});

	console.log(population.serialize());
	socket.emit("generation", { data: population.serialize() });

	const tick = setInterval(() => {
		population.step();
		console.log(population.serialize());
		socket.emit("generation", { data: JSON.stringify(population.serialize()) });
	}, 2000);

	socket.on("disconnect", () => {
		console.log("Disconnected");
		clearInterval(tick);
	});
});
