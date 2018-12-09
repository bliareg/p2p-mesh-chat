// @flow

import * as React from 'react';
import { observer } from 'mobx-react';
import shortid from 'shortid';
import './_style.scss';

import MyProfile from 'components/MyProfile';
import UsersList from 'components/UsersList';
import Profile from 'components/Profile';
import Chat from 'components/Chat';

import { mainPeerStore, mainMessageStore, signalService } from 'context';

@observer
class App extends React.Component<{}, {
  userId: ?string,
  message: string,

}> {
  state = {
    userId: null,
    message: ''
  }

  onChange = (e: SyntheticInputEvent<*>) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  }

  selectUserToMessage = (id: string) => {
    this.setState({
      userId: id
    });
  }

  sendMessage = () => {
    const { userId, message } = this.state;
    if (!userId || !message) {
      return;
    }

    signalService.message(userId, message);
  }

  _renderMessages = () => {
    const { userId } = this.state;

    if (!userId) {
      return null;
    }
    const messages = mainMessageStore.getValues(userId);

    return messages.map<React.Element<*>>(message => (
      <li key={shortid()}>{message.value}</li>
    ))
  }

  _renderListOfUsers = () => {
    const peers = mainPeerStore.values;

    return peers.map<React.Element<*>>(peerEl => (
      <li onClick={() => this.selectUserToMessage(peerEl.id)} key={shortid()}>{peerEl.id}</li>
    ))
  }

  render() {

    const _dataForRender = {
      messages: mainMessageStore.values,
      peers: mainPeerStore.values
    };

    const { userId } = this.state;

    return (
      <div id='app'>
        <div id='left'>

          <MyProfile />
          <UsersList selectedId={userId} onChange={this.selectUserToMessage} />

        </div>

        {userId && <div id='right'>
          <Profile selectedId={userId} />
          <Chat selectedId={userId} />
        </div>}

        {!userId && <div id='right'>
          <div className='acjc'>
            <div id='addSomeone'>
              Add someone...
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default App;
      {/*
        <div>
          <h5>Messages</h5>
          <ul>
            {this._renderMessages()}
          </ul>
          <h5>Users</h5>
          <ul>
            {this._renderListOfUsers()}
          </ul>
          <input value={this.state.message} type="text" name="message" onChange={this.onChange} />
          <button onClick={this.sendMessage}>Send</button>
        </div>
      */}
