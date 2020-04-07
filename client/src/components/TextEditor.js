

// import React from 'react';
// import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw} from 'draft-js';
// import 'draft-js/dist/Draft.css';
// import '../richeditor.css';
// import '../publishedarticle.css';
// import PublicService from '../components/PublicService';


// class TextEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {articleContent: EditorState.createEmpty()};

//     this.service = new PublicService();

//     this.focus = () => this.refs.editor.focus();
//     this.onChange = (articleContent) => {
//       const contentState = articleContent.getCurrentContent();
//       console.log('content state', convertToRaw(contentState));
//       this.setState({articleContent})
//     };

//     this.handleKeyCommand = this._handleKeyCommand.bind(this);
//     this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
//     this.toggleBlockType = this._toggleBlockType.bind(this);
//     this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
//   }

//   _handleKeyCommand(command, articleContent) {
//     const newState = RichUtils.handleKeyCommand(articleContent, command);
//     if (newState) {
//       this.onChange(newState);
//       return true;
//     }
//     return false;
//   }

//   _mapKeyToEditorCommand(e) {
//     if (e.keyCode === 9 /* TAB */) {
//       const newArticleContent = RichUtils.onTab(
//         e,
//         this.state.articleContent,
//         4, /* maxDepth */
//       );
//       if (newArticleContent !== this.state.articleContent) {
//         this.onChange(newArticleContent);
//       }
//       return;
//     }
//     return getDefaultKeyBinding(e);
//   }

//   _toggleBlockType(blockType) {
//     this.onChange(
//       RichUtils.toggleBlockType(
//         this.state.articleContent,
//         blockType
//       )
//     );
//   }

//   _toggleInlineStyle(inlineStyle) {
//     this.onChange(
//       RichUtils.toggleInlineStyle(
//         this.state.articleContent,
//         inlineStyle
//       )
//     );
//   }

//   componentDidMount() {
//     // vérifier if it's there if
//   }

//   render() {
//     const {articleContent} = this.state;

//     // If the user changes block type before entering any text, we can
//     // either style the placeholder or hide it. Let's just hide it now.
//     let className = 'RichEditor-editor';
//     var contentState = articleContent.getCurrentContent();
//     if (!contentState.hasText()) {
//       if (contentState.getBlockMap().first().getType() !== 'unstyled') {
//         className += ' RichEditor-hidePlaceholder';
//       }
//     }

//      console.log("state", this.state);

//      if (!this.state.articleContent) {
//       return (
//         <h3 className="loading">Loading...</h3>
//       );
//     }

//     return (
//       <div className="RichEditor-root">
//         <BlockStyleControls
//           articleContent={articleContent}
//           onToggle={this.toggleBlockType}
//         />
//         <InlineStyleControls
//           articleContent={articleContent}
//           onToggle={this.toggleInlineStyle}
//         />
//         <div className={className} onClick={this.focus}>
//           <Editor
//             blockStyleFn={getBlockStyle}
//             customStyleMap={styleMap}
//             articleContent={articleContent}
//             handleKeyCommand={this.handleKeyCommand}
//             keyBindingFn={this.mapKeyToEditorCommand}
//             onChange={this.onChange}
//             placeholder="Tell a story..."
//             ref="editor"
//             spellCheck={true}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// // Custom overrides for "code" style.
// const styleMap = {
//   CODE: {
//     backgroundColor: 'rgba(0, 0, 0, 0.05)',
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 16,
//     padding: 2,
//   },
// };

// function getBlockStyle(block) {
//   switch (block.getType()) {
//     case 'blockquote': return 'RichEditor-blockquote';
//     default: return null;
//   }
// }

// class StyleButton extends React.Component {
//   constructor() {
//     super();
//     this.onToggle = (e) => {
//       e.preventDefault();
//       this.props.onToggle(this.props.style);
//     };
//   }

//   render() {
//     let className = 'RichEditor-styleButton';
//     if (this.props.active) {
//       className += ' RichEditor-activeButton';
//     }

//     return (
//       <span className={className} onMouseDown={this.onToggle}>
//         {this.props.label}
//       </span>
//     );
//   }
// }

// const BLOCK_TYPES = [
//   {label: 'H1', style: 'header-one'},
//   {label: 'H2', style: 'header-two'},
//   {label: 'H3', style: 'header-three'},
//   {label: 'H4', style: 'header-four'},
//   {label: 'H5', style: 'header-five'},
//   {label: 'H6', style: 'header-six'},
//   {label: 'Blockquote', style: 'blockquote'},
//   {label: 'UL', style: 'unordered-list-item'},
//   {label: 'OL', style: 'ordered-list-item'},
//   {label: 'Code Block', style: 'code-block'},
// ];

// const BlockStyleControls = (props) => {
//   const {articleContent} = props;
//   const selection = articleContent.getSelection();
//   const blockType = articleContent
//     .getCurrentContent()
//     .getBlockForKey(selection.getStartKey())
//     .getType();

//   return (
//     <div className="RichEditor-controls">
//       {BLOCK_TYPES.map((type) =>
//         <StyleButton
//           key={type.label}
//           active={type.style === blockType}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       )}
//     </div>
//   );
// };

// var INLINE_STYLES = [
//   {label: 'Bold', style: 'BOLD'},
//   {label: 'Italic', style: 'ITALIC'},
//   {label: 'Underline', style: 'UNDERLINE'},
//   {label: 'Monospace', style: 'CODE'},
// ];

// const InlineStyleControls = (props) => {
//   const currentStyle = props.articleContent.getCurrentInlineStyle();
  
//   return (
//     <div className="RichEditor-controls">
//       {INLINE_STYLES.map((type) =>
//         <StyleButton
//           key={type.label}
//           active={currentStyle.has(type.style)}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       )}
//     </div>
//   );
// };

// export default TextEditor;