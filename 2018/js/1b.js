let frequencie = 0;
let multFreq = -1;
let frequencies = [];
let numbers = document.querySelector("pre").textContent.split("\n")
numbers = numbers.slice(0,numbers.length-1).map(n => parseInt(n));

while (multFreq == -1) {
  for (let i = 0; i < numbers.length; ++i) {
    if (multFreq == -1) {
      const number = numbers[i];
      frequencie += number;
      if (frequencies.indexOf(frequencie)+1) {
        multFreq = frequencie;
      }
      frequencies.push(frequencie);
    }
  }
}

