const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const EthClient = require('./modules/eth_client');

let ethClient = null;
function getEthClient() {
	if (!ethClient) {
		ethClient = new EthClient();
	}
	return ethClient;
}

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

app.get('/api/blockNumber', function (req, res) {
	console.log('blockNumber begin');
	getEthClient().getBlockNumber((data) => {
		console.log(data);
		res.send(JSON.stringify(data));
	});
    console.log('blockNumber end');
});

app.post('/api/events', function (req, res) {
	console.log('events begin');
	getEthClient().getEvents(req.body.period, req.body.since, 0, (err, data) => {
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
