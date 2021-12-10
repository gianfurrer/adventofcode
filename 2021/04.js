const input = document.querySelector("pre").innerHTML.trim().split("\n\n");
const drawNrs = input.shift().split(",").map(n => +n);


// === A ===
const bingoA = () => {
  const boards = input.map(b => b.split("\n").map(r => r.match(/.{1,3}/g).map(n => +n.trim())));
  for (const draw of drawNrs) {
    for (let b = 0; b < boards.length; ++b) {
      for (let r = 0; r < boards[b].length; ++r) {
        boards[b][r] = boards[b][r].filter(n => n != draw);
        if (!boards[b][r].length) {
          return draw * boards[b].flat().reduce((a, b) => a + b, 0);
        }
      }
    }
  }
}
console.log("A:", bingoA());

// === B ===
const bingoB = () => {
  let boards = input.map(b => b.split("\n").map(r => r.match(/.{1,3}/g).map(n => +n.trim())));
  boards.map(b => b.push(...b.map((_, colIndex) => b.map(row => row[colIndex]))));

  for (const draw of drawNrs) {
    for (let b = 0; b < boards.length; ++b) {
      let finished = false;
      for (let r = 0; r < boards[b].length; ++r) {
        boards[b][r] = boards[b][r].filter(n => n != draw);
        if (!boards[b][r].length) {
          if (boards.filter(br => br.length).length === 1) {
            finished = true;
          }
          else {
            boards[b] = [];
          }
        }
      }
      if (finished) {
        return draw * (boards[b].flat().reduce((a, b) => a + b, 0) / 2);
      }
    }
  }
}
console.log("B:", bingoB());
