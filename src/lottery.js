import web3 from './web3';

const address = process.env.REACT_APP_CONTRACT_ADDRESS;

const abi = [
    {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
        ],
        name: 'mint',
        outputs: [],
        payable: false,
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
];

// @ts-ignore
export default new web3.eth.Contract(abi, address);
