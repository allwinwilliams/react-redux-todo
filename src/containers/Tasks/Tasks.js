import React, { Component } from 'react';
import TaskList from '../../components/TaskList/TaskList';
import { fetchTasks, editTask, deleteTask, createTask } from '../../actions/index';
import _ from 'lodash';
import {TASK_STATES as TasksStates} from '../../actions/states';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Tasks extends Component{

  constructor(props){
    super(props);
    this.state={
      tasks: this.props.tasks
    }
    this.props.fetchTasks();
  }

  componentDidMount(){
      this.setState((prevState)=>{
        return{
          tasks: this.props.tasks
        }
      })
  }

  renderTasks(){
    if(_.isEmpty(this.props.tasks)) return(
      <div className="text-center mt-5 text-white">
        {this.props.message}
      </div>
    );
    return(
      <div className="container-fluid h-100">
        <div className="row h-100">
          {
            _.map(TasksStates, (state)=>{
              return(
                <div className="col px-0"
                    key={state.value}
                >
                  <TaskList
                    tasks={_.filter(this.props.tasks, (x)=> { return x.state===state.value; })}
                    title={state.name.toUpperCase()}
                    value={state.value}
                    color={state.color}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
  render(){
    return (
      <div>
          { this.renderTasks() }
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    tasks: state.tasks,
    message: state.message
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchTasks, editTask, createTask, deleteTask}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
