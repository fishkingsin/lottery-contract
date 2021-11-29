const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

// Getting the output of our compiled Solidity Contract
const contractFile = require('./compile');// Initialization
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;
console.log("abi : " + abi);
const provider = new HDWalletProvider(
    process.env.REACT_APP_METAMASK_CODE,
    process.env.REACT_APP_INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
    // getting accounts from our Metamask wallet
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    // deploying our contract
    const result = await new web3.eth.Contract(JSON.parse(abi))
        .deploy({ data: bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    
    console.log('Contract deployed to', result.options.address);
};
deploy();
