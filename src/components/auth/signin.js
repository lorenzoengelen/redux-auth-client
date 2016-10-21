import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const rederInput = field => {
  return (
    <div>
      <input className='form-control' {...field.input} type={field.type} />
    </div>
  );
};

class Signin extends Component {
	handleFormSubmit({email, password}) {
    this.props.signinUser({email, password});
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
					<label>Email</label>
					<Field 
            name='email'
            component={rederInput}
            type='text' />
				</fieldset>
				<fieldset className='form-group'>
					<label>Password</label>
          <Field 
            name='password'
            component={rederInput}
            type='password' />
				</fieldset>
        {this.renderAlert()}
				<button action='submit' className='btn btn-primary'>Sign in</button>
			</form>
		);
	};
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'signin'
  })(Signin)
);