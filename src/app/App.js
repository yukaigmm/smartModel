import React, { Component } from 'react';
import './App.css';

import { Provider } from 'mobx-react';
import stores from './stores';

import SmartModeling from './smart/SamrtModeling';

const renderDevTools = () => {
  let isDev = false;//process.env.NODE_ENV !== 'production'
  if (isDev) {
    const DevTools = require('mobx-react-devtools').default;
    return (<DevTools />);
  }
};

class App extends Component {
  render() {
    return (
      <div>
        <Provider {...stores}>
          <div className="App">
            <SmartModeling />
          </div>
        </Provider>
        {renderDevTools()}
      </div>
    );
  }
}

export default App;
