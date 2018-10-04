import React, { Component } from 'react';
import TaskList from '../TaskList/TaskList';
import { getTasks } from '../../actions/index';
import _ from 'lodash';

export default class Tasks extends Component{
  constructor(props){
    super(props);
    this.state={
      tasks: getTasks()
    };
    console.log("to be done:")
      console.log(this.state.toBeDone);
  }

  componentWillMount(){
    this.setState((prevState)=>{
      tasks: getTasks()
    })
  }

  renderTasks(){
    return(
      <ul>
        <TaskList
          tasks={_.reject(getTasks(), function(x) { return x.state!==0; })}
          title="To be done"
        />
        <TaskList
          tasks={_.reject(getTasks(), function(x) { return x.state!==1; })}
          title="Doing"
        />
        <TaskList
          tasks={_.reject(getTasks(), function(x) { return x.state!==2; })}
          title="Done"
        />

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
