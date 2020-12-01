// Combined

const input = $("pre").textContent.trim().split("\n").map(n => +n);

// A

const a = (array) => {
  for (let root of array) {
    array.shift();
    for (let number of array) {
        if (root + number == 2020) {
          return root * number;
        }
    }
  }
}
console.log("A:", a([...input]));


// B

const b = (array) => {
  for (let n1 of array) {
    array.shift();
    for (let n2 of array) {
      for (let n3 of array) {
          if (n1 + n2 + n3 == 2020) {
            return n1 * n2 * n3;
          }
      }
    }
  }
}
console.log("B:", b([...input]));