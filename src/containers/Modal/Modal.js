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
    console.log("-----------NEW-------------");
    console.log(this.state.new);
    return (
      <div>
      <button
        className="btn btn-primary pull-xs-right"
        type="submit"
        onClick={this.onClickNewForm.bind(this)}
      >NEW
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
    return{
        activeTask: state.activeTask
    };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({editTask, createTask, fetchTask}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
