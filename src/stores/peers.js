// @flow

import { observable, action } from 'mobx';

class Peers {
  @observable
  values: Array<{ id: string, peer: any }> = [];

  @action
  updatePeers(peers: { [string]: any }) {
    let newValues = [];
    for(let [id, peer] of Object.entries(peers)) {
      newValues = [
        ...newValues,
        { id, peer }
      ]
    }
    this.values = newValues;
  }

  static mainCallback = (
    updateData: { action: string, peers: any, peer: any, id: any },
    store: Peers
  ): void => {
    const { peers } = updateData;
    if (peers) {
      store.updatePeers(peers);
    }
  }
}

export { Peers };
