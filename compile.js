const solc = require("solc");
const path = require("path");
const fs = require("fs");

const contractPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(contractPath, "utf8");

function findImports(lookUpPath) {
  if ( lookUpPath.startsWith("@openzeppelin") ) {
    const importPath = path.resolve(__dirname, "node_modules", lookUpPath);
    const importSource = fs.readFileSync(importPath, "utf8");
    return {
      contents:
      importSource
    };
  } else return { error: 'File not found' };
}


const input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(
  solc.compile(JSON.stringify(input), { import: findImports })
);
// console.log("output : "+ JSON.stringify(output, "", 2))
// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts['Lottery.sol']) {
  console.log(
    "Compiled : " + 
    contractName +
    " "
  );
  module.exports = output.contracts['Lottery.sol'][contractName]
}