import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field, initialize } from 'redux-form';
import {bindActionCreators} from 'redux';
import {createTask, editTask, fetchTask} from '../../actions';

import _ from 'lodash';

class Form extends Component{
  constructor(props) {
    super(props);
    this.props.fetchTask(this.props.task.id);
    console.log("FORM PROPS");
    console.log(this.props.task);
    this.state = {task: this.props.task, new: this.props.new};
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  componentDidMount(){
    const initData = {
      "title": this.props.task.title,
      "description": this.props.task.description,
      "dueDate": this.props.task.dueDate,
      "state": this.props.task.state,
      "member": this.props.task.member
    };

    this.handleInitialize(initData);
    this.props.dispatch(initialize('TaskForm', initData));
  }
  componentDidUpdate(prevProps, prevState){
    if (prevProps.task !== this.props.task) {
      this.setState((state)=>{
        return { task : this.props.task, new: this.props.new}
      });
    }
    console.log("MOUNT");
    if(this.props.task.id){}
        this.props.fetchTask(this.state.task.id);
    console.log("Componenet update PROPS, STATE");
    console.log(this.props.task);
    console.log(this.state.task);

  }
  handleInitialize() {
    const initData = {
      "title": this.props.task.title,
      "description": this.props.task.description,
      "dueDate": this.props.task.dueDate,
      "state": this.props.task.state,
      "member": this.props.task.member
    };
    this.props.initialize(initData);
  }

  static getDerivedStateFromProps(props, current_state) {
      if (current_state.task !== props.activeTask) {
        return {
          task: props.task,
          new: props.new
        }
      }
      return null
    }

 fieldEntry(entry){
    if(this.props.new) return "";
    return `${(_.isUndefined(entry))?"":entry}`;
  }

  renderField(field){
    console.log("FIELD");
    console.log(field);
    return(
      <div>
      <label>
        {field.label}
      </label>
      <input
        {...field.input}

      />
      {field.touched && field.error && <div className="error">{field.error}</div>}
      </div>
    )
  }

  onFormSubmit(values) {
    console.log("form values............");
    console.log(values);
    const task=this.props.activeTask;
    console.log("this.state UPDATED");
    console.log(this.state);
    console.log("ONFORMSUBMIT");
    console.log(values);
    if(this.state.new){
      console.log("Createtask");
      this.props.createTask(values);
    }
    else{
      console.log("Edit post ID");
      console.log(this.state.task.id);
      this.props.editTask(this.state.task.id,values);
    }

  }
  render(){

    const newTask=this.props.new;
    const {handleSubmit }=this.props;
    const task=this.props.task;
    console.log("FORM prop activetask");
    console.log(task);

    return (
      <div>
        <h2>form</h2>
        <p>
          {(this.props.new)?"NEW TASK":task.title}
        </p>
        <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>

          <Field
            name="title"
            label="Title"
            fieldValue={this.fieldEntry(task.title)}
            component={this.renderField}
          />

          <Field
            name="description"
            label="Description"
            fieldValue={this.fieldEntry(task.description)}
            component={this.renderField}
          />

          <Field
            name="state"
            label="State"
            fieldValue={this.fieldEntry(task.state)}
            component={this.renderField}
          />

          <Field
            name="dueDate"
            label="Due Date"
            fieldValue={this.fieldEntry(task.dueDate)}
            component={this.renderField}
          />

          <Field
            name="member"
            label="Member"
            fieldValue={this.fieldEntry(task.member)}
            component={this.renderField}
          />

          <button
            className="btn btn-danger pull-xs-right"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, initProps){
  return {
    task: state.activeTask,
    initialValues: initProps.task
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({editTask, createTask, fetchTask}, dispatch)
}

let FormComponent=reduxForm({ form: 'TaskForm', keepDirtyOnReinitialize: true,  enableReinitialize: true})(Form);

export default connect( mapStateToProps, mapDispatchToProps)(FormComponent);
