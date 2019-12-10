const originalInput = document.querySelector("pre").textContent.trim().split(",").map(n => +n)
const opcode = {
    1: (a, b) => a + b,
    2: (a, b) => a * b
}

const execute = (oInput, noun, verb) => {
    let pos = 0
    const input = [...oInput]
    input[1] = noun;
    input[2] = verb;
    while (input[pos] != 99) {
        const result = opcode[input[pos++]](input[input[pos++]], input[input[pos++]])
        input[input[pos++]] = result;
    }
    return input[0];
}

// A
const resA = execute(originalInput, 12, 2);

// B
const target = 19690720;
let noun = verb = value = 0
while (noun <= 99 && value != target) {
    while (verb <= 99 && value != target) {
        value = execute(originalInput, noun, verb++);
    }
    (value !== target) && (verb = 0);
    ++noun;
}
const resB = 100 * --noun + --verb;

// Result
console.log("A:", resA);
console.log("B:", resB)