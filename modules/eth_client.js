const Web3 = require('web3');
const config = require('../config.json', 'utf8');

function getPeriodRate(period) {
	// Time in seconds for each block
	const rate = config.block_rate;

	period = period.toLowerCase();
	let elapsedSeconds = 1;
	if (period == "week") {
		elapsedSeconds *= 7;
	} else if (period == "month") {
		elapsedSeconds *= 30;
	} else if (period == "year") {
		elapsedSeconds *= 365;
	}
	switch(period.toLowerCase()) {
		case "day":
			elapsedSeconds *= 24;
		case "hour":
			elapsedSeconds *= 60;
		case "minute":
			elapsedSeconds *= 60;
			break;
		default:
			return -1;
	}
	return elapsedSeconds / rate;
}

function convertToBlockNumber(period, units) {
	let periodRate = getPeriodRate(period);
	return periodRate != -1 ? periodRate * units : -1;
}

function EthClient() {
	this.web3 = new Web3(Web3.givenProvider || config.network_address);
}

EthClient.prototype.getBlockNumber = function getBlockNumber(callback) {
	this.web3.eth.getBlockNumber()
		.then(callback ? callback : console.log)
		.catch((err) => {
			console.log(err);
			callback(err);
		});
};

EthClient.prototype.getEvents = function getEvents(period, unitsfrom, unitsTo, callback) {
	if (!this.contract) {
		this.contract = new this.web3.eth.Contract(config.contract.abi, config.contract.address, {});
	}

	if (unitsTo > unitsfrom) {
		let temp = unitsTo;
		unitsTo = unitsfrom;
		unitsfrom = temp;
	}

	this.getBlockNumber((err, blockNumber) => {
		if (!err) {
			this.contract.getPastEvents("allEvents", {
				fromBlock: blockNumber - convertToBlockNumber(period, unitsfrom),
				toBlock: blockNumber - convertToBlockNumber(period, unitsTo)
			}, callback);
		} else {
			callback(err, null);
		}
	});
};

module.exports = EthClient;
