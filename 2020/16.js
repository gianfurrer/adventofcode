// Combined

const input = $("pre").textContent.trim().split("\n\n");

const getRange = (text) => {
  const arrays = text.split(" or ").map(s => { 
    const [start, end] = s.split("-").map(n => +n);
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
  });
  return [].concat.apply([], arrays);
}

// A

const a = (sections) => {
  const notes = sections.shift();
  let allNumbers = [];
  for (const row of notes.split("\n")) {
    allNumbers = allNumbers.concat(getRange(row.split(": ")[1]));
  } 
  const tickets = sections[1].split("\n").slice(1).map(t => t.split(",").map(n => +n));
  const errors = tickets.reduce((a,b) => a.concat(b.filter(t => !allNumbers.includes(t))), []);
  return errors.reduce((a,b) => a+b);
}

console.log("A:", a([...input]));

// B

const b = (sections) => {
  const notes = sections.shift();
  let allNumbers = [];
  let fields = [];
  for (const row of notes.split("\n")) {
    const split = row.split(": ");
    const field = {
      name: split[0],
      value: getRange(split[1])
    }
    fields.push(field);
    allNumbers.push(...field.value);
  } 
  const yourTicket = sections.shift().split("\n").pop().split(",").map(n => +n);
  const tickets = sections.shift().split("\n").slice(1).map(t => t.split(",").map(n => +n));
  const validTickets = tickets.filter(t => !t.filter(n => !allNumbers.includes(n)).length);
  const indicies =  Array(fields.length).fill().map((_, i) => i);
  fields = fields.map(f => { f.indicies = indicies; return f; });
  for (const ticket of validTickets) {
    for (let i = 0; i < ticket.length; ++i) {
      for (const field of fields) {
        if (!field.value.includes(ticket[i])) {
          field.indicies = field.indicies.filter(f => f !== i);
        }
      }
    }
  }

  let fixedIndicies = [];// fields.filter(f => f.indicies.length == 1).map(f => f.indicies[0]); 
  while (fixedIndicies.length < fields.length) {
    for (const field of fields) {
      if (field.indicies.length == 1) {
        if (field.index == undefined) {
          field.index = field.indicies[0];
          fixedIndicies.push(field.index);
        }
      } else {
        field.indicies = field.indicies.filter(i => !fixedIndicies.includes(i));
      }
    }
  }
  const departureIndicies = fields.filter(f => f.name.startsWith("departure")).map(f => f.index);
  return yourTicket.filter((_, i) => departureIndicies.includes(i)).reduce((a,b) => a * b);
}

console.log("B:", b([...input]));