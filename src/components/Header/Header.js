import React, { Component } from 'react';
import NewTaskButton from '../Utilities/NewTaskButton';
import SearchForm from '../Utilities/SearchForm';
import {fetchTasks} from '../../actions';
import {connect} from 'react-redux';

import './Header.css';

class Header extends Component{
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark py-4">
        <div className="container">
          <h3 className="text-white" style={{cursor: 'pointer'}} onClick={this.props.fetchTasks.bind(this)}>Todo List</h3>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav w-100">
              <li className="nav-item mx-5 w-75">
                <SearchForm />
              </li>
              <li className="nav-item">
                <NewTaskButton />
              </li>

            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(null,{fetchTasks})(Header);
