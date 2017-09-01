import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Dashboard extends Component {
  onCreate() {
    this.props.createPost(post => {
      if (post._id) {
        this.props.history.push(`/cms/editor/${post._id}`);
        console.log(this.state);
      }
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
  return { initialized: state.post.initialized };
}

export default connect(mapStateToProps, actions)(Dashboard);
