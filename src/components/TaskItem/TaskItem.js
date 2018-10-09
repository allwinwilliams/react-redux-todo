import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createTask, fetchTask, deleteTask, editTask, fetchTasks } from '../../actions';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

class TaskItem extends Component{

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
  renderTag(attribute,value){
    if(_.isEmpty(value)) return "";
    return(
      <p className='mb-0'>
        {attribute}: <strong>{_.truncate(_.join(value,", "),{length: 25})}</strong>
      </p>
    );
  }

  render(){
    return(
      <div  className="card mx-4 my-4"
            style={{opacity: 0.92, cursor: "pointer"}}
            onClick={this.onShowClick.bind(this)}
            data-toggle="modal"
            data-target="#formModal"
      >
          <div className="card-body p-3">
              <div className="p-0">
                <h5 className="card-title">
                  {_.truncate(this.props.title,{length: 30})}
                </h5>
                {this.renderDate(this.props.dueDate)}
                <div className="card-text text-muted">

                  {this.renderAttribute("Member",this.props.member)}
                  {this.renderTag("Tags",this.props.tags)}

                </div>
              </div>
            </div>
        </div>

    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchTasks, editTask, createTask, fetchTask, deleteTask}, dispatch)
}

export default connect(null,mapDispatchToProps)(TaskItem);
