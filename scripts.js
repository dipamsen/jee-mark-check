// on response page
function getResponses() {
  const data = $$(".menu-tbl").map((x) =>
    [...x.children[0].children].map((x) =>
      [...x.children].map((x) => x.innerText)
    )
  );
  const nums = $$(
    "table.questionRowTbl > tbody > tr:nth-child(5) > td.bold"
  ).map((x) => x.innerText);
  let i = 0;
  for (let q of data) {
    if (q.length == 3) {
      q.push(["Chosen Option :", nums[i]]);
      i++;
    }
  }
  console.log(JSON.stringify(data));
}

// on challenge page
const getCorrectAnswers = () =>
  console.log(
    JSON.stringify(
      [...$$("#table-scroll table")[0].rows]
        .slice(1)
        .map((x) => [x.children[1].innerText, x.children[2].innerText])
    )
  );
