const express = require('express');
const app = express();
const EthClient = require('./modules/eth_client');

let ethClient = null;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/blockNumber', function (req, res) {
	if (!ethClient) {
		ethClient = new EthClient();
	}
	console.log('blockNumber begin');
	ethClient.getBlockNumber((data) => {
		console.log(data);
		res.send(JSON.stringify(data));
	});
    console.log('blockNumber end');
});

app.get('/events', function (req, res) {
	if (!ethClient) {
		ethClient = new EthClient();
	}
	console.log('events begin');
	ethClient.getEvents("day", 3, 0, (err, data) => {
		if (!err) {
			console.log("Error: " + err);
		} else {
			console.log(data);
			res.send(JSON.stringify(data));
		}
	});
    console.log('events end');
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
