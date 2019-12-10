const originalInput = document.querySelector("pre").textContent.trim().split(",").map(n => +n)

execute = (inputVal) => {
    let output = 0;
    const input = [...originalInput]
    const parameterMode = {
        0: (a) => input[a],
        1: (a) => a
    }
    let pos = 0
    const opcodes = {
        1: (a, b) => input[input[pos++]] = a + b,
        2: (a, b) => input[input[pos++]] = a * b,
        3: () => input[input[pos++]] = inputVal,
        4: (a) => output = a,
        5: (a, b) => a && (pos = b),
        6: (a, b) => !a && (pos = b),
        7: (a, b) => input[input[pos++]] = +(a < b),
        8: (a, b) => input[input[pos++]] = +(a == b)
    }
    let stop = false;
    while (input[pos] != 99 && !stop) {
        const str = input[pos++].toString();
        const opcode = opcodes[+str.slice(-2)];
        const modes = str.slice(0, -2).split("").reverse().join("")
            .padEnd(opcode.length, "0");
        const params = [];
        for (let p = 0; p < opcode.length; ++p) {
            params.push(parameterMode[+modes[p]](input[pos++]));
        }
        opcode(...params);
        (inputVal == 1 && output !== 0) && (stop = true);
    }
    return output;
}

console.log("A", execute(1))
console.log("B", execute(5))