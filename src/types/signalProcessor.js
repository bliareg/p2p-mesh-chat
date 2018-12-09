// @flow
import type { Signal } from './signal.js';

export interface SignalProcessor {
  process(userId: string, signal: Signal): void
}
