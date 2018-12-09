// @flow

import * as React from 'react';
import { observer } from 'mobx-react';
import shortid from 'shortid';

import { mainPeerStore, mainMessageStore, appSwarm } from 'context';

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

    appSwarm.message(userId, message);
  }

  _renderMessages = () => {
    const messages = mainMessageStore.values || [];

    return messages.map<React.Element<*>>(message => (
      <li key={shortid()}>{message}</li>
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

    return (
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
    );
  }
}

export default App;
