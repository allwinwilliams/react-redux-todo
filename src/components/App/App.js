import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Tasks from '../Tasks/Tasks';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Tasks />
        <Footer />
      </div>
    );
  }
}

export default App;
