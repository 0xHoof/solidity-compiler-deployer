const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
const contractName = require('./contractName');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', contractName);
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Contract.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

// const abiString = solc.compile(JSON.stringify(input));
// const output = JSON.parse(abiString).contracts['JLoansFactory.sol'];
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Contract.sol'];

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract + '.json'),
    output[contract]
  );
}

// // for (let contract in output) {
// //   console.log(output[contract].evm.bytecode.object); //Bytecode
// //   console.log(output[contract].abi); // interface
// // }
