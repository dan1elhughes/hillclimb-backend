const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const target = { x: 500, y: 500 };

module.exports = class Entity {
	static toBinary(num, length = 12) {
		return (num >>> 0).toString(2).padStart(length, "0");
	}

	static toInt(binary) {
		return parseInt(binary, 2);
	}

	// Converts input N into an array where each num < N is in the array num+1 times
	// Input : 3
	// Output: [0, 1, 1, 2, 2, 2]
	static weightedIndexArray(n) {
		return Array(n)
			.fill()
			.map((_, i) => Array(i + 1).fill(i))
			.reduce((arr, value) => arr.concat(value), []);
	}

	constructor({ genotype } = {}) {
		if (genotype) {
			Object.assign(this, { genotype });
		} else {
			const x = Entity.toBinary(random(0, 4095));
			const y = Entity.toBinary(random(0, 4095));
			this.genotype = `${x}|${y}`;
		}
	}

	get phenotype() {
		return this.genotype.split("|");
	}

	get x() {
		return Entity.toInt(this.phenotype[0]);
	}

	get y() {
		return Entity.toInt(this.phenotype[1]);
	}

	get fitness() {
		const sum = this.x + this.y;
		const root = Math.sqrt(sum);
		const remainder = root % 1;
		return 1 - remainder;
	}

	mutated() {
		const [x, y] = this.phenotype;
		const bits = this.genotype
			.replace("|", "")
			.split("")
			.map(x => parseInt(x, 2));

		const weightedXArray = Entity.weightedIndexArray(x.length);
		const weightedYArray = Entity.weightedIndexArray(y.length).map(
			i => i + y.length
		);

		const availableIndexes = [...weightedXArray, ...weightedYArray];

		// Select a random index from the available bits.
		const index =
			availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

		// Flip one by XORing it with 1.
		bits[index] ^= 1;

		bits.splice(bits.length / 2, 0, "|");

		const nextGenotype = bits.join("");

		return new Entity({ genotype: nextGenotype });
	}
};
