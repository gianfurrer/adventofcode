const input = document.querySelector("pre").textContent.trim().split("\n")
let distance = 0
let list1, list2 = []
for (const line of input) {
  [l1, l2] = line.split("   ")
  list1.push(+l1)
  list2.push(+l2)
}
for (let i = 0; i < list1.length; ++i) {
  distance += list1[i] * list2.filter(it => it == list1[i]).length
}
console.log("Distance:", distance)
