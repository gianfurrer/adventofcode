originalInput = document.querySelector("pre").textContent.trim().split(",").map(n => +n)

class IntComputer {
    constructor(memory, keepMemory = false) {
        this.memory = [...memory];
        this.keepMemory = keepMemory;
        this.pos = 0;
        this.halt = false;
    }
    execute(inputVal) {
        this.input = inputVal;
        this.halt = false;
        let output = 0;
        let base = 0;
        this.pos = this.keepMemory ? this.pos : 0;
        const input = this.keepMemory ? this.memory : [...this.memory]
        const parameterMode = {
            0: (a) => input[a],
            1: (a) => a,
            2: (a) => base + input[a]
        }

        const opcodes = {
            1: (a, b, c) => input[c] = input[a] + input[b],
            2: (a, b, c) => input[c] = input[a] * input[b],
            3: (a) => input[a] = this.input,
            4: (a) => output = input[a],
            5: (a, b) => input[a] && (this.pos = input[b]),
            6: (a, b) => !input[a] && (this.pos = input[b]),
            7: (a, b, c) => input[c] = +(input[a] < input[b]),
            8: (a, b, c) => input[c] = +(input[a] == input[b]),
            9: (a) => base += input[a],
            99: () => this.halt = true
        }
        let code;
        do {
            const str = input[this.pos++].toString();
            code = +str.slice(-2);
            const opcode = opcodes[code];
            if (!opcode) {
                console.error("Opcode", code, "not found at pos", this.pos)
            }
            const modes = str.slice(0, -2).split("").reverse().join("")
                .padEnd(opcode.length, "0");
            const params = [];
            for (let p = 0; p < opcode.length; ++p) {
                params.push(parameterMode[+modes[p]](this.pos++));
            }
            opcode(...params);
        } while (!this.halt);
        return output;
    }

}

computer = new IntComputer(originalInput)
// A
console.log("A:", computer.execute(1))

// B
console.log("B:", computer.execute(2))