import React from 'react';
import Place from './components/NextPlace/NextPlace';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="App-header">Different Places</h1>
      </header>

      <Place />
    </div>
  );
}

export default App;
