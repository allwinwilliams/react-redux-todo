import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field, initialize } from 'redux-form';
import {bindActionCreators} from 'redux';
import {createTask, editTask, fetchTask, deleteTask } from '../../actions';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import _ from 'lodash';

import './Form.css';
class Form extends Component{
  constructor(props) {
    super(props);
    this.props.fetchTask(this.props.task.key);
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

    this.props.initialize(initData);
    this.props.dispatch(initialize('TaskForm', initData));
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.task.key){
        this.props.fetchTask(this.props.task.key);
    }

  }

  onDeleteClick(event){
      event.preventDefault();
      event.stopPropagation();
      console.log("delete");
      // console.log(ReactDOM.findDOMNode(this).id);
      // ReactDOM.findDOMNode(this).addClass('hide');
      // // this.refs.formModal.modal('hide');
      // this.props.deleteTask(this.props.activeTaskKey);

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
        className="form-control"
        {...field.input}
        type={field.type}
      />
      {field.touched && field.error && <div className="error">{field.error}</div>}
      </div>
    )
  }
  renderTitle(title){
    return(
      <div className="form-group">
      <label>
        {title.label}
      </label>
      <h2><input
        className="form-control form-control-lg"
        {...title.input}
        type={title.type}
        placeholder="Title of the new task"
      /></h2>
      {title.touched && title.error && <div className="error">{title.error}</div>}
      </div>
    )
  }
  renderDescription(desc){
    return(
      <div className="form-group">
      <label>
        {desc.label}
      </label>
      <textarea className="form-control" rows="3"
        className="form-control"
        {...desc.input}
        type={desc.type}
        placeholder="Detailed description of the task"
      >
      </textarea>
      {desc.touched && desc.error && <div className="error">{desc.error}</div>}
      </div>
    )
  }
  renderState(state){
    return(
      <div className="form-group">
      <label>
        {state.label}
      </label>
      <select className="form-control" {...state.input}>
        <option value="0">TO BE DONE</option>
        <option value="1">DOING</option>
        <option value="2">DONE</option>
      </select>
      {state.touched && state.error && <div className="error">{state.error}</div>}
      </div>
    )
  }
  onFormSubmit(values) {
    if(this.props.new){
      this.props.createTask(values);
    }
    else{
      this.props.editTask(this.props.task.key,values);
    }
  }

  renderLeftFields(){
    const task=this.props.task;

    return (
      <div className="container">
          <Field
            name="title"
            label="Title"
            type="text"
            fieldValue={this.fieldEntry(task.title)}
            component={this.renderTitle}
          />

          <Field
            name="member"
            label="Member"
            type="text"
            fieldValue={this.fieldEntry(task.member)}
            component={this.renderField}
          />

          <Field
            name="description"
            label="Description"
            type="textarea"
            fieldValue={this.fieldEntry(task.description)}
            component={this.renderDescription}
          />

      </div>
    );
  }
  renderRightFields(){
    const task=this.props.task;
    return(
      <div>
        <Field
          name="state"
          label="State"
          type="number"
          fieldValue={this.fieldEntry(task.state)}
          component={this.renderState}
        />
        <Field
          name="dueDate"
          label="Due Date"
          type="date"
          fieldValue={this.fieldEntry(task.dueDate)}
          component={this.renderField}
        />
        <Field
          name="tags"
          label="Tags"
          type="text"
          fieldValue={this.fieldEntry(task.dueDate)}
          component={this.renderField}
        />
      </div>
    );
  }
  render(){
    const {handleSubmit}=this.props;
    const task=this.props.task;
    return(
    <div className="modal fade" id="formModal" tabIndex="-1" role="dialog" aria-labelledby="formModalLabel" aria-hidden="true">
      <div className="modal-dialog form-modal w-75 pt-5" role="document" style={{maxWidth: "100%"}}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {(this.props.new)?"New Task":task.title}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
                <div className="modal-body">
                  <div className="row">
                      <div className="col-md-8">
                          {this.renderLeftFields()}
                      </div>

                      <div className="col-md-4">
                          {this.renderRightFields()}
                      </div>
                    </div>
                    <div className="modal-footer">
                        <button
                          className="btn btn-primary text-center w-100"
                          type="submit"
                        >
                          SAVE
                        </button>
                    </div>
                </div>
            </form>
          </div>

      </div>
    </div>
    );
  }
}

function mapStateToProps(state, initProps){
  return {
    initialValues:  _.find(state.tasks, (task)=> {return task.key==state.activeTaskKey}),
    activeTaskKey: state.activeTaskKey
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({editTask, createTask, fetchTask, deleteTask}, dispatch)
}

let FormComponent=reduxForm({ form: 'TaskForm', keepDirtyOnReinitialize: true,  enableReinitialize: true})(Form);

export default connect( mapStateToProps, mapDispatchToProps)(FormComponent);
