import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createTask, fetchTask, deleteTask, editTask, fetchTasks } from '../../actions';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

class TaskItem extends Component{

  onDeleteClick(){
      this.props.deleteTask(this.props.id);
  }

  onShowClick(){
      this.props.fetchTask(this.props.id);
  }

  render(){
    return(
      <li>
        <div>
            <h4>
              <button
                className="btn btn-danger pull-xs-right"
                onClick={this.onDeleteClick.bind(this)}
                > Delete
                </button>
                <button
                  className="btn btn-primary pull-xs-right"
                  onClick={this.onShowClick.bind(this)}
                  > Show
                  </button>
              {this.props.title}
            </h4>
        </div>
      </li>
    );
  }
}

function mapStateToProps(state, props){

}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchTasks, editTask, createTask, fetchTask, deleteTask}, dispatch)
}

export default connect(null,mapDispatchToProps)(TaskItem);
