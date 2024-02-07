const fs = require("fs");

const correct = JSON.parse(fs.readFileSync("correct.json", "utf-8"));
const response = JSON.parse(fs.readFileSync("response.json", "utf-8"));
let i = 1;

const opts = ["A", "B", "C", "D"];

let total = 0;
let tempScores = [];
for (const question of response) {
  let delSc = 0;
  const obj = new Map(question);
  const correctAns = correct.find((x) => x[0] === obj.get("Question ID :"))[1];

  const id = obj.get("Question ID :");
  const type = obj.get("Question Type :");

  const status = obj.get("Status :");

  let ind = i.toString().padStart(2, "0");

  if (type == "MCQ") {
    const options = [
      +obj.get("Option 1 ID :"),
      +obj.get("Option 2 ID :"),
      +obj.get("Option 3 ID :"),
      +obj.get("Option 4 ID :"),
    ];
    const chosenOpt = obj.get("Chosen Option :");
    const correct = Math.min(...options) + +correctAns - 1;
    const chosen = options[+chosenOpt - 1];
    const rightAns = opts[options.findIndex((x) => x == correct)];
    const yourAns = opts[options.findIndex((x) => x == chosen)] || "--";

    if (correct == chosen) {
      console.log(
        `${ind} ${id} - Correct  \t${status.slice(
          0,
          14
        )}\t${yourAns}\t${rightAns}\t4`
      );
      delSc += 4;
    } else {
      let sc = -1;
      if (status.startsWith("Not")) {
        sc = 0;
      }
      console.log(
        `${ind} ${id} - Incorrect\t${status.slice(
          0,
          14
        )}\t${yourAns}\t${rightAns}\t${sc}`
      );
      delSc += sc;
    }
  } else {
    const chosen = obj.get("Chosen Option :");
    if (correctAns == chosen) {
      console.log(
        `${ind} ${id} - Correct  \t${status.slice(
          0,
          14
        )}\t${chosen}\t${correctAns}\t4`
      );
      delSc += 4;
    } else {
      let sc = -1;
      if (status.startsWith("Not")) {
        sc = 0;
      }
      console.log(
        `${ind} ${id} - Incorrect\t${status.slice(
          0,
          14
        )}\t${chosen}\t${correctAns}\t${sc}`
      );
      delSc += sc;
    }
  }

  if (i % 30 == 0) {
    console.log("----------------------------------------------------------");
  }

  total += delSc;

  tempScores.push(delSc);
  i++;
}

console.log(`Total Score: ${total}`);

const sec1 = tempScores.slice(0, 30).reduce((a, b) => a + b);
const sec2 = tempScores.slice(30, 60).reduce((a, b) => a + b);
const sec3 = tempScores.slice(60, 90).reduce((a, b) => a + b);
console.log(`\tSection 1 - ${sec1}`);
console.log(`\tSection 2 - ${sec2}`);
console.log(`\tSection 3 - ${sec3}`);
