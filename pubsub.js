const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-5e19596c-5965-4c24-a109-f1dc32cbbe4e',
  subscribeKey: 'sub-c-b2541acc-9c21-11e9-be69-5e5c515185c4',
  secretKey: 'sec-c-MGQ5NzkzY2YtNmU0OC00M2MwLWEyOWItMjgxMzk5NTgzZTM1'
};

const CHANNELS = {
  TEST: 'TEST'
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject;

        console.log(
          `Message received. Channel: ${channel}. Message: ${message}`
        );
      }
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}

module.exports = PubSub;
