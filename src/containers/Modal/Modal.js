import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {createTask, editTask, fetchTask} from '../../actions';
import Form from '../Form/Form';
import _ from 'lodash';


import './Modal.css';
class Modal extends Component{

  render(){
    let newTask=_.isUndefined(this.props.activeTask);
    return (
      <div>
          <Form task={{...this.props.activeTask}} new={newTask}/>
      </div>
    );
  }
}

function mapStateToProps(state){
    return{
        activeTask: _.find(state.tasks, (task)=> {return task.key===state.activeTaskKey})
    };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({editTask, createTask, fetchTask}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
