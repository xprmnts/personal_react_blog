// import React, { Component } from "react";
// // import ReactDOM from "react-dom";
// import {
//   Editor,
//   EditorState,
//   RichUtils,
//   convertToRaw,
//   convertFromRaw
// } from "draft-js";

// class PostComponser extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     const content = window.localStorage.getItem("content");

//     if (content) {
//       this.state.editorState = EditorState.createWithContent(
//         convertFromRaw(JSON.parse(content))
//       );
//     } else {
//       this.state.editorState = EditorState.createEmpty();
//     }

//     this.onChange = editorState => {
//       this.setState({ editorState });
//       const contentState = editorState.getCurrentContent();
//       this.saveContent(contentState);
//     };
//     this.handleKeyCommand = this._handleKeyCommand.bind(this);
//     this.toggleBlockType = type => this._toggleBlockType(type);
//   }

//   _handleKeyCommand(command) {
//     const newState = RichUtils.handleKeyCommand(
//       this.state.editorState,
//       command
//     );
//     if (newState) {
//       this.onChange(newState);
//       return "handled";
//     }
//     return "not-handled";
//   }

//   saveContent = content => {
//     window.localStorage.setItem(
//       "content",
//       JSON.stringify(convertToRaw(content))
//     );
//   };

//   _toggleBlockType(blockType) {
//     this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
//   }

//   render() {
//     const { editorState } = this.state;
//     // If the user changes block type before entering any text, we can
//     // either style the placeholder or hide it. Let's just hide it now.
//     let className = "RichEditor-editor";
//     var contentState = editorState.getCurrentContent();
//     if (!contentState.hasText()) {
//       if (
//         contentState
//           .getBlockMap()
//           .first()
//           .getType() !== "unstyled"
//       ) {
//         className += " RichEditor-hidePlaceholder";
//       }
//     }

//     return (
//       <div>
//         <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
//           <div className="container">
//             <div className="RichEditor-root">
//               <BlockStyleControls
//                 editorState={editorState}
//                 onToggle={this.toggleBlockType}
//               />
//             </div>
//           </div>
//         </nav>
//         <div className="container">
//           <div className="editor">
//             <div className={className}>
//               <Editor
//                 blockStyleFn={getBlockStyle}
//                 editorState={editorState}
//                 handleKeyCommand={this.handleKeyCommand}
//                 onChange={this.onChange}
//                 onTab={this.onTab}
//                 spellCheck={true}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// function getBlockStyle(block) {
//   switch (block.getType()) {
//     case "blockquote":
//       return "RichEditor-blockquote";
//     default:
//       return null;
//   }
// }
// class StyleButton extends React.Component {
//   constructor() {
//     super();
//     this.onToggle = e => {
//       e.preventDefault();
//       this.props.onToggle(this.props.style);
//     };
//   }
//   render() {
//     let className = "RichEditor-styleButton";
//     if (this.props.active) {
//       className += " RichEditor-activeButton";
//     }
//     return (
//       <span className={className} onMouseDown={this.onToggle}>
//         {this.props.label}
//       </span>
//     );
//   }
// }
// const BLOCK_TYPES = [
//   { label: "H1", style: "header-one" },
//   { label: "H2", style: "header-two" },
//   { label: "H3", style: "header-three" }
// ];
// const BlockStyleControls = props => {
//   const { editorState } = props;
//   const selection = editorState.getSelection();
//   const blockType = editorState
//     .getCurrentContent()
//     .getBlockForKey(selection.getStartKey())
//     .getType();
//   return (
//     <div className="RichEditor-controls">
//       {BLOCK_TYPES.map(type => (
//         <StyleButton
//           key={type.label}
//           active={type.style === blockType}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       ))}
//     </div>
//   );
// };

// export default PostComponser;
