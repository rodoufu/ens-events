const Web3 = require('web3');

function EthClient(address) {
	this.web3 = new Web3(Web3.givenProvider || address);
}

EthClient.prototype.getBlockNumber = function getBlockNumber(callback) {
	this.web3.eth.getBlockNumber().then(callback ? callback : console.log);
};

module.exports = EthClient;

