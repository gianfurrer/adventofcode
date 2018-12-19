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

//input = document.querySelector("body > main > article > pre:nth-child(10) > code").textContent.trim().split("\n")
input = document.querySelector("pre").textContent.trim().split("\n")
ipRegister = parseInt(input[0].replace("#ip ", ""));

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

for (let p = 0; p < 2; ++p) {
  ip = 0;
  register = [p,0,0,0,0,0];
  while(ip < instructions.length) {
    if (ip == 1) {
      let sum = 0;
      for (let x = 1; x < register[2]+1; ++x) {
        if (!(register[2] % x)) {
            sum+=x;
        }
      }
      console.log("ab"[p]+": "+sum);
      break;
    }
    const instruction = instructions[ip];
    instruction.before = register;
    const opcode = opcodes.find(o => o.name == instruction.opcode);
    opcode.function(instruction);
    ip = ++register[ipRegister];
  }
  ip = --register[ipRegister]
  console.log(JSON.stringify(register))

}
