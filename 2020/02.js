// Combined

const input = $("pre").textContent.trim().split("\n");

// A

const a = (array) => {
  let valid = 0;
  for (let root of array) {
    const split = root.split(": ");
    const password = split[1];
    const policy = split[0];
    const policy_split = policy.split(" ");
    const char = policy_split[1];
    const range = policy_split[0];
    const range_split = range.split("-");
    const min = +range_split[0];
    const max = +range_split[1];
    const occurrences = password.split(char).length - 1
    if (min <= occurrences && max >= occurrences) {
      ++valid;
    }
  }
  return valid;
}
console.log("A:", a([...input]));


// B

const b = (array) => {
  let valid = 0;
  for (let root of array) {
    const split = root.split(": ");
    const password = split[1];
    const policy = split[0];
    const policy_split = policy.split(" ");
    const char = policy_split[1];
    const range = policy_split[0];
    const range_split = range.split("-");
    const i1 = +range_split[0]-1;
    const i2 = +range_split[1]-1;
    if ((password[i1] === char && password[i2] !== char) || (password[i2] === char && password[i1] !== char)) {
      ++valid;
    }
  }
  return valid;
}
console.log("B:", b([...input]));