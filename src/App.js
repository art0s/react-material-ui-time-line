import React from 'react';
import 'normalize.css';
import './App.css';

import TimeLine from './component/time-line';

function App() {
  let exampleDates = [];
  let startDate = new Date();
  for (let i = 14; i >= 0; i--)
  {
    let d = new Date();
    d.setMinutes(startDate.getMinutes() - i);
    exampleDates.push(d);
  }

  return (
    <div className="App">
      <header className="App-header">
        <TimeLine
          value={ exampleDates[exampleDates.length - 1] }
          range={ exampleDates }
          onChange={ (value) => console.log(value) }
        />
      </header>
    </div>
  );
}

export default App;
