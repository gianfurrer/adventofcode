const input = document.querySelector("pre").textContent.trim().split("\n");
// A
const fuelA = input.map(n => Math.floor(+n / 3) - 2).reduce((a, b) => a + b);

// B
const fuelB = input.map(n => {
  let fuel = 0;
  while (+n > 8) {
    n = Math.floor(+n / 3) - 2;
    fuel += n;
  }
  return fuel;
}).reduce((a, b) => a + b);

// Result
console.log("A:", fuelA);
console.log("B:", fuelB);