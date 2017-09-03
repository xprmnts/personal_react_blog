import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Dashboard extends Component {
  onCreate() {
    this.props.createPostNew(id => {
      this.props.initEditorState();
      this.props.history.push(`/compose/${id}`);
    });
  }
  render() {
    return (
      <div>
        <button
          className="btn btn-dark btn-sm"
          onClick={this.onCreate.bind(this)}
        >
          Create
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.post.workspace
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
