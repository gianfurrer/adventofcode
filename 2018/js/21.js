opcodes = [
  {
		name: "addr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] + register[sample.B];
		}
	},
  {
		name: "addi",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] + sample.B;
		}
	},
  {
		name: "mulr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] * register[sample.B];
		}
	},
  {
		name: "muli",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] * sample.B;
		}
	},
  {
		name: "banr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] & register[sample.B];
		}
	},
  {
		name: "bani",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] & sample.B;
		}
	},
  {
		name: "borr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] | register[sample.B];
		}
	},
  {
		name: "bori",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] | sample.B;
		}
	},
  {
		name: "setr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A];
		}
	},
  {
		name: "seti",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = sample.A;
		}
	},
  {
		name: "gtir",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = sample.A > register[sample.B] ? 1 : 0;
		}
	},
  {
		name: "gtri",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] > sample.B ? 1 : 0;
		}
	},
  {
		name: "gtrr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] > register[sample.B] ? 1 : 0;
		}
	},
  {
		name: "eqir",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = sample.A === register[sample.B] ? 1 : 0;
		}
	},
  {
		name: "eqri",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] === sample.B ? 1 : 0;
		}
	},
  {
		name: "eqrr",
		function: (sample) => {
      const register = sample.before;
			register[sample.C] = register[sample.A] === register[sample.B] ? 1 : 0;
		}
	}
]
input = document.querySelector("pre").textContent.trim().split("\n")
ipRegister = parseInt(input[0].replace("#ip ", ""))

instructions = []
for (let i = 1; i < input.length; ++i) {
	const insInput = input[i].split(" ");
	instructions.push({
		opcode: insInput[0],
		A: parseInt(insInput[1]),
		B: parseInt(insInput[2]),
		C: parseInt(insInput[3]),
	});
}

part1 = () => {
  counterLimit = 2000;
  ip = 0;
  register = [0,0,0,0,0,0];
  counter = 0;
  while(ip < instructions.length && ip >= 0 && counterLimit > counter) {
      counter++;
      const instruction = instructions[ip];
      instruction.before = register;
      const opcode = opcodes.find(o => o.name == instruction.opcode);
      opcode.function(instruction);
      ip = ++register[ipRegister];
      if (register[ipRegister] == 28) {
        counter = counterLimit;
      }
  }
  return register[4];
}

part2 = () => {
  cache = [];
  D = 65536;
  C = 16098955;
  const powNr1 = Math.pow(2, 24);
  const powNr2 = Math.pow(2, 16);
  let halt = false;
  while (!halt) {
    C = ((C+(D%256))%powNr1*65899)%powNr1
    if (D < 256) {
      D = C | powNr2;
      if (cache.indexOf(D)+1) {
        halt = true;
      }
      cache.push(D);
      C = 16098955;
    }
    else {
      D = Math.floor(D/256);
    }
  }
  return cache[cache.length-1];
}

console.log("Part 1: " + part1());
console.log("Part 2: " + part2());
