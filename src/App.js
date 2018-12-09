// @flow

import * as React from 'react';
import { observer } from 'mobx-react';
import './_style.scss';

import MyProfile from 'components/MyProfile';
import UsersList from 'components/UsersList';
import Profile from 'components/Profile';
import Chat from 'components/Chat';

@observer
class App extends React.Component<{}, {
  userId: ?string

}> {
  state = {
    userId: null
  }

  selectUserToMessage = (id: string) => {
    this.setState({
      userId: id
    });
  }

  render() {
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
