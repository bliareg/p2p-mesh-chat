// @flow

import { Signal } from 'models';
import { SIGNAL_MESSAGE } from 'constants';
import type { Swarm } from './swarm.js';
import type { SignalProcessor } from 'types';

type ProcessTabel = {
  [string]: SignalProcessor
}

// Works as service wrapper around swarm.js,
// and callback manager for stores
class SignalService {
  swarm: Swarm
  processTable: ProcessTabel

  constructor({ swarm, processTable }: { swarm: Swarm, processTable: ProcessTabel }) {
    this.swarm = swarm;
    this.processTable = processTable;
    this.swarm.setDataCallback(this.mainCallback);
  }

  message(userId: string, message: string) {
    const ownerId = this.swarm.swarm.me;

    const dataForOwner = { userId, ownerId, value: message, type: SIGNAL_MESSAGE };
    const dataForUser = { userId: ownerId, ownerId, value: message, type: SIGNAL_MESSAGE };

    const signalForOwner = new Signal({ data: dataForOwner })
    const signalForUser = new Signal({ data: dataForUser })

    this.processSignal(userId, signalForOwner.pureData);

    this.swarm.signal(userId, signalForUser);
  }

  processSignal(userId: string, pureData: string) {
    const signal = new Signal({ userId, pureData })
    const type = signal.type();
    const processor = this.processTable[type || ''];

    if (processor) {
      processor.process(userId, signal);
    }
  }

  mainCallback = ({ userId, data, peer }: {
    userId: string,
    data: string,
    peer: any
  }): void => {
    this.processSignal(userId, data);
  }
}

export { SignalService };
