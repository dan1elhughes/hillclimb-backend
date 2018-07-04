module.exports = ({ rate, from }) =>
	from.map(solution => (Math.random() >= rate ? solution : solution.mutated()));
