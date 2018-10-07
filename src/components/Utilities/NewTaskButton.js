import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createTask, editTask, fetchTasks, fetchTask} from '../../actions';


import './NewTaskButton.css';

class NewTaskButton extends Component{

  onClickNewForm(){
    console.log("new task");
    this.props.fetchTask(null);
  }

  render(){
    return (
      <div>
      <button
        className="btn btn-primary btn-lg pull-xs-right"
        type="button"
        onClick={this.onClickNewForm.bind(this)}
        data-toggle="modal"
        data-target="#formModal"
      ><strong>NEW TASK</strong>
      </button>
        </div>
    );
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({editTask, createTask, fetchTask}, dispatch)
}

export default connect(null, mapDispatchToProps)(NewTaskButton);
