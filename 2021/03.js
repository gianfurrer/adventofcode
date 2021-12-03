const input = document.querySelector("pre").innerText.trim().split("\n").map(i => parseInt(i, 2))

// === A ===
{
  const bits = Math.floor(Math.log2(Math.max(...input)) + 1);
  const halfSize = input.length / 2;
  let gammaRate = 0;

  for (let b = bits - 1; b >= 0; --b) {
    const mask = 1 << b;
    gammaRate += (+(input.reduce((r, n) => r + ((n & mask) != 0), 0)) > halfSize) << b;
  }
  const epsilonRate = ~gammaRate & (Math.pow(2, bits) - 1);
  console.log("A:", gammaRate * epsilonRate);
}

// === B ===
{
  const getBiggerArray = (arr, a) => {
    return a.length >= arr.length / 2 ? a : arr.filter(n => !a.includes(n));
  }

  const getSmallerArray = (arr, a) => {
    return a.length < arr.length / 2 ? a : arr.filter(n => !a.includes(n));
  }

  const getRating = (getArray) => {
    let numbers = [...input];
    const bits = Math.floor(Math.log2(Math.max(...numbers)) + 1);
    for (let b = bits - 1; b >= 0; --b) {
      if (numbers.length <= 1) break;
      const mask = 1 << b;
      const highBitNumbers = numbers.filter((n) => +((n & mask) != 0), 0)
      numbers = getArray(numbers, highBitNumbers);
    }
    return numbers[0];
  }
  console.log("B:", getRating(getBiggerArray) * getRating(getSmallerArray))
}
