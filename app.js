const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const EthClient = require('./modules/eth_client');

let ethClient = null;

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/blockNumber', function (req, res) {
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

app.get('/api/events/:period/:since', function (req, res) {
	if (!ethClient) {
		ethClient = new EthClient();
	}
	console.log('events begin');
	ethClient.getEvents(req.params.period, req.params.since, 0, (err, data) => {
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
