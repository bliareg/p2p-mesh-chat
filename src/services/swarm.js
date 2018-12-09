// @flow

import WebrtcSwarm from 'webrtc-swarm';
import { signalHub } from './signalHub.js';
import { Peers } from 'stores';
import { Messages } from 'stores';

class Swarm {
  swarm: WebrtcSwarm;
  peerUpdateCallback: ?({ action: string, peers: any, peer: any, id: any }) => void;
  dataFlowCallback: ?({ action: string, data: string, peer: any, id: any }) => void;
  textDecoder: TextDecoder;

  constructor() {
    const webrtcSwarm = WebrtcSwarm(signalHub, {});
    this.swarm = webrtcSwarm;
    this.peerUpdateCallback = null;
    this.dataFlowCallback = null;
    this.textDecoder = new TextDecoder('utf-8');
    this.subscribeForNewPeers();
    this.subscribeForDisconnect();
  }

  setPeersCallback(peerUpdateCallback: ({ action: string, peers: any, peer: any, id: any }) => void) {
    this.peerUpdateCallback = peerUpdateCallback;
  }

  setDataCallback(dataFlowCallback: ({ action: string, data: string, peer: any, id: any }) => void) {
    this.dataFlowCallback = dataFlowCallback;
  }

  subscribeForNewPeers() {
    const action = 'peer';
    this.swarm.on(action, (peer, id) => {
      console.log(`New peer - ${id}`);
      this.subscribeForPeerData(id, peer);
      this._notifyPeerUpdate(action, peer, id);
    });
  }

  subscribeForDisconnect() {
    const action = 'disconnect';
    this.swarm.on(action, (peer, id) => {
      console.log(`Disconnected from peer - ${id}`);
      this._notifyPeerUpdate(action, peer, id);
    });
  }

  subscribeForPeerData(id: string, peer: any) {
    const action = 'data';
    peer.on(action, (data: Uint8Array) => {
      this._notifyNewData(action, id, peer, data);
      console.log('New data', id);
    });
  }

  message(id: string, message: string) {
    const { swarm } = this;
    const peer = swarm.remotes[id];

    if (peer) {
      peer.write(message);
    }
  }

  _notifyPeerUpdate(action: string, peer: any, id: any) {
    const peers = this.swarm.remotes;
    if (this.peerUpdateCallback) {
      this.peerUpdateCallback({ action, peers, peer, id });
    }
  }

  _notifyNewData(action: string, id: string, peer: any, data: Uint8Array) {
    const message = this.textDecoder.decode(data) || '';

    if (this.dataFlowCallback) {
      this.dataFlowCallback({ action, id, peer, data: message });
    }
  }
}

const subscribeStoreForPeers = (swarm: Swarm, store: Peers) => {
  const callback = (updateParams: any) => {
    Peers.mainCallback(updateParams, store)
  };
  swarm.setPeersCallback(callback);
};

const subscribeStoreForStreamData = (swarm: Swarm, store: Messages) => {
  const callback = (updateParams: any) => {
    Messages.mainCallback(updateParams, store)
  };
  swarm.setDataCallback(callback);
};

export { Swarm, subscribeStoreForPeers, subscribeStoreForStreamData };
