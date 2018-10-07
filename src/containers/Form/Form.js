import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field, initialize } from 'redux-form';
import {bindActionCreators} from 'redux';
import {createTask, editTask, fetchTask} from '../../actions';

import _ from 'lodash';

class Form extends Component{
  constructor(props) {
    super(props);
    console.log("FORM PROPS");
    console.log(this.props);
    this.props.fetchTask(this.props.task.key);
    console.log("FORM PROPS");
    console.log(this.props.task);
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
    console.log("FORM PROPS");
    console.log(this.props);
    this.props.initialize(initData);
    this.props.dispatch(initialize('TaskForm', initData));
  }
  componentDidUpdate(prevProps, prevState){
    console.log("FORM PROPS");
    console.log(this.props);
    console.log("STATE")
    console.log("MOUNT");
    if(this.props.task.key){
        this.props.fetchTask(this.props.task.key);
    }

  }

 fieldEntry(entry){
    if(this.props.new) return "";
    return `${(_.isUndefined(entry))?"":entry}`;
  }

  renderField(field){
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

    console.log("ONFORMSUBMIT");
    console.log(values);
    if(this.props.new){
      console.log("Createtask");
      this.props.createTask(values);
    }
    else{
      console.log("Edit post ID");
      console.log(this.props.task.key);
      this.props.editTask(this.props.task.key,values);
    }

  }
  render(){

    const {handleSubmit}=this.props;
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
            type="text"
            fieldValue={this.fieldEntry(task.title)}
            component={this.renderField}
          />

          <Field
            name="description"
            label="Description"
            type="text"
            fieldValue={this.fieldEntry(task.description)}
            component={this.renderField}
          />

          <Field
            name="state"
            label="State"
            type="number"
            fieldValue={this.fieldEntry(task.state)}
            component={this.renderField}
          />

          <Field
            name="dueDate"
            label="Due Date"
            type="date"
            fieldValue={this.fieldEntry(task.dueDate)}
            component={this.renderField}
          />

          <Field
            name="member"
            label="Member"
            type="text"
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
    initialValues:  _.find(state.tasks, (task)=> {return task.key==state.activeTaskKey})
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({editTask, createTask, fetchTask}, dispatch)
}

let FormComponent=reduxForm({ form: 'TaskForm', keepDirtyOnReinitialize: true,  enableReinitialize: true})(Form);

export default connect( mapStateToProps, mapDispatchToProps)(FormComponent);
