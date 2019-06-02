"use strict";

const problem = process.argv[2];
const https = require("https");
const options = {
  host: "www.acmicpc.net",
  path: `/problem/${problem}`
};
const path = process.argv[3];

let html = "";
https
  .get(options, res => {
    res.setEncoding("utf8");
    res.on("data", chunk => {
      html += chunk;
    });
    res.on("end", () => {
      const jsdom = require("jsdom");
      const { JSDOM } = jsdom;
      const document = new JSDOM(html).window.document;
      const sampleInput = document.querySelector("#sample-input-1").innerHTML;
      const sampleOutput = document.querySelector("#sample-output-1").innerHTML;

      const fs = require("fs");
      const writeToFile = (name, sample) => {
        fs.writeFile(name, sample, { flag: "w" }, err => {
          if (err) throw err;
          console.log(`The file ${name} has been saved!`);
        });
      };
      writeToFile(`${path}/${problem}.input.txt`, sampleInput);
      writeToFile(`${path}/${problem}.output.txt`, sampleOutput);
    });
  })
  .on("error", e => {
    console.log("Got error: " + e.message);
  });
