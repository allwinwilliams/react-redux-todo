import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchTasks, fetchTasks} from '../../actions';
import {reduxForm, Field} from 'redux-form';
import _ from 'lodash';

import './NewTaskButton.css';

class SearchForm extends Component{

  onSearchSubmit(values){
    console.log("search");
    this.props.fetchTasks();
    if(!_.isUndefined(values.q)){
      this.props.searchTasks(values.q);
    }
  }
  renderSearchField(field){
    return(
      <input
        className="form-control w-75  mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        {...field.input}
        />
    );
  }
  render(){
    const {handleSubmit}=this.props;
    return (
      <div>
        <form className="form-inline mx-3" onSubmit={handleSubmit(this.onSearchSubmit.bind(this))}>
          <Field
            name="q"
            component={this.renderSearchField}
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({searchTasks, fetchTasks}, dispatch)
}

const SearchComponent=reduxForm({
  form: 'SeachForm', keepDirtyOnReinitialize: true,  enableReinitialize: true
})(SearchForm)

export default connect(null, mapDispatchToProps)(SearchComponent);
