import React, { Component } from 'react';

class Block extends Component {
  render() {
    const { timestamp, hash, data } = this.props.block;
    const hashDisplay = `${hash.substring(0, 15)}...`;
    const stringData = JSON.stringify(data);
    const dataDisplay =
      stringData.length > 35 ? `${stringData.substring(0, 35)}...` : stringData;

    return (
      <div className="Block">
        <div>Hash: {hashDisplay}</div>
        <div>timestamp: {new Date(timestamp).toLocaleDateString()}</div>
        <div>Data: {dataDisplay}</div>
      </div>
    );
  }
}

export default Block;
