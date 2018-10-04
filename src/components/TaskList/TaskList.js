import React, { Component } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import _ from 'lodash';

export default class TaskList extends Component{

  renderTaskList(){
    return(
      <ul>
        {
          _.map(this.props.tasks, (task)=>(
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
