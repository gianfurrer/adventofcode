// Combined

const input = $("pre").textContent.trim().split("\n");

const getSeatIds = (passes) => {
  const seats = [];

  for (let pass of passes) {  
    pass = pass.split("");
    let minR = 0;
    let maxR = 127;
    let minC = 0;
    let maxC = 7;
   
    while (pass.length) {
      const char = pass.shift();
      switch (char) {
        case "F":
          maxR = Math.floor((maxR+minR)/2);   
          break;
        case "B":
          minR = Math.ceil((maxR+minR)/2);   
          break;
        case "L":
          maxC = Math.floor((maxC+minC)/2);   
          break;
        case "R":
          minC = Math.ceil((maxC+minC)/2);   
          break;
      }
    }

    if (minR !== maxR || minC !== maxC) {
      console.error("Something went wrong:", minR, maxR, minC, maxC);
    }
    
    const seatID = minR * 8 + minC;
    seats.push(seatID);
  }
  return seats;
}

// A

const a = (passes) => {
  return getSeatIds(passes).sort((a, b) => b - a)[0];
}

console.log("A: ", a([...input]));



// B

const b = (passes) => {
  let seatIds = getSeatIds(passes);
  seatIds = seatIds.filter(id => !seatIds.includes(id+1) || !seatIds.includes(id-1))
  seatIds = seatIds.filter(id => seatIds.includes(id+2) || seatIds.includes(id-2))
  return seatIds.reduce((a,b) => a + b, 0) / seatIds.length
}

console.log("B: ", b([...input]));

