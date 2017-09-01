import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Dashboard extends Component {
  onCreate() {
    this.props.createPost(() => {
      console.log("Post Created");
      this.props.initNewEditor();
      const { _id } = this.props.workspace;
      if (_id) {
        this.props.history.push(`/cms/compose/${_id}`);
      }
    });
  }
  onEdit() {}
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
