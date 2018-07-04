module.exports = (x, y) => {
	var sum1 = 0.5 * Math.pow(x, 2) + Math.pow(y, 2);
	sum1 = -0.2 * Math.sqrt(sum1);
	sum1 = -20 * Math.pow(Math.E, sum1);
	var sum2 = 0.5 * (Math.cos(y * 2 * Math.PI) + Math.cos(x * 2 * Math.PI));
	sum2 = Math.pow(Math.E, sum2);
	return sum1 - sum2;
};
