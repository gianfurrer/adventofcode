originalInput = document.querySelector("pre").textContent.trim().split(",").map(n => +n)

class Amplifier {
    constructor(memory, phase) {
        this.memory = [...memory];
        this.inputs = [phase];
        this.pos = 0;
        this.halt = false;
    }
    execute(inputVal) {
        this.inputs.push(inputVal);
        let output = 0;
        const input = this.memory
        const parameterMode = {
            0: (a) => input[a],
            1: (a) => a
        }

        const opcodes = {
            1: (a, b) => input[input[this.pos++]] = a + b,
            2: (a, b) => input[input[this.pos++]] = a * b,
            3: () => input[input[this.pos++]] = this.inputs.shift(),
            4: (a) => output = a,
            5: (a, b) => a && (this.pos = b),
            6: (a, b) => !a && (this.pos = b),
            7: (a, b) => input[input[this.pos++]] = +(a < b),
            8: (a, b) => input[input[this.pos++]] = +(a == b),
            99: () => this.halt = true
        }
        let code;
        do {
            const str = input[this.pos++].toString();
            code = +str.slice(-2);
            const opcode = opcodes[code];
            const modes = str.slice(0, -2).split("").reverse().join("")
                .padEnd(opcode.length, "0");
            const params = [];
            for (let p = 0; p < opcode.length; ++p) {
                params.push(parameterMode[+modes[p]](input[this.pos++]));
            }
            opcode(...params);
        } while (!output && !this.halt);
        return output;
    }

}

function permutator(inputArr) {
    const results = [];

    function permute(arr, memo) {
        let cur;
        memo = memo || [];

        for (let i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (!arr.length) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    return permute(inputArr);
}
// A

phaseSetting = [0, 1, 2, 3, 4]
results = [];

for (let ps of permutator(phaseSetting)) {
    const amps = ps.map(p => new Amplifier(originalInput, p));
    let output = 0;
    for (let i = 0; i < ps.length; ++i) {
        output = amps[i].execute(output);
    }
    results.push(output)
}
console.log("A", results.sort((a, b) => b - a)[0])

// B
phaseSetting = [5, 6, 7, 8, 9]
results = [];

for (let ps of permutator(phaseSetting)) {
    const amps = ps.map(p => new Amplifier(originalInput, p));
    let output = 0;
    while (!amps[4].halt) {
        for (let i = 0; i < ps.length; ++i) {
            output = amps[i].execute(output);
        }
        results.push(output)
    }
}
console.log("B", results.sort((a, b) => b - a)[0])