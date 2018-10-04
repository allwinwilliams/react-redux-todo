import React, { Component } from 'react';

export default class TaskItem extends Component{

  render(){
    return(
      <li>
        <div>
            <h4>
              {this.props.title}
            </h4>
        </div>
      </li>
    );
  }
}
