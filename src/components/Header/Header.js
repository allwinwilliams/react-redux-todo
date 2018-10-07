import React, { Component } from 'react';
import NewTaskButton from '../Utilities/NewTaskButton';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark py-4">
        <div className="container">
          <a className="navbar-brand" href="#">Todo List</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <NewTaskButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
