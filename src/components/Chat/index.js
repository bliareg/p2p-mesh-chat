// @flow

import * as React from 'react';

import { observer } from 'mobx-react';
import classNames from 'classnames';

import { signalService, appSwarm, mainMessageStore } from 'context';

@observer
class Chat extends React.Component<{ selectedId: ?string }, { message: string }> {

  state = { message: '' }

  onChange = (e: SyntheticInputEvent<*>) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  }

  sendMessage = (e: SyntheticKeyboardEvent<*>) => {
    if (e.key !== 'Enter') {
      return;
    }

    const { selectedId } = this.props;
    const { message } = this.state;
    if (!selectedId || !message) {
      return;
    }

    signalService.message(selectedId, message);

    // Clean message field
    this.setState({ message: '' });
  }

  _renderMessages = () => {
    const { selectedId } = this.props;

    if (!selectedId) {
      return null;
    }

    const messages = mainMessageStore.getValues(selectedId);
    const selfId = appSwarm.swarm.me;

    return messages.map<React.Element<*>>(message => {
      const isOut = selfId === message.ownerId;
      const isIn = !isOut;
      return <div className={classNames('message', { in: isIn }, { out: isOut } )}>
        {message.value}
      </div>
    });
  }

  render() {
    const { message } = this.state;
    //
    // Necessary for mobx
    const _forRender = mainMessageStore.values;

    return (
      <React.Fragment>
        <div id='messages'>
          {this._renderMessages()}
        </div>

        <div id='write'>
          <input
            value={message}
            name='message'
            onKeyPress={this.sendMessage}
            onChange={this.onChange}
            type='text'
            placeholder='Write a message...'
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Chat;

