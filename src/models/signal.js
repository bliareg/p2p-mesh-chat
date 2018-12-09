// @flow

import { isEmpty } from 'lodash';

import type { Signal as ISignal } from 'types';

class Signal implements ISignal {
  pureData: string
  data: { type: string, data: Object }

  constructor({ pureData, data }: {
    pureData?: string,
    data?: Object,
  }) {

    this.pureData = pureData || '';
    this.data = data || { type: '', data: {} };

    this._init();
  }

  serialize() {
    const { data } = this;
    this.pureData = JSON.stringify(data);
    return this.pureData;
  }

  deserialize() {
    const { pureData } = this;
    this.data = JSON.parse(pureData || '');
    return this.data;
  }

  type(): string {
    return this.data.type;
  }

  _init() {
    if (!!this.pureData && !this.data.type) {
      this.deserialize();
    }

    if (!this.pureData && !!this.data.type) {
      this.serialize();
    }
  }
}

export { Signal };
