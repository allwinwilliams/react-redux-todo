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

  renderAttribute(attribure, value){
    if(_.isEmpty(value)) return "";
    return(
      <p className='mb-0'>
        {attribure}: <strong>{_.truncate(value,{length: 25})}</strong>
      </p>
    )
  }

  renderDate(date){
    if(_.isEmpty(date)) return "";
    return(
      <h6 className="card-subtitle text-muted my-1">
        Due by {date}
      </h6>
    );
  }

  render(){
    return(
      <div className="card mx-3 my-4" style={{opacity: 0.92}}>
          <div className="card-body"
            onClick={this.onShowClick.bind(this)}
            data-toggle="modal"
            data-target="#formModal"
          >
              <div

              >
                <h5 className="card-title">
                  {_.truncate(this.props.title,{length: 30})}
                </h5>
                {this.renderDate(this.props.dueDate)}
                <div className="card-text text-muted">

                  {this.renderAttribute("Member",this.props.member)}
                  {this.renderAttribute("Tags",this.props.tags)}

                </div>
              </div>
              <hr className="mt-3 mb-2"/>
              <a
               className="card-link text-danger ml-auto"
               style={{cursor: "pointer"}}
               onClick={this.onDeleteClick.bind(this)}>
                Delete
              </a>
              <a
               className="card-link text-primary mr-auto"
               style={{cursor: "pointer"}}
               onClick={this.onShowClick.bind(this)}
               data-toggle="modal"
               data-target="#formModal"
               >
                Edit
              </a>
            </div>
        </div>

    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchTasks, editTask, createTask, fetchTask, deleteTask}, dispatch)
}

export default connect(null,mapDispatchToProps)(TaskItem);
