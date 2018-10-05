import React, { Component } from 'react';
import TaskList from '../../components/TaskList/TaskList';
import { fetchTasks, editTask } from '../../actions/index';
import _ from 'lodash';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Tasks extends Component{

  componentDidMount(){
      console.log("TASKS AFTER EDIT");
      console.log(this.props.tasks);
      this.props.fetchTasks();
  }
  renderTasks(){
    return(
      <ul>
        <TaskList
          tasks={_.filter(this.props.tasks, (x)=> { return x.state==0; })}
          title="To be done"
        />
        <TaskList
          tasks={_.filter(this.props.tasks, (x)=> { return x.state==1; })}
          title="Doing"
        />
        <TaskList
          tasks={_.filter(this.props.tasks, (x)=> { return x.state==2; })}
          title="Done"
        />
      </ul>
    );
  }
  render() {
    return (
      <div>
        <h3>To do Items</h3>
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
  return bindActionCreators({fetchTasks, editTask}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
