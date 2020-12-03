// Combined 

const input = $("pre").textContent.trim().split("\n")

// A

const a = (rows, right, down) => {
  const yMax = rows.length-1;
  const xMax = rows[0].length;

  const pos = {x: 0, y: 0};
  let trees = 0;
  while (pos.y < yMax) {
    pos.x += right;
    pos.y += down;
    if (rows[pos.y][pos.x % xMax] == "#") {
      ++trees;
    }
  }
  return trees;
}
console.log("A:", a([...input], 3, 1));
  
  
// B

const b = (rows) => {
  let trees = a([...rows], 1, 1);
  trees *= a([...rows], 3, 1);
  trees *= a([...rows], 5, 1);
  trees *= a([...rows], 7, 1);
  trees *= a([...rows], 1, 2);
  return trees;
}
console.log("B:", b([...input]));