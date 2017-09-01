import React, { Component } from "react";
import { EditorState, Editor, convertToRaw } from "draft-js";
import { connect } from "react-redux";
import * as actions from "../../../actions";

class Composer extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const postId = this.props.match.params.id;
      this.props.getOldEditor(postId, () => {
        console.log(this.props.post);
      });
    }
  }
  onChange = editorState => {
    console.log(this.props);
    this.props.updateEditorState(editorState);
    this.saveContent(editorState);
  };

  saveContent = editorState => {
    const postId = this.props.match.params.id;
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    this.props.saveEditorContent(postId, content);
  };

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
  console.log(state);
  return {
    editorState: state.editor.editorState
  };
}

export default connect(mapStateToProps, actions)(Composer);
