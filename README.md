# JEE (Mains) Provisional Answer Key - Mark checker

## Usage

1. Open "Response Sheet" from the JEE Main application, and run the following code in your DevTools:

```js
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
getResponses();
```

Copy the output of this code, and save it to a new file `response.json`.

2. Open "Challenge Page" (which has all questions and correct answers). Open DevTools (by going to settings > More Tools > Developer Tools.)

Copy the following code and run it:

```js
const getCorrectAnswers = () =>
  console.log(
    JSON.stringify(
      [...$$("#table-scroll table")[0].rows]
        .slice(1)
        .map((x) => [x.children[1].innerText, x.children[2].innerText])
    )
  );
getCorrectAnswers();
```

Copy the output of this code, and save it to a new file `correct.json`

3. Run the script! (You need Node.js installed on your system.)

```
node checker.js
```
