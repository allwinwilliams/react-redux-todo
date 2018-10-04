import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {bindActionCreators} from 'redux';
import {createTask, editTask} from '../../actions';

import _ from 'lodash';

class Form extends Component{
  constructor(props) {
    super(props);
    this.state = {task: this.props, new: this.props.new};
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  componentDidMount(props){
    this.setState((state) => {
      return{
        task: this.props, new: this.props.new
      }
    });
  }
  static getDerivedStateFromProps(props, current_state) {
      if (current_state.task !== props.activeTask) {
        return {
          task: props,
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
    return(
      <div>
        <label>{field.label}</label>
        <input
          type="text"
          value={`${field.fieldValue}`}
          {...field.input}
        />
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
      console.log("Create post");
      this.props.createTask(values);
    }
    else{
      console.log("Edit post");
      this.props.EditTask(values, this.state.task.id);
    }
    values="";
  }
  render(){
    console.log("FORM prop activetask");
    const task=this.props;
    const newTask=this.props.new;
    const {handleSubmit}=this.props;
    console.log(task);
    console.log(_.isUndefined(task.title));
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
            value={this.fieldEntry(task.title)}
            component={this.renderField}
          />

          <Field
            name="description"
            label="Description"
            value={this.fieldEntry(task.description)}
            component={this.renderField}
          />

          <Field
            name="state"
            label="State"
            value={this.fieldEntry(task.state)}
            component={this.renderField}
          />

          <Field
            name="dueDate"
            label="Due Date"
            value={this.fieldEntry(task.dueDate)}
            component={this.renderField}
          />

          <Field
            name="member"
            label="Member"
            value={this.fieldEntry(task.member)}
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

function mapStateToProps(state){
  return state => state;
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({editTask, createTask}, dispatch);
}

export default reduxForm({
  form: 'TaskForm'
})(connect( mapStateToProps, mapDispatchToProps)(Form));
