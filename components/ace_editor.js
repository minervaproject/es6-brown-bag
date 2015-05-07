import React from "react";
import ace from "brace";

import _js from "brace/mode/javascript";
import _github from "brace/theme/github";
import _languageTools from "brace/ext/language_tools";

import { Flex } from "./layout";

class AceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    const style = this.props.style || {};

    return (
      <Flex basis="100%" id={this.props.name} onChange={this.onChange} style={style}></Flex>
    );
  }

  onChange(e) {
    const value = this.editor.getValue();
    this.props.onChange(value);
  }

  componentDidMount() {
    this.editor = ace.edit(this.props.name);
    this.editor.$blockScrolling = Infinity;
    this.editor.setOption('enableBasicAutocompletion', true);
    this.editor.getSession().setMode('ace/mode/' + this.props.mode);
    this.editor.setTheme('ace/theme/' + this.props.theme);
    this.editor.setFontSize(this.props.fontSize);
    this.editor.on('change', this.onChange);
    this.editor.setValue(this.props.value, 1);
    this.editor.renderer.setShowGutter(this.props.showGutter);
    this.editor.setOption('maxLines', this.props.maxLines);
    this.editor.setOption('readOnly', this.props.readOnly);
    this.editor.setOption('highlightActiveLine', this.props.highlightActiveLine);
    this.editor.getSession().setUseSoftTabs(true);
    this.editor.getSession().setTabSize(2);
    this.editor.setShowPrintMargin(this.props.setShowPrintMargin);
  }

  componentWillReceiveProps(nextProps) {
    if (this.editor.getValue() !== nextProps.value) {
      this.editor.setValue(nextProps.value, 1);
    }
  }

  componentWillUnmount() {
    this.editor.destroy();
  }
}

AceEditor.defaultProps = {
  name:                'brace-editor',
  mode:                '',
  theme:               '',
  height:              '500px',
  width:               '500px',
  value:               '',
  fontSize:            12,
  showGutter:          true,
  onChange:            () => null,
  onLoad:              () => null,
  maxLines:            null,
  readOnly:            false,
  highlightActiveLine: true,
  showPrintMargin:     true
};

export default AceEditor;
