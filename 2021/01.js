const input = document.querySelector("pre").trim().split("\n").map(i => +i);

// === A ===

{
  let count = 0
  input.reduce((a, b) => { if (a < b) { ++count }; return b; })
  console.log("A", count);
}

// === B ===

count = 0
arr = []
const length = input.length;
input.forEach((a, i) => {
  if (i <= length - 3) {
    arr.push(a + input[i + 1] + input[i + 2]);
  }
})
arr.reduce((a, b) => { if (a < b) { ++count }; return b; })
