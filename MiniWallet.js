require('dotenv').config();
const Web3 = require('web3');
const apikey = process.env.api_Key;
const network = 'goerli';

const node = `https://eth-goerli.g.alchemy.com/v2/${apikey}`;
const web3 = new Web3(node);

const accountTo = web3.eth.accounts.create();
//console.log(accountTo);

const privateKey = process.env[`private_Key`];
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);

const createSignedTx = async(rawTx) => {
    rawTx.gas = await web3.eth.estimateGas(rawTx);
    return await accountFrom.signTransaction(rawTx);
}

const sendSignedTx = async(signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log);
}

const amountTo = "0.003";
const rawTx = {
    to:accountTo.address,
    value:web3.utils.toWei(amountTo, "ether")
}
createSignedTx(rawTx).then(sendSignedTx);

