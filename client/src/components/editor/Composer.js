import React, { Component } from "react";
import { EditorState, Editor, convertToRaw } from "draft-js";
import { connect } from "react-redux";
import * as actions from "../../actions";
import debounce from "lodash/debounce";

class Composer extends Component {
  componentDidMount() {
    if (!this.props.workspace) {
      const postId = this.props.match.params.id;
      this.props.getPostMeta(postId, () => {
        this.props.getEditorState(postId);
      });
    }
  }

  onChange = editorState => {
    this.props.updateEditorState(editorState);
    this.saveContent(editorState);
  };

  saveContent = debounce(editorState => {
    const postId = this.props.workspace._id;
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    this.props.saveEditorState(postId, content);
  }, 5000);

  render() {
    if (!this.props.editorState) {
      return <h3 className="loading">Loading...</h3>;
    }
    return (
      <div>
        Hello
        <Editor
          editorState={this.props.editorState}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.post.workspace,
    editorState: state.editor.editorState
  };
}

export default connect(mapStateToProps, actions)(Composer);
