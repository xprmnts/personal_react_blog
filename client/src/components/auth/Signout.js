import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
    this.props.history.push("/");
  }
  render() {
    return null;
  }
}

export default connect(null, actions)(Signout);
