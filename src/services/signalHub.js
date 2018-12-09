// @flow

import Signalhub from 'signalhub';
import { SWARM_DOMENS, SWARM_DISCOVERY_NAMESPACE } from 'constants';

const signalHub = Signalhub(SWARM_DISCOVERY_NAMESPACE, SWARM_DOMENS);

export { signalHub, Signalhub };
