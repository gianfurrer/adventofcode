const input = document.querySelector("pre").textContent.trim().split("\n\n");

const parseMap = (m) =>
  m
    .split("\n")
    .slice(1)
    .map((s) => s.split(" ").map((n) => +n));

const seeds = input[0]
  .match("seeds: (.*)")[1]
  .trim()
  .split(" ")
  .map((s) => +s);

const maps = Array(7)
  .fill(0)
  .map((_, i) => parseMap(input[i + 1]));

const part1 = () => {
  const getDest = (source, map) => {
    const mapping = map.find(
      (arr) => source >= arr[1] && source <= arr[1] + arr[2] - 1
    );
    return mapping ? source - mapping[1] + mapping[0] : source;
  };

  let min = Infinity;
  for (let seed of seeds) {
    let value = seed;
    for (let map of maps) {
      value = getDest(value, map);
    }
    min = value < min ? value : min;
  }
  return min;
};
console.log("Part 1:", part1());

const part2 = () => {
  let min = Infinity;

  const getMax = (source, map) => {
    const mapping = map.find(
      (arr) => source >= arr[1] && source <= arr[1] + arr[2] - 1
    );
    if (!mapping) {
      const nextMapping = map.filter((arr) => arr[1] > source);
      return [
        nextMapping.length
          ? nextMapping.map((arr) => arr[1]).sort((a, b) => a - b)[0]
          : Infinity,
        0,
      ];
    }
    return [mapping[1] + mapping[2] - 1, mapping[0] - mapping[1]];
  };

  let dests = [];
  let next = seeds.reduce(
    (prev, curr, i, arr) =>
      i % 2 ? prev : prev.push([arr[i], arr[i + 1]]) && prev,
    []
  );
  for (let map of maps) {
    while (next.length) {
      const [source, range] = next.shift();
      const [max, offset] = getMax(source, map);
      if (max == undefined) console.error("WTF", source, map);
      if (max < source + range - 1) {
        next.push([max + 1, range - (max - source + 1)]);
        dests.push([source + offset, max - source + 1]);
      } else {
        dests.push([source + offset, range]);
      }
    }
    next = dests;
    min = dests.map((d) => d[0]).sort((a, b) => a - b)[0];
    dests = [];
  }

  return min;
};
console.log("Part 2:", part2());
