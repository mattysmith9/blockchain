const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-5e19596c-5965-4c24-a109-f1dc32cbbe4e',
  subscribeKey: 'sub-c-b2541acc-9c21-11e9-be69-5e5c515185c4',
  secretKey: 'sec-c-MGQ5NzkzY2YtNmU0OC00M2MwLWEyOWItMjgxMzk5NTgzZTM1'
};

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION'
};

class PubSub {
  constructor({ blockchain, transactionPool, wallet }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: [Object.values(CHANNELS)] });
    this.pubnub.addListener(this.listener());
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction)
    });
  }

  subscribeToChannels() {
    this.pubnub.subscribe({
      channels: [Object.values(CHANNELS)]
    });
  }

  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject;

        console.log(
          `Message received. Channel: ${channel}. Message: ${message}`
        );

        const parsedMessage = JSON.parse(message);

        switch (channel) {
          case CHANNELS.BLOCKCHAIN:
            this.blockchain.replaceChain(parsedMessage, true, () => {
              this.transactionPool.clearBlockchainTransactions({
                chain: parsedMessage.chain
              });
            });
            break;
          case CHANNELS.TRANSACTION:
            if (
              !this.transactionPool.existingTransaction({
                inputAddress: this.wallet.publicKey
              })
            ) {
              this.transactionPool.setTransaction(parsedMessage);
            }
            break;
          default:
            return;
        }
      }
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ message, channel });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction)
    });
  }
}

module.exports = PubSub;
