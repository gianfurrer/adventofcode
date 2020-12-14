// Combined 

const input = $("pre").textContent.trim().split("\n");

// A

const a = (input) => {
  const timestamp = +input[0];
  const busses = input[1].split(",").filter(b => b !== "x").map(b => +b);
  const data = [];
  for (const busID of busses) {
    data.push({
      id: busID,
      time: Math.ceil(timestamp / busID) * busID
    })
  }

  const earliest = data.sort((a,b) => a.time - b.time)[0]
  return earliest.id * (earliest.time - timestamp);
}

console.log("A:", a([...input]));

// B

const b = (input) => {
  const busses = input[1].split(",")
    .map((b,i) => [{id: b, offset: i}][0])
    .filter(b => b.id !== "x")
    .map(b => {
      b.id = +b.id
      return b;
  }).sort((a,b) => a.offset - b.offset);


  let time = 0;
  let increment = busses.shift().id;
  for (const bus of busses) {
    do {
      time += increment;
    } while ((time + bus.offset) % bus.id)
    increment *= bus.id;
  }
  return time;
}

console.log("B:", b([...input]));