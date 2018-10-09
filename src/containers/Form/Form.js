import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field, initialize } from 'redux-form';
import {bindActionCreators} from 'redux';
import {createTask, editTask, fetchTask, deleteTask } from '../../actions';

import _ from 'lodash';

import './Form.css';
class Form extends Component{
  constructor(props) {
    super(props);
    this.props.fetchTask(this.props.task.key);
  }

  componentDidMount(){
    const initData = {
      "title": this.props.task.title,
      "description": this.props.task.description,
      "dueDate": this.props.task.dueDate,
      "state": this.props.task.state,
      "member": this.props.task.member,
      "tags": _.join(this.props.task.tags, ", ")
    };
    this.props.dispatch(initialize('TaskForm', initData));
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.task.key){
        this.props.fetchTask(this.props.task.key);
    }
  }

  onDeleteClick(){

      if(!this.props.new && window.confirm("Are you sure want to delete this task?")){
        window.$('#formModal').modal('hide');
        this.props.deleteTask(this.props.task.key);
      }
  }
  onFormSubmit(values) {
    let keys=_.keys(values)
    let unkeys=_.filter(keys, (key)=>{
        if(_.isUndefined(values[key]))
                  return key
          });
    let task=_.omit(values,unkeys);
    if(!_.isEmpty(task.tags)){
      task.tags=_.words(task.tags);
    }

    if(this.props.new){
      this.props.createTask(task);
      window.$('#formModal').modal('hide');
    }
    else{
      this.props.editTask(this.props.task.key, task);
      window.$('#formModal').modal('hide');
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
        className="form-control"
        {...field.input}
        type={field.type}
        placeholder={field.placeholder}
      />
      </div>
    )
  }
  renderTitle(title){
    return(
      <div className="form-group">
        <label>
          {title.label}
        </label>
        <h2>
          <input
            className={`form-control form-control-lg ${(title.meta.touched && title.meta.error)?"is-invalid":""}`}
            {...title.input}
            type={title.type}
            placeholder="Title of the new task"
          />
        </h2>
        <div className="error text-danger text-sm">
          {(title.meta.touched && title.meta.error) ?title.meta.error :""}
        </div>
      </div>
    )
  }
  renderDescription(desc){
    return(
      <div className="form-group">
      <label>
        {desc.label}
      </label>
      <textarea rows="3"
        className="form-control"
        {...desc.input}
        type={desc.type}
        placeholder="Detailed description of the task"
      >
      </textarea>
      </div>
    )
  }
  renderState(state){
    return(
      <div className="form-group">
        <label>
          {state.label}
        </label>
        <select className={`form-control ${(state.meta.touched && state.meta.error)?"is-invalid":""}`} {...state.input}>
          <option disable="true">Select a State</option>
          <option value="0">TO BE DONE</option>
          <option value="1">DOING</option>
          <option value="2">DONE</option>
        </select>
        <div className="error text-danger text-sm">
          {(state.meta.touched && state.meta.error) ?state.meta.error:""}
        </div>
      </div>
    )
  }
  renderTags(field){
    return(
      <div>
      <label>
        {field.label}
      </label>
      <input
        className="form-control"
        {...field.input}
        type={field.type}
        placeholder="Tags (seperated by Space or Comma)"
      />
      </div>
    )
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
            placeholder="Name of the member..."
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
          component={this.renderTags}
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
                      <ul className="list-inline row w-100">
                        <li className="list-inline-item  col-md-2 mr-auto ">
                          <button
                            className={`btn btn-danger text-center mr-5 w-100 ${(this.props.new)?"disabled":""}`}
                            type="button"
                            onClick={this.onDeleteClick.bind(this)}
                          >
                            Delete
                          </button>
                        </li>
                        <li className="list-inline-item col">
                          <button
                            className="btn btn-primary text-center w-100"
                            type="submit"
                          >
                            Save
                          </button>
                        </li>
                      </ul>
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
    initialValues:  _.find(state.tasks, (task)=> {return task.key===state.activeTaskKey}),
    activeTaskKey: state.activeTaskKey
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({editTask, createTask, fetchTask, deleteTask}, dispatch)
}

function formValidate(values){
   const error={};
   if(!values.title){
     error.title="Please, enter a title!!";
   }
   if(!values.state){
     error.state="Please, select a state!!";
   }
   return error;
 }

let FormComponent=reduxForm({
   form: 'TaskForm', validate: formValidate, keepDirtyOnReinitialize: true,  enableReinitialize: true
})(Form);

export default connect( mapStateToProps, mapDispatchToProps)(FormComponent);
