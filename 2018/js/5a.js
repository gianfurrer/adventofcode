input = document.querySelector("pre").textContent.trim()

stack = [];
for (let i = 0; i < input.length; ++i) {
  if (stack.length && Math.abs(input.charCodeAt(i)-stack[stack.length-1].charCodeAt(0))===32) {
    stack.pop()
  }
  else {
    stack.push(input[i])
  }
}
