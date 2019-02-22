const express = require('express');
const app = express();
const EthClient = require('./modules/eth_client');

const config = require('./config.json', 'utf8');
let ethClient = null;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/blockNumber', function (req, res) {
	if (!ethClient) {
		ethClient = new EthClient(config.network_address);
	}
	console.log('blockNumber begin');
	ethClient.getBlockNumber((data) => {
		console.log(data);
		res.send(JSON.stringify(data));
	});
    console.log('blockNumber end');
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

