import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Tasks from '../../containers/Tasks/Tasks';
import Modal from '../Modal/Modal';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Tasks />
        <div>
        <Modal />



        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
