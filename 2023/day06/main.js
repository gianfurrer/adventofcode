const input = document.querySelector("pre").textContent.trim();

getDistance = (velocity, time) => {
  return (time - velocity) * velocity;
};

const part1 = () => {
  const times = input
    .split("\n")[0]
    .match(/Time:\s+(.*)/)[1]
    .split(" ")
    .filter((n) => n.length)
    .map(Number);
  const distances = input
    .split("\n")[1]
    .match(/Distance:\s+(.*)/)[1]
    .split(" ")
    .filter((n) => n.length)
    .map(Number);

  let product = 1;
  for (let i = 0; i < times.length; i++) {
    let sum = 0;
    for (let t = 1; t < times[i]; ++t) {
      sum += getDistance(t, times[i]) > distances[i] ? 1 : 0;
    }
    product *= sum ?? 1;
  }
  return product;
};
console.log("Part 1:", part1());

const findAmountOfValidValues = (a, b, c) => {
  let discriminant = b * b - 4 * a * c;
  let root1 = Math.ceil((-b + Math.sqrt(discriminant)) / (2 * a));
  let root2 = Math.floor((-b - Math.sqrt(discriminant)) / (2 * a));
  return root2 - root1 + 1;
};

const part2 = () => {
  const time = +input
    .split("\n")[0]
    .match(/Time:\s+(.*)/)[1]
    .split(" ")
    .filter((n) => n.length)
    .reduce((prev, curr) => prev + curr, "");
  const distance = +input
    .split("\n")[1]
    .match(/Distance:\s+(.*)/)[1]
    .split(" ")
    .filter((n) => n.length)
    .reduce((prev, curr) => prev + curr, "");
  return findAmountOfValidValues(-1, time, -distance - 1); // the -1 in distance ensures that the value actually results in a greater value than 0
};
console.log("Part 2:", part2());
