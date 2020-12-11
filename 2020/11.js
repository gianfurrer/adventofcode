// Combined

const input = $("pre").textContent.trim();

const calcSeats = (seats, calcAdjacent, maxSeats) => {
  seats = seats.split("\n");
  let changes = false;
  do {
    const newSeats = [];
    changes = false;
    for (let r = 0; r < seats.length; ++r) {
      let newRow = "";
      for (let c = 0; c < seats[r].length; ++c) {
        const adjacent = calcAdjacent(r,c,seats);
        switch (seats[r][c]) {
          case "L":
            newRow += !adjacent ? "#" : "L";
            break;
          case "#":
            newRow += adjacent < maxSeats ? "#" : "L";
            break;
          case ".":
            newRow += ".";
            break;
        }
      }
      if (newRow !== seats[r]) {
        changes = true;
      }
      newSeats.push(newRow);
    }
    seats = newSeats;
  } while (changes)
  return seats.join("").split("#").length - 1;
}

// A

const a = (seats) => {
  const getAdjacent = (x,y,seats) => {
    let count = 0;
    for (dx = -1; dx <= 1; ++dx) {
      for (dy = -1; dy <= 1; ++dy) {
        const r = x + dx;
        const c = y + dy;
        if ((dx !== 0 || dy !== 0) && seats[r] && seats[r][c] == "#") {
          ++count;
        }
      }
    }
    return count;
  }

  return calcSeats(seats, getAdjacent, 4);
}

console.log("A:", a(input));

// B

const b = (seats) => {
  const getAdjacent = (x,y,seats) => {
    let count = 0
    const checkLine = (x,y,seats,getSeat,step=1) => {
      for (let i = step; getSeat(x,y,seats,i); i += step) {
        let s = getSeat(x,y,seats,i);
        if (s !== ".") {
          return s == "#" ? 1 : 0;
        }
      }
      return 0;
    }
  
    count += checkLine(x,y,seats, (x,y,s,i) => s[x+i] ? s[x+i][y] : false, -1); // u
    count += checkLine(x,y,seats, (x,y,s,i) => s[x+i] ? s[x+i][y+i] : false); // ur
    count += checkLine(x,y,seats, (x,y,s,i) => s[x] ? s[x][y+i] : false); // r
    count += checkLine(x,y,seats, (x,y,s,i) => s[x+i] ? s[x+i][y-i] : false); // dr
    count += checkLine(x,y,seats, (x,y,s,i) => s[x+i] ? s[x+i][y] : false); // d
    count += checkLine(x,y,seats, (x,y,s,i) => s[x+i] ? s[x+i][y+i] : false, -1); // dl
    count += checkLine(x,y,seats, (x,y,s,i) => s[x] ? s[x][y+i] : false, -1); // l
    count += checkLine(x,y,seats, (x,y,s,i) => s[x+i] ? s[x+i][y-i] : false, -1); // ul
    return count;
  }

  return calcSeats(seats, getAdjacent, 5);
}

console.log("B:", b(input));
