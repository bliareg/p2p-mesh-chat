// @flow

import { observable, action } from 'mobx';
import type { MessageList, SignalProcessor, Signal, Message } from 'types';

class Messages implements SignalProcessor {
  @observable
  values: MessageList = {};

  @action
  pushValue(data: { userId: string, ownerId: string, value: string }) {
    const { userId } = data;
    const messages = this.values[userId] || [];
    const newMessages = [
      ...messages,
      data
    ];

    this.values = {
      ...this.values,
      [userId]: newMessages
    }
  }

  @action
  clean() {
    this.values = {};
  }

  getValues(userId: ?string): Array<Message> {
    if (!userId) {
      return []
    }

    return this.values[userId] || [];
  }

  process(userId: string, signal: Signal) {
    const value: Message = (signal.data: any);
    this.pushValue(value);
  }
}

export { Messages };
