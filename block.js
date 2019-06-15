class Block {
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
}

const block1 = new Block({
  timestamp: '06/15/19',
  lastHash: 'one-lastHash',
  hash: 'one-hash',
  data: 'one-data'
});

console.log('block1', block1);
