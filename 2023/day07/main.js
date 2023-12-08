const input = document.querySelector("pre").textContent.trim().split("\n");

const part1 = () => {
  const c = [`A`, `K`, `Q`, `J`, `T`, `9`, `8`, `7`, `6`, `5`, `4`, `3`, `2`];
  const ranking = [];

  for (let i = 0; i < input.length; ++i) {
    const [hand, bid] = input[i].split(" ");
    const handMap = hand.split("").reduce((prev, curr) => {
      prev[curr] = prev[curr] ? prev[curr] + 1 : 1;
      return prev;
    }, {});
    const highestPairs = Object.values(handMap).sort((a, b) => b - a);

    let rank =
      highestPairs[0] > 3
        ? highestPairs[0] + 2
        : highestPairs[0] == 3
        ? 3 + highestPairs[1]
        : highestPairs[0] == 2 && highestPairs[1] == 2
        ? 3
        : highestPairs[0];
    ranking.push({ rank: rank, hand: hand, bid: +bid });
  }

  return ranking
    .sort((a, b) => {
      if (a.rank != b.rank) return b.rank > a.rank ? -1 : 1;
      let i = 0;
      while (a.hand[i] == b.hand[i] && i <= a.hand.length) {
        i++;
      }
      return c.indexOf(a.hand[i]) > c.indexOf(b.hand[i]) ? -1 : 1;
    })
    .map((h) => h.bid)
    .reduce((prev, curr, i) => prev + curr * (i + 1), 0);
};
console.log("Part1: ", part1());

const part2 = () => {
  const c = [`A`, `K`, `Q`, `T`, `9`, `8`, `7`, `6`, `5`, `4`, `3`, `2`, `J`];
  const ranking = [];

  for (let i = 0; i < input.length; ++i) {
    const [hand, bid] = input[i].split(" ");
    const handMap = hand.split("").reduce((prev, curr) => {
      prev[curr] = prev[curr] ? prev[curr] + 1 : 1;
      return prev;
    }, {});
    const jokers = handMap["J"] || 0;
    delete handMap["J"];
    const highestPairs = Object.values(handMap).sort((a, b) => b - a);
    highestPairs[0] = highestPairs[0] ? highestPairs[0] + jokers : jokers;

    let rank =
      highestPairs[0] > 3
        ? highestPairs[0] + 2
        : highestPairs[0] == 3
        ? 3 + highestPairs[1]
        : highestPairs[0] == 2 && highestPairs[1] == 2
        ? 3
        : highestPairs[0];
    ranking.push({ rank: rank, hand: hand, bid: +bid });
  }

  return ranking
    .sort((a, b) => {
      if (a.rank != b.rank) return b.rank > a.rank ? -1 : 1;
      let i = 0;
      while (a.hand[i] == b.hand[i] && i <= a.hand.length) {
        i++;
      }
      return c.indexOf(a.hand[i]) > c.indexOf(b.hand[i]) ? -1 : 1;
    })
    .map((h) => h.bid)
    .reduce((prev, curr, i) => prev + curr * (i + 1), 0);
};
console.log("Part2: ", part2());
