import React, { Component } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import _ from 'lodash';

export default class TaskList extends Component{

  renderTaskList(){
    console.log("TaskList");
    console.log(this.props.tasks);
    return(
      <ul>
        {
          _.map(this.props.tasks, (task)=>{
            console.log("TASK");
            console.log(task);
            return(
            <TaskItem
              {...task}
              id={task.key}
              key={task.key}
            />
          )}
        )
        }
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
          { this.renderTaskList() }
      </div>
    );
  }
}
