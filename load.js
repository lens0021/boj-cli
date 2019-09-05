"use strict";

const https = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const writeToFile = (name, sample) => {
  fs.writeFile(name, sample, { flag: "w" }, err => {
    if (err) throw err;
    console.log(`The file ${name} has been saved!`);
  });
};

const SITE = process.argv[2];
const NUMBER = process.argv[3];
const PATH = process.argv[4];

switch (SITE) {
  case "boj":
    https
      .get(
        {
          host: "www.acmicpc.net",
          path: `/problem/${NUMBER}`
        },
        res => {
          res.setEncoding("utf8");
          res.on("data", chunk => {});
          res.on("end", () => {
            const document = new JSDOM(html).window.document;

            const sampleInput = document.querySelector("#sample-input-1")
              .innerHTML;
            const sampleOutput = document.querySelector("#sample-output-1")
              .innerHTML;

            writeToFile(`${PATH}/${NUMBER}.input.txt`, sampleInput);
            writeToFile(`${PATH}/${NUMBER}.output.txt`, sampleOutput);
          });
        }
      )
      .on("error", e => {
        console.log("Got error: " + e.message);
      });
    break;
  case "programmers":
    const document = new JSDOM(fs.readFileSync(`${PATH}/${NUMBER}.temp.html`))
      .window.document;

    const sampleCode =
      `# https://programmers.co.kr/learn/courses/30/lessons/${NUMBER}\n\n` +
      document.querySelector("#code").innerHTML;

    // Find test cases table
    const guideDescription = document.querySelector(
      ".guide-section-description .markdown"
    );
    let testCasesTable = undefined;
    for (const c of guideDescription.children) {
      if (c.innerHTML == "입출력 예") {
        testCasesTable = c.nextElementSibling;
        break;
      }
    }
    if (testCasesTable == undefined) {
      testCasesTable = guideDescription.querySelector("table");
    }

    // Split test cases
    let testCode = `import casetest\n\n`;
    const testCases = testCasesTable.querySelectorAll("tbody tr");
    for (const tc of testCases) {
      let result = "";
      let params = [];
      for (const td of tc.children) {
        if (
          td.firstElementChild != null &&
          td.firstElementChild.tagName == "Q"
        ) {
          params.push(`"${td.textContent}"`);
        } else if (td != tc.lastElementChild) {
          params.push(invalidate(td.textContent));
        } else {
          result = invalidate(td.textContent);
        }
      }
      testCode +=
        `casetest.test(\n    __import__("${NUMBER}").solution,\n` +
        `    ${params.join(", ")},\n    ${result}\n)\n`;
    }

    writeToFile(`${PATH}/${NUMBER}.py`, sampleCode);
    writeToFile(`${PATH}/${NUMBER}.test.py`, testCode);
    break;
}

function invalidate(str) {
  switch (str) {
    case "true":
      return "True";
    case "false":
      return "False";
    default:
      return str;
  }
}
