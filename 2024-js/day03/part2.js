input = document.querySelector("pre").textContent.trim()

instr = [...input.matchAll(/(mul|do|don't)\((?:(\d+),(\d+))?\)/g)]
let total = 0;
let enabled = true;
instr.forEach(i => i[1] == "do" ? (enabled = true) : i[1] == "don't" ? (enabled = false) : enabled && i[1] == "mul" ? (total += +i[2] * +i[3]) : false)
console.log(`Result: ${total}`)
