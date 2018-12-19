//input = document.querySelector("body > main > article:nth-child(1) > pre > code").textContent.trim().split("\n");
input = document.querySelector("pre").textContent.trim().split("\n\n\n")[0].split("\n");
testInput = document.querySelector("pre").textContent.trim().split("\n\n\n")[1].trim().split("\n");

numbers = Array.apply(null, {length: 16}).map(Number.call, Number);
opcodes = [
  {
		name: "addr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] + register[sample.B];
		},
    numbers: numbers
	},
  {
		name: "addi",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] + sample.B;
		},
    numbers: numbers
	},
  {
		name: "mulr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] * register[sample.B];
		},
    numbers: numbers
	},
  {
		name: "muli",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] * sample.B;
		},
    numbers: numbers
	},
  {
		name: "banr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] & register[sample.B];
		},
    numbers: numbers
	},
  {
		name: "bani",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] & sample.B;
		},
    numbers: numbers
	},
  {
		name: "borr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] | register[sample.B];
		},
    numbers: numbers
	},
  {
		name: "bori",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] | sample.B;
		},
    numbers: numbers
	},
  {
		name: "setr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A];
		},
    numbers: numbers
	},
  {
		name: "seti",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = sample.A;
		},
    numbers: numbers
	},
  {
		name: "gtir",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = sample.A > register[sample.B] ? 1 : 0;
		},
    numbers: numbers
	},
  {
		name: "gtri",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] > sample.B ? 1 : 0;
		},
    numbers: numbers
	},
  {
		name: "gtrr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] > register[sample.B] ? 1 : 0;
		},
    numbers: numbers
	},
  {
		name: "eqir",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = sample.A === register[sample.B] ? 1 : 0;
		},
    numbers: numbers
	},
  {
		name: "eqri",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] === sample.B ? 1 : 0;
		},
    numbers: numbers
	},
  {
		name: "eqrr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] === register[sample.B] ? 1 : 0;
		},
    numbers: numbers
	}
]

start = () => {
  samples = [];
  for (let i = 0; i < input.length; i+=4) {
  	sample = {
  		before: JSON.parse(input[i].replace("Before: ", "")).map(b => parseInt(b)),
      after: JSON.parse(input[i+2].replace("After: ", "")).map(b => parseInt(b)),
      opcodes: []
  	}
    const instruction = input[i+1].split(" ").map(i => parseInt(i));
    sample.opcode = instruction[0];
    sample.A = instruction[1];
    sample.B = instruction[2];
    sample.C = instruction[3];

    //const availableOpcodes = opcodes.filter(o => o.number == sample.opcode || o.numbers.indexOf(sample.opcode)+1);
    for (let o = 0; o < opcodes.length; ++o) {
      const opcode = opcodes[o];
      const sampleCopy = JSON.parse(JSON.stringify(sample));
      opcode.function(sampleCopy);
      if (JSON.stringify(sampleCopy.before) == JSON.stringify(sampleCopy.after)) {
        sample.opcodes.push(opcode);
      }
      else {
        opcode.numbers = opcode.numbers.filter(n => n != sample.opcode);
        if (opcode.numbers.length == 1) {
            opcode.number = opcode.numbers[0];
            opcodes.forEach(o => o.numbers = o.numbers.filter(n => n != opcode.number))
        }
      }
    }
    samples.push(sample);
  }
  console.log("Part 1: "+samples.filter(s => s.opcodes.length >= 3).length);

  //Part2
  const register = [0,0,0,0]
  for (let i = 0; i < testInput.length; ++i) {
    const sample = {}
    const instruction = testInput[i].split(" ").map(i => parseInt(i));
    sample.opcode = instruction[0];
    sample.A = instruction[1];
    sample.B = instruction[2];
    sample.C = instruction[3];
    sample.before = register;

    const opcode = opcodes.find(o => o.number == sample.opcode);
    opcode.function(sample);

  }
  console.log("Part 2: " + register[0]);
}
