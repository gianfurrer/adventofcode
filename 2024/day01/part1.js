// PART 1
input = document.querySelector("pre > code").textContent.trim().split("\n")
distance = 0
list1 = []
list2 = []
for (const line of input) {
  [l1, l2] = line.split("   ")
  list1.push(+l1)
  list2.push(+l2)
}
list1.sort();
list2.sort();
for (let i = 0; i < list1.length; ++i) {
  distance += Math.abs(list1[i] - list2[i])
}
console.log("Distance:", distance)
