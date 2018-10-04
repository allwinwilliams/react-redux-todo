import React, { Component } from 'react';
import TaskItem from '../TaskItem/TaskItem';

export default class TaskList extends Component{

  renderTaskList(){
    return(
      <ul>
        {
          this.props.tasks.map((task)=>(
            <TaskItem
              key={task.id}
              {...task}
            />
          ))
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
