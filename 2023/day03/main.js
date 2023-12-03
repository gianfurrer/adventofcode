const input = document.querySelector("pre").textContent.trim().split("\n");

const numbers = [];
const symbols = [];
for (let y = 0; y < input.length; ++y) {
  let curNr = "";
  for (let x = 0; x < input[y].length; ++x) {
    const char = input[y][x];
    if (!isNaN(char)) {
      curNr += char;
      if (x == input[y].length - 1) {
        numbers.push({
          y: y,
          x: x - curNr.length,
          length: curNr.length,
          value: +curNr,
        });
        curNr = "";
      }
    } else {
      if (curNr.length) {
        numbers.push({
          y: y,
          x: x - curNr.length,
          length: curNr.length,
          value: +curNr,
        });
        curNr = "";
      }
      if (char !== ".") {
        symbols.push({ y: y, x: x, symbol: char });
      }
    }
  }
}

const checkAdjacientSymbol = (number) => {
  for (let y = number.y - 1; y <= number.y + 1; ++y) {
    for (let x = number.x - 1; x <= number.x + number.length; ++x) {
      if (symbols.find((s) => s.x == x && s.y == y)) {
        return true;
      }
    }
  }
  return false;
};

const part1 = () => {
  let sum = 0;
  for (let number of numbers) {
    if (checkAdjacientSymbol(number)) {
      sum += number.value;
    }
  }
  console.log("Part 1:", sum);
};
part1();

const multiplyAdjacientNumbers = (symbol) => {
  let multiplyNrs = [];
  for (let y = symbol.y - 1; y <= symbol.y + 1; ++y) {
    for (let x = symbol.x - 1; x <= symbol.x + 1; ++x) {
      const number = numbers.find(
        (n) => n.x <= x && x < n.x + n.length && n.y == y
      );
      if (number && !multiplyNrs.includes(number.value)) {
        multiplyNrs.push(number.value);
      }
    }
  }
  if (multiplyNrs.length < 2) {
    return 0;
  }
  return multiplyNrs.reduce((a, b) => a * b);
};

const part2 = () => {
  let sum = 0;
  for (let symbol of symbols.filter((s) => s.symbol == "*")) {
    sum += multiplyAdjacientNumbers(symbol);
  }
  console.log("Part 2:", sum);
};
part2();
