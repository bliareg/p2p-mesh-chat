// @flow

export interface Signal {
  pureData: string,
  data: { type: string, data: Object },
  serialize(): string,
  deserialize(): Object,
  type(): string
}
