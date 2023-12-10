const input = document.querySelector("pre").textContent.trim();

const pipeMap = {
  "|": ["north", "south"],
  L: ["north", "east"],
  J: ["north", "west"],
  7: ["south", "west"],
  F: ["south", "east"],
  "-": ["east", "west"],
  ".": ["", ""],
};
pipeMap["S"] = pipeMap["F"]; // Hardcoded S == F

const map = input
  .split("\n")
  .map((l, y) =>
    l.split("").map((pipe, x) => {
      return [
        {
          pipe,
          x,
          y,
          dir: pipeMap[pipe],
        },
      ][0];
    })
  )
  .flat();

const move = (from, pos) => {
  const to = pos.dir[0] == from ? pos.dir[1] : pos.dir[0];
  let [x, y, newFrom] = [pos.x, pos.y, ""];
  if (to == "east") (newFrom = "west") && x++;
  if (to == "west") (newFrom = "east") && x--;
  if (to == "north") (newFrom = "south") && y--;
  if (to == "south") (newFrom = "north") && y++;
  return [map.find((m) => m.x === x && m.y == y), newFrom];
};

const startingPos = map.find((m) => m.pipe === "S");
let route = [];
let pos = startingPos;
let from = startingPos.from;
do {
  [pos, from] = move(from, pos);
  route.push(pos);
} while (pos != startingPos);
console.log("Part 1:", route.length / 2);

const nourthPipes = route.filter((r) => ["|", "L", "J"].includes(r.pipe));
let count = map.filter(
  (m) =>
    !route.includes(m) &&
    nourthPipes.filter((r) => r.y == m.y && r.x < m.x).length % 2
).length;
console.log("Part 2:", count);
