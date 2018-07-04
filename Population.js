const Entity = require("./Entity");
const assert = require("assert");

const select = require("./select");
const crossover = require("./crossover");
const mutate = require("./mutate");

module.exports = class Population {
	constructor({ populationSize, mutationRate, crossoverRate }) {
		assert(populationSize % 2 === 0);

		Object.assign(this, {
			populationSize,
			mutationRate,
			crossoverRate,
		});

		this._solutions = Array(this.populationSize)
			.fill()
			.map(() => new Entity());
	}

	set population(solutions) {
		this._solutions = solutions;
	}

	get population() {
		return this._solutions.slice();
	}

	step() {
		const [parents] = select({
			amount: this.populationSize - 4,
			from: this.population,
		});

		const children = crossover({
			rate: this.crossoverRate,
			from: parents,
		});

		const mutantChildren = mutate({ rate: this.mutationRate, from: children });

		const [randomlySelected] = select({
			amount: 4,
			from: this.population,
			ranked: false,
		});

		const nextPopulation = [...mutantChildren, ...randomlySelected];

		this.population = nextPopulation;
	}

	serialize() {
		return this.population.map(({ x, y, fitness }) => ({
			x,
			y,
			fitness,
		}));
	}
};
