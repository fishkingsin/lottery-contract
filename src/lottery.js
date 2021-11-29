import web3 from './web3';

const address = process.env.REACT_APP_CONTRACT_ADDRESS;

const abi = [
    {
        constant: true,
        inputs: [],
        name: 'manager',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            { name: '_to', type: 'address' },
            { name: '_id', type: 'uint256' },
            { name: '_amount', type: 'uint256' }
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
