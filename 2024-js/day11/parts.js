class DefaultDict {
  constructor(defaultVal) {
    return new Proxy({}, {
      get: (target, name) => name in target ? target[name] : defaultVal
    })
  }
}

const input = document.querySelector("pre").textContent.trim()

const rules = [
    {"matcher": (number) => number == 0, "action": (number) => [1]},
    {"matcher": (number) => number.toString().length % 2 === 0, "action": (number) => {
        numStr = number.toString();
        half = numStr.length / 2
        return [+numStr.substr(0, half), +numStr.substr(half)]
    }},
    {"matcher": () => true, "action": (number) => [number * 2024]}
]

let stones = input.split(" ").map(n => +n).reduce((map, curr) => (map[curr] += 1) && map, new DefaultDict(0))
const blinks = 75;
for (let b = 0; b < blinks; ++b) {
    let newStones = new DefaultDict(0)
    Object.entries(stones).forEach(([key, value]) => rules.find(r => r.matcher(key)).action(key).forEach(r => newStones[r] += value))
    stones = newStones
    b === 24 && console.log("Part1:", Object.values(stones).reduce((a, b) => a+b))
}
console.log(`Part2:`, Object.values(stones).reduce((a, b) => a+b))
