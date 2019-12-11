originalInput = document.querySelector("pre").textContent.trim().split(",").map(n => +n)

class IntComputer {
    constructor(memory, startInput, keepMemory = false) {
        this.memory = [...memory];
        this.keepMemory = keepMemory;
        this.pos = 0;
        this.halt = false;
        this.input = [startInput];
    }
    stdout = (output) => {
        console.log("Override IntComputer.stdout: ", output)
    }
    execute() {
        this.halt = false;
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
            3: (a) => input[a] = this.input.shift(),
            4: (a) => this.stdout(input[a]),
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
    }
}


for (let r = 0; r < 2; ++r) {
    computer = new IntComputer(originalInput, r, false);
    const map = [];
    let currentPoint = {
        x: 0,
        y: 0
    }
    let directions = {
        0: () => currentPoint.y -= 1,
        1: () => currentPoint.x += 1,
        2: () => currentPoint.y += 1,
        3: () => currentPoint.x -= 1,
    }

    let direction = 0;
    let change = true;
    computer.stdout = (output) => {
        if (change) {
            const color = output;
            let point = map.find(p => p.x == currentPoint.x && p.y == currentPoint.y);
            if (point) {
                if (color !== undefined) {
                    point.color = color;
                } else {
                    console.log(currentPoint)
                }
            } else {
                point = {
                    ...currentPoint
                }
                point.color = color;
                map.push(point);
            }
        } else {
            direction += output ? 1 : 3
            direction %= 4;
            directions[direction]()
            const p = map.find(p => p.x == currentPoint.x && p.y == currentPoint.y);
            const input = p ? p.color : 0;
            computer.input.push(input);
        }
        change = !change
    }

    computer.execute()

    if (!r) {
        console.log("A:", map.length)
    } else {
        let paint = ""
        for (let y = Math.min(...map.map(p => p.y)); y <= Math.max(...map.map(p => p.y)); ++y) {
            for (let x = xL = Math.min(...map.map(p => p.x)); x <= Math.max(...map.map(p => p.x)); ++x) {
                const p = map.find(p => p.x == x && p.y == y)
                if (p) {
                    paint += p.color ? "█" : " ";
                } else {
                    paint += " ";
                }
            }
            paint += "\n";
        }
        console.log("B:")
        console.log(paint)
    }
}