// Combined

const input = $("pre").textContent.trim().split("\n");
const data = [];

for (const line of input) {
  const keyValue = line.split(" contain ");

  const key = keyValue[0].substr(0, keyValue[0].length-1);
  const values = keyValue[1].substr(0, keyValue[1].length-1).split(", ");

  const thisBag = {bag: key, contains: []};

  for (let bag of values) {
    if (bag == "no other bags") {
      continue;
    }
    bag = bag.replace("bags", "bag").split(" ");
    const amount = +bag.shift();
    bag = bag.join(" ");
    thisBag.contains.push({bag: bag, amount: amount});
  }
  data.push(thisBag);
}

const myBag = "shiny gold bag";


// A

const a = (bags) => { 
  let amount = [];
  let parents = [bags.find(b => b.bag == myBag)];

  do {
    parents = bags.filter(d => parents.filter(parent => d.contains.map(c => c.bag).includes(parent.bag)).length);
    amount.push(...parents.filter(p => !(amount.indexOf(p)+1)));
  } while (parents.length);
  return amount.length;
}

console.log("A: ", a([...data]));

// B

const bagCount = (bag, bags) => {
  bag = bags.find(b => b.bag === bag);
  if (!bag.contains.length) {
    return 0;
  }
  return  bag.contains.reduce((a,b) => (isNaN(a) ? a.amount + (a.amount * bagCount(a.bag, bags)) : a ) + 
    (isNaN(b) ? b.amount + (b.amount * bagCount(b.bag, bags)) : b));
}

console.log("B: ", bagCount(myBag, [...data]));