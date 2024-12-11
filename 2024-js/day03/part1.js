input = document.querySelector("pre").textContent.trim()
instr = [...input.matchAll(/mul\((\d+),(\d+)\)/g)]
instr.reduce((total, curr) => total + +curr[1] * +curr[2], 0)
