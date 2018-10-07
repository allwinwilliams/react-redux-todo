import React, { Component } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import _ from 'lodash';

export default class TaskList extends Component{

  renderTaskList(){
    return(
      <div className="p-3" style={{backgroundColor: `${this.props.color}`}}>
        {
          _.map(this.props.tasks, (task)=>{
            return(
            <TaskItem
              {...task}
              id={task.key}
              key={task.key}
            />
          )}
        )
        }
      </div>
    );
  }
  render() {
    return (
      <div>
        <h3 className="text-center m-0 py-2 bg-white" style={{color: `${this.props.color}`}}><strong>{this.props.title}</strong></h3>
          { this.renderTaskList() }
      </div>
    );
  }
}
