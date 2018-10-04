import React, { Component } from 'react';
import TaskList from '../TaskList/TaskList';
import { getTasks } from '../../actions/index';

export default class Tasks extends Component{
  constructor(props){
    super(props);
    this.state={
      tasks: getTasks()
    };
  }
  componentWillMount(){
    this.setState((prevState)=>{
      tasks: getTasks()
    })
  }
  renderTasks(){
    return(
      <ul>
        <TaskList tasks={this.state.tasks} />
        <TaskList tasks={this.state.tasks} />
      </ul>
    );
  }
  render() {
    return (
      <div>
        <h3>To do Items</h3>
          { this.renderTasks() }
      </div>
    );
  }
}
