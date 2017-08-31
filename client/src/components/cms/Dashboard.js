import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Dashboard extends Component {
  render() {
    return <button>Create</button>;
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Dashboard);
