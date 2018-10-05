import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createTask, editTask, fetchTasks, fetchTask} from '../../actions';
import Form from '../Form/Form';
import _ from 'lodash';


import './Modal.css';
class Modal extends Component{
  constructor(props){
    super(props);
    this.state={
      task: this.props.activeTask,
      new: true
    }
  }
  static getDerivedStateFromProps(props, current_state) {
    if (current_state.task !== props.activeTask) {
      return {
        task: props.activeTask,
        new: false
      }
    }
    return null
  }

  onClickNewForm(){
    console.log("new task");
    this.setState((state)=>{
      return {
        new: true,
        task: {}
      }
    });
    console.log(this.state);
  }

  render(){
    console.log(this.props.activeTask);
    let task=this.state.task;
    console.log("state task");
    console.log(this.state);
    return (
      <div>
      <button
        className="btn btn-primary pull-xs-right"
        type="submit"
        onClick={this.onClickNewForm.bind(this)}
      >New Task
      </button>
        <p>
          {`${(!this.state.new)?task.title:"new post"}`}
        </p>
        <Form task={{...task}} new={this.state.new}/>
      </div>
    );
  }
}

function mapStateToProps(state){
    console.log(state);
    return{
        activeTask: state.activeTask
    };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({editTask, createTask, fetchTask}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
