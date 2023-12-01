const input = document.querySelector("pre").textContent.trim();

const part1 = (input) => {
  input = input.split("\n");
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const nrs = input[i].split("").filter((i) => !isNaN(i));
    sum += +(nrs[0] + nrs[nrs.length - 1]);
  }
  return sum;
};

console.log(part1(input));

const numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
};
const part2 = (input) => {
  for (let key in numbers) {
    const re = new RegExp(key, "g");
    input = input.replace(re, key + numbers[key] + key); // a little hacky but it works
  }

  return part1(input);
};

console.log(part2(input));
