import React, { Component } from 'react';
import logo from './assets/RT-Header-Logo.jpg';
import './App.css';
import Calendar from './components/Calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" />
        </header>

        <section className='calendar-section'>
          <Calendar />
        </section>
        
      </div>
    );
  }
}

export default App;

