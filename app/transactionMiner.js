class TransactionMiner {
  constructor({ blockchain, TransactionPool, wallet, pubsub }) {
    this.blockchain = blockchain;
    this.TransactionPool = TransactionPool;
    this.wallet = wallet;
    this.pubsub = pubsub;
  }
  mineTransactions() {
    /* Get the transaction pool's valid transactions.
       Generate miner's reward.
       Add a block consisting of these transactions to the blockchain.
       Broadcast the updated blockchain.
       Clear the pool.
    */
  }
}

module.exports = TransactionMiner;
