// @flow

import { Peers, Messages } from 'stores';
import { Swarm, subscribeStoreForPeers, subscribeStoreForStreamData } from 'services';

const mainPeerStore = new Peers();
const mainMessageStore = new Messages();

const appSwarm = new Swarm();

subscribeStoreForPeers(appSwarm, mainPeerStore);
subscribeStoreForStreamData(appSwarm, mainMessageStore);

window.mainPeerStore = mainPeerStore;
window.mainMessageStore = mainMessageStore;
window.appSwarm = appSwarm;

export {
  mainPeerStore,
  mainMessageStore,
  appSwarm
}
