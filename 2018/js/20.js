previous = [];
x = y = 0;
puffer = []
map = [];
directions = {
  N: [0,-1],
  S: [0,1],
  E: [1,0],
  W: [-1,0]
}
input = document.querySelector("pre").textContent.trim();
for (let i = 1; i < input.length-1; ++i) {
  const char = input[i];
  if (char == "(") {
    puffer.push([x, y]);
  }
  else if (char == ")") {
    puffer.pop();
  }
  else if (char == "|") {
    x = puffer[puffer.length-1][0]
    y = puffer[puffer.length-1][1]
  }
  else {
    dir = directions[char];
    x+=dir[0]
    y+=dir[1]
    existing = map.find(m => m[0] == x && m[1] == y);
    if (existing) {
      existing[2] = Math.min(existing[2], previous[2]+1)
    }
    else {
      existing = [x,y, previous.length ? previous[2]+1 : 1];
      map.push(existing)
    }
  }
  previous = [x,y, map.find(m => m[0] == x && m[1] == y)[2]];
}
console.log("Part 1: " + Math.max(...map.map(m => m[2])))
console.log("Part 2: " + map.map(m => m[2]).filter(m => m >= 1000).length)
