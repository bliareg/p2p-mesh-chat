// @flow

import * as React from 'react';

import { appSwarm } from 'context';

class Profile extends React.Component<{}> {
  render() {
    return (
      <div id='myProfile'>
        <div className='person'>
          <div className='personRight'>
            <div className='personName'>
              My Name
            </div>

            <div className='personLastMessage'>
              {appSwarm.swarm.me}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
