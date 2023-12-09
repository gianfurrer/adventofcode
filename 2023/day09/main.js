const input = document
  .querySelector("pre")
  .textContent.trim()
  .split("\n")
  .map((l) => l.trim().split(" ").map(Number));

const getNextValue = (values) => {
  if (values.every((v) => v == 0)) {
    return 0;
  }
  const differences = [];
  for (let i = 0; i < values.length - 1; ++i) {
    differences.push(values[i + 1] - values[i]);
  }
  return getNextValue(differences) + values[values.length - 1];
};

const part1 = () => {
  let sum = 0;
  for (let line of input) {
    sum += getNextValue(line);
  }
  return sum;
};
console.log("Part 1:", part1());

const part2 = () => {
  let sum = 0;
  for (let line of input) {
    sum += getNextValue(line.reverse());
  }
  return sum;
};
console.log("Part 2:", part2());
