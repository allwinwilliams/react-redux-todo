import React, { Component } from 'react';
import TaskList from '../../components/TaskList/TaskList';
import { fetchTasks, editTask, deleteTask, createTask } from '../../actions/index';
import _ from 'lodash';
import {STATES} from '../../actions/types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Tasks extends Component{

  constructor(props){
    super(props);
    this.state={
      tasks: this.props.tasks
    }
  }

  componentDidMount(){
      this.props.fetchTasks();
      this.setState((prevState)=>{
        return{
          tasks: this.props.tasks
        }
      })
  }

  renderTasks(){
    if((!this.props.tasks[0])) return (
      <div className="text-center mt-5">
        Loading...
      </div>
    );
    return(
      <div className="container-fluid h-100">
        <div className="row h-100">
          {
            _.map(STATES, (state)=>{
              return(
                <div className="col px-0"
                    key={state.value}
                >
                  <TaskList
                    tasks={_.filter(this.props.tasks, (x)=> { return x.state==state.value; })}
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
    tasks: state.tasks
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchTasks, editTask, createTask, deleteTask}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
