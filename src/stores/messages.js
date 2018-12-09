// @flow
import { observable, action } from 'mobx';

class Messages {
  @observable
  values: Array<string> = [];

  @action
  addValues(values: Array<string> = []) {
    this.values = values;
  }

  @action
  pushValue(value: string) {
    this.values = [
      ...this.values,
      value
    ]
  }

  @action
  clean() {
    this.values = [];
  }

  static mainCallback = (
    updateData: { action: string, data: string, peer: any, id: any },
    store: Messages
  ): void => {
    const { data } = updateData;
    store.pushValue(data);
  }
}

export { Messages };
