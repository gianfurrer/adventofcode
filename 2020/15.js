// Combined

const input = "9,19,1,6,0,5,4".split(",").map(n => +n);

const solve = (nrs, rounds) => {
  let lastNr = nrs[nrs.length-1];
  const nrsMap = nrs.reduce((a,b,i) => Object.assign({}, a, {[b]: i+1}),0);
  for (let round = nrs.length; round < rounds; ++round) {
    [nrsMap[lastNr], lastNr] = [round, nrsMap[lastNr] ? round-nrsMap[lastNr] : 0];
  }
  return lastNr
}

// A
console.log("A:", solve([...input], 2020));

// B -- slow
console.log("B:", solve([...input], 30000000));