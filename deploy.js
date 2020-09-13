require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const ContractObject = require('./build/Contract.json');

const provider = new HDWalletProvider(
  `${process.env.MNEMONIC}`,
  `${process.env.NODE_URL}`
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(`Deploying from ${accounts[0]}`);

  const txn = await new web3.eth.Contract(ContractObject.abi)
  .deploy({ data: '0x' + ContractObject.evm.bytecode.object }) 
  .send({ from: accounts[0] });
  // Add arguments after the bytecode like so if needed by the contract constructor { data: '0x' + bytecode, arguments: [if, any]}

  console.log('Contract deployed to: ', txn.options.address);
};

deploy();
