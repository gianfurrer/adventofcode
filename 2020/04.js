// Combined 

const input = $("pre").textContent.trim().split("\n\n");
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

// A

const a = (batches) => {        
  let count = 0;
  for (let line of batches) {
    const batchFields = line.replace(/\n/g, " ").split(" ").map(l => l.split(":")[0]);
    const valid = batchFields.length > requiredFields.length || (batchFields.length == requiredFields.length && !batchFields.includes("cid"));
    if (valid) {
      ++count;
    }
  }
  return count;
}
console.log("A:", a([...input]));
  
  
// B

const b = (array) => { 
    let count = 0;
    
    for (let line of array) {
      const batchFields = line.replace(/\n/g, " ").split(" ");
      let valid = batchFields.length > requiredFields.length || (batchFields.length == requiredFields.length && !batchFields.map(f => f.split(":")[0]).includes("cid"));
      if (valid) {
        for (let field of batchFields) {
          field = field.split(":");
          switch(field[0]) {
            case "byr":
              if (+field[1] < 1920 || +field[1] > 2002) {
                valid = false;
              }
              break;
            case "iyr":
              if (+field[1] < 2010 || +field[1] > 2020) {
                valid = false;
              }
              break;
            case "eyr":
              if (+field[1] < 2020 || +field[1] > 2030) {
                valid = false;
              }
              break;
            case "hgt":
              const height = +field[1].slice(0, field[1].length-2);
              const unit = field[1].slice(field[1].length-2);
              if (!(unit == "cm" && height >= 150 && height <= 193) 
                && !(unit == "in" && height >= 59 && height <= 76)) {
                valid = false;
              }
              break;
            case "hcl":
              if (!(new RegExp("^#[a-fA-F0-9]{6}$")).test(field[1])) {
                valid = false;
              }
              break;
            case "ecl":
              if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(field[1])) {
                valid = false;
              }
              break;
            case "pid":
              if (!(new RegExp("^[0-9]{9}$")).test(field[1])) {
                valid = false;
              }
              break;
          }
        }
      }
      
      if (valid) {
        ++count;
      }
    }
    return count;
}
console.log("B:", b([...input]));