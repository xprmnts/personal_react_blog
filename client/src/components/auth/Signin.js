import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signin extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <input
          className="form-control form-control-sm"
          type={field.type}
          placeholder={field.label}
          {...field.input}
        />
      </div>
    );
  }

  onFormSubmit(values) {
    this.props.signinUser(values, success => {
      if (success) {
        this.props.history.push("/cms");
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
              label="Password"
              name="password"
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

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}
// Wrap Signin with redux Form
const reduxFormSignin = reduxForm({
  form: "signin"
})(Signin);

export default connect(mapStateToProps, actions)(reduxFormSignin);
