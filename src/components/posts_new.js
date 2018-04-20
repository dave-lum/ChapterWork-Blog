import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {createPost} from '../actions';

const TITLE = "title";
const CONTENT = "content";
const CATEGORIES = "categories";

class PostsNew extends Component {
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }
  
  render() {
    const {handleSubmit} = this.props;
    
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name={TITLE}
          label="Title"
          component={this.renderField}
          />
        <Field
          name={CONTENT}
          label="Content"
          component={this.renderField}
          />
        <Field
          name={CATEGORIES}
          label="Categories"
          component={this.renderField}
          />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/">
          Cancel
        </Link>
      </form>
    );
  }

  renderField(field) {
    const {meta: {touched, error}} = field;
    const fieldClassName = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={fieldClassName}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }
}

function validate(values) {
  //console.log(values);
  const errors = {};

  if (!values[TITLE]) {
    errors[TITLE] = "A title is required";
  }
  if (!values[CATEGORIES]) {
    errors[CATEGORIES] = "Some categories are required";
  }
  if (!values[CONTENT]) {
    errors[CONTENT] = "Blog content is required";
  }
  
  return errors;
}

// export default reduxForm({
//   form: 'PostsNewForm',
//   validate  // ES6 syntax, same as "validate: validate"
// })(PostsNew);


const form = reduxForm({
  form: 'PostsNewForm',
  validate  // ES6 syntax, same as "validate: validate"
})(PostsNew);

export default connect(null, {createPost})(form);
