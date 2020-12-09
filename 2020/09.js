// Combined

const input = $("pre").textContent.trim().split("\n");

// A

const a = (numbers) => {
  numbers = numbers.map(n => +n);
  const preambleCount = 25;
  const preamble = numbers.slice(0, preambleCount);
  let invalidNumber;

  for (let i = preambleCount; i < numbers.length; ++i) {
    let valid = false;
    preamble.forEach(p => {
     preamble.forEach(p1 => {
       if (p !== p1) {
         if (p + p1 == numbers[i]) {
           valid = true;
         }
       }
     })   
    });
    if (!valid) {
      invalidNumber = numbers[i];
      break;
    }
    preamble.push(numbers[i]);
    preamble.shift();
  }

  return invalidNumber;
}

console.log("A:", a([...input]));

// B

const b = (numbers) => {
  numbers = numbers.map(n => +n);
  const targetN = a([...numbers]);
  let contiguousN = [];
  let calcedN;
  let i = 0;
  let count = 1;

  while (calcedN !== targetN) {
    ++count;
    if (i + count > numbers.length || calcedN > targetN) {
      count = 2;
      ++i;
    }
    contiguousN = numbers.slice(i, i+count);
    calcedN = contiguousN.reduce((a,b) => a + b);
  }

  contiguousN = contiguousN.sort((a,b) => a - b);
  return contiguousN[0] + contiguousN[count-1];
}

console.log("B:", b([...input]));