import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Register extends Component {
  renderField({ input, label, type, meta: { touched, error } }) {
    let fieldClass;

    if (!touched) {
      fieldClass = "form-control form-control-sm";
    } else if (error && touched) {
      fieldClass = "form-control form-control-sm is-invalid";
    } else {
      fieldClass = "form-control form-control-sm is-valid";
    }
    return (
      <div className="form-group">
        <input
          className={fieldClass}
          type={type}
          placeholder={label}
          {...input}
        />
        {touched ? <div className="invalid-feedback">{error}</div> : ""}
      </div>
    );
  }

  onFormSubmit(values) {
    this.props.registerUser(values, success => {
      if (success) {
        this.props.history.push("/dash");
      }
    });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger text-center alert-danger-sm">
          {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container mt-5">
        <div className="col-sm-8 m-auto">
          <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
            <Field
              label="Username"
              name="username"
              type="text"
              component={this.renderField}
            />
            <Field
              label="Email"
              name="email"
              type="text"
              component={this.renderField}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              component={this.renderField}
            />
            <Field
              label="Confirm Password"
              name="confirmation"
              type="password"
              component={this.renderField}
            />
            <Field
              label="Passphrase"
              name="passphrase"
              type="password"
              component={this.renderField}
            />
            {this.renderAlert()}
            <button type="submit" className="btn btn-dark btn-sm btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!values.email) {
    errors.email = "Please enter an email";
  }

  if (!values.username) {
    errors.username = "Please enter an username";
  }

  if (!values.passphrase) {
    errors.passphrase = "Please enter your passphrase";
  }

  if (!values.confirmation) {
    errors.confirmation = "Please enter an confirmation password";
  }

  if (!values.password) {
    errors.password = "Please enter a password";
  }

  if (values.password && values.password.length < 8) {
    errors.password = "Your password needs to be at least 8 chars long";
  }

  if (values.password !== values.confirmation && values.confirmation) {
    errors.confirmation = "passwords must match";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// Wrap Signin with redux Form
const reduxFormRegister = reduxForm({
  validate,
  form: "register"
})(Register);

export default connect(mapStateToProps, actions)(reduxFormRegister);
