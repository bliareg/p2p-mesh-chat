// @flow

import * as React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';

import { mainPeerStore } from 'context';

@observer
class UsersList extends React.Component<{ selectedId: ?string, onChange(userId: string): void }> {

  _renderListOfUsers = () => {
    const peers = mainPeerStore.values;
    const { selectedId, onChange } = this.props;

    return peers.map<React.Element<*>>(peerEl => (
      <div
        className={classNames('person', { selected: peerEl.id === selectedId })}
        key={peerEl.id}
        onClick={() => onChange(peerEl.id)}
      >
        <div className='personRight'>
          <div className='personName'>
            Name of the user
          </div>

          <div className='personLastMessageTime'>
            date
          </div>

          <div className='personLastMessage'>
            {peerEl.id}
          </div>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <div id='search'>
          <i id='searchIcon' className='fa fa-search' />

          <input type='text' placeholder='Search' />

          <i id='addIcon' className='fa fa-plus' />
        </div>
        <div id='persons'>
          {this._renderListOfUsers()}
        </div>
      </React.Fragment>
    );
  }
}

export default UsersList;

