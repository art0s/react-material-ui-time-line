import React from 'react';
import 'normalize.css';
import './App.css';

import TimeLine from './component/time-line';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TimeLine range={ [] } onChange={ (value) => console.log(value) } />
      </header>
    </div>
  );
}

export default App;
