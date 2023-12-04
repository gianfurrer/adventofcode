const input = document.querySelector("pre").textContent.trim().split("\n");

const calculateWins = (line) => {
  let [winningNrs, myNrs] = line
    .match(/Card\s+\d+: ([^\|]+) \| ([^\|]+)/)
    .slice(1, 3)
    .map((a) =>
      a
        .trim()
        .split(" ")
        .filter((n) => n.length)
        .map((n) => +n)
    );
  return winningNrs.filter((w) => myNrs.includes(w)).length;
};

const part1 = () => {
  return input
    .map((c) => calculateWins(c))
    .map((w) => (w ? Math.pow(2, w - 1) : 0))
    .reduce((a, b) => a + b);
};
console.log("Part 1:", part1());

const part2 = () => {
  const cardCopies = Array(input.length).fill(1);
  for (let i = 0; i < input.length; ++i) {
    const wins = calculateWins(input[i]);
    for (let z = i + 1; z <= i + wins; ++z) {
      cardCopies[z] += cardCopies[i];
    }
  }
  return cardCopies.reduce((a, b) => a + b);
};
console.log("Part 2:", part2());
