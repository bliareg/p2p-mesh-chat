// @flow

import * as React from 'react';

import { observer } from 'mobx-react';

@observer
class Profile extends React.Component<{ selectedId: ?string }> {
  render() {
    const { selectedId } = this.props;
    return (
      <div id='selectedPersonProfile'>
        <div className='person'>
          <div className='personLeft'>
          </div>

          <div className='personRight'>
            <div className='personName'>
              asdasa
            </div>

            <div className='personLastMessage'>
              {selectedId}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
