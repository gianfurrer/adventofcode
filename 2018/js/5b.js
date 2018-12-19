String.prototype.replaceAll = function(search, replacement) {
        var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
};

const calcInput = document.querySelector("pre").textContent.trim()
const result = [];
const az = "abcdefghijklmnopqrstuvwxyz"

for (let a = 0; a < az.length; ++a) {
  const letter = az[a];
  let newInput = calcInput.replaceAll(letter, "").replaceAll(letter.toUpperCase(), "");
  for (let i = 0; i < newInput.length-1; ++i) {
    const curChar = newInput.charCodeAt(i);
    const nextChar = newInput.charCodeAt(i+1);
    if (Math.abs(curChar-nextChar)===32) {
      newInput = newInput.slice(0,i) + newInput.slice(i+2);
      i = -1;
    }
  }
  result.push({letter: letter, count: newInput.length})
}
console.log(result.sort((a,b) => a.count - b.count)[0].count);
