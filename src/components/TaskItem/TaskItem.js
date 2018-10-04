import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchTask, deleteTask } from '../../actions';
import _ from 'lodash';

class TaskItem extends Component{

  onDeleteClick(){
      const {id} = this.props;
      this.props.deleteTask(id);
  }
  onShowClick(){
      const {id} = this.props;
      this.props.fetchTask(id);
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
    return{
        task: _.find(state.tasks, (o)=>o.id===props.id)
    };
}

export default connect(mapStateToProps,{deleteTask, fetchTask})(TaskItem);
