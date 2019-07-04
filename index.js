const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./Blockchain/blockchain');
const PubSub = require('./app/pubsub');

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());

app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.post('/api/mine', (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });

  res.redirect('/api/blocks');
});

const PORT = 3000;

app.listen(3000, () => console.log(`listening at localhost: ${PORT}`));
