import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Tasks from '../../containers/Tasks/Tasks';

import Modal from '../../containers/Modal/Modal';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Tasks />
        <Footer />
        <div>
          <Modal />
        </div>
      </div>

    );
  }
}

export default App;
