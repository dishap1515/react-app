import React, { Component } from 'react';
import './App.css';


class App extends Component {
  render () {
    return (
      <div className="App">
        <div className="calc-wrapper">
          <div className="row">
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>/</button>
          </div>
          <div className="row">
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>*</button>
          </div>
          <div className="row">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>+</button>
          </div>
          <div className="row">
            <button>.</button>
            <button>0</button>
            <button>=</button>
            <button>-</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
