const input = document.querySelector("pre").textContent.trim();

let [instructions, map] = input.trim().split("\n\n");
map = map
  .trim()
  .split("\n")
  .map((m) => m.match(/(\w{3}) = \((\w{3}), (\w{3})\)/).slice(1))
  .map((m) => [{ [m[0]]: { L: m[1], R: m[2] } }][0])
  .reduce((curr, prev) => [{ ...curr, ...prev }][0], {});

const part1 = () => {
  let steps = 0;
  let currentLocation = "AAA";
  while (currentLocation != "ZZZ") {
    currentLocation =
      map[currentLocation][instructions[steps++ % instructions.length]];
  }
  return steps;
};

function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

const part2 = () => {
  let nodes = Object.keys(map).filter((m) => m[2] === "A");
  console.log(nodes);
  let steps = 1;
  for (let i in nodes) {
    let stepsNode = 0;
    while (nodes[i][2] != "Z") {
      nodes[i] = map[nodes[i]][instructions[stepsNode++ % instructions.length]];
    }
    steps = lcm(steps, stepsNode);
  }

  return steps;
};
console.log("Part 2:", part2());
