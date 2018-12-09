// @flow

import { Peers, Messages } from 'stores';
import { SignalService } from 'services';
import { SIGNAL_MESSAGE } from 'constants';
import { Swarm, subscribeStoreForPeers } from 'services';

const mainPeerStore = new Peers();
const mainMessageStore = new Messages();

const processTable = {
  [SIGNAL_MESSAGE]: mainMessageStore
}

const appSwarm = new Swarm();

subscribeStoreForPeers(appSwarm, mainPeerStore);
const signalService = new SignalService({ swarm: appSwarm, processTable });

window.mainPeerStore = mainPeerStore;
window.mainMessageStore = mainMessageStore;
window.appSwarm = appSwarm;
window.signalService = signalService;

export {
  mainPeerStore,
  mainMessageStore,
  appSwarm,
  signalService
}
