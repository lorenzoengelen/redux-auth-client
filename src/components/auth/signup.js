import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const rederInput = field => {
  return (
    <div>
      <input className='form-control' {...field.input} type={field.type} />
      {field.meta.touched &&
        field.meta.error &&
        <div className='error'>{field.meta.error}</div>}
    </div>
  );
};

class Signup extends Component {
  handleFormSubmit(formProps) {
    // call actions creator to sign up the user
    this.props.signupUser(formProps);
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Error!</strong> {this.props.errorMessage}
        </div>
      );
    }
  };

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className='form-group'>
          <label>Email:</label>
          <Field
            name='email'
            component={rederInput}
            type='text' />
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <Field
            name='password'
            component={rederInput}
            type='password' />
        </fieldset>
        <fieldset className='form-group'>
          <label>Confirm Password:</label>
          <Field
            name='passwordConfirm'
            component={rederInput}
            type='password' />
        </fieldset>
        <button action='submit' className='btn btn-primary'>Sign up</button>
        {this.renderAlert()}
      </form>
    );
  };
};

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'signup',
    validate
  })(Signup)
);