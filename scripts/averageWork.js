const Blockchain = require('../Blockchain');

const blockchain = new Blockchain();

blockchain.addBlock({ data: 'initial' });

console.log('first block', blockchain.chain[blockchain.chain.length - 1]);

let preTimestamp, nextTimestamp, nextBlock, timeDifference, averageTime;
const times = [];

for (let i = 0; i < 1000; i++) {
  preTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
  blockchain.addBlock({ data: `block ${i}` });
  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;
  timeDifference = nextTimestamp - preTimestamp;
  times.push(timeDifference);
  averageTime = times.reduce((total, num) => total + num) / times.length;

  console.log(
    `Time to mine block: ${timeDifference}ms. 
     Difficulty: ${nextBlock.difficulty}. 
     Average time: ${averageTime}ms`
  );
}
