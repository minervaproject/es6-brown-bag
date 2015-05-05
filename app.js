import _ from "underscore";
import React from "react";

import { Block, Flex } from "./components/layout";
import AceEditor from "./components/ace_editor";
import examples from "./examples";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsCode: "",
      sourceMaps: true,
      autoRun: false,
      error: null,
      demo: ""
    };

    this.runCount = 0;

    this.handleSelectDemoChange = this.handleSelectDemoChange.bind(this);
    this.handleAutoRunChange = this.handleAutoRunChange.bind(this);
    this.handleSourceMapChange = this.handleSourceMapChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleLoadDemoClick = this.handleLoadDemoClick.bind(this);
    this.handleRunCodeClick = this.handleRunCodeClick.bind(this);
    this.debouncedDisplayErrors = _.debounce(this.displayErrors, 1000);
    this.debouncedAutoRunCode = _.debounce(this.autoRunCode, 1000);
  }

  componentWillMount() {
    const savedCode = window.localStorage.getItem("es6-brownbag-saved-code");
    if (savedCode) {
      this.setState({jsCode: savedCode});
      setTimeout(this.displayErrors.bind(this), 0);
    }
  }

  componentDidMount() {
    const editor = this.refs.editor.editor;
    editor.commands.addCommand({
      name: "Run Code",
      bindKey: { mac: "Command-Enter", win: "Ctrl-Enter" },
      exec: (editor) => {
        this.handleRunCodeClick();
      }
    });
  }

  render() {
    const topDivStyle = {
      padding: 10
    };

    return (
      <Flex style={{width: "100%", height: "100%"}} direction="column">
        <Flex>
          <Block style={topDivStyle}>
            Load:
            {" "}<select value={this.state.demo} onChange={this.handleSelectDemoChange}>
            <option value="">Select an Example to Load</option>
            {Object.keys(examples).map((key) => {
              return <option value={key} key={key}>{examples[key]}</option>;
            })}
            </select>{" "}
            <button onClick={this.handleLoadDemoClick} disabled={!this.state.demo}>Go</button>
          </Block>
          <Block style={topDivStyle}>
            <label>
              <input type="checkbox" checked={this.state.autoRun} onChange={this.handleAutoRunChange} /> Auto-Run on Change
            </label>
          </Block>
          <Block style={topDivStyle}>
            <label>
              <input type="checkbox" checked={this.state.sourceMaps} onChange={this.handleSourceMapChange} /> Source Maps
            </label>
          </Block>
          <Block style={topDivStyle}>
            <button onClick={this.handleRunCodeClick}>Run</button>
          </Block>
        </Flex>
        <AceEditor ref="editor" mode="javascript" theme="github" name="es6-editor" width="100%" height="100%"
                   value={this.state.jsCode} onChange={this.handleCodeChange} />
        <Block style={{height: 50, padding: 10, color: "red"}}>
          {this.state.error}
        </Block>
      </Flex>
    );
  }

  handleSelectDemoChange(e) {
    this.setState({demo: e.target.value});
  }

  handleLoadDemoClick() {
    if (this.state.demo) {
      const demoName = examples[this.state.demo];
      const sure = confirm(`Are you sure you want to replace the current code with the demo ${demoName}?`);
      if (sure) {
        this.loadDemo(this.state.demo);
      }
    }
  }

  handleAutoRunChange(e) {
    this.setState({autoRun: e.target.checked});
  }

  handleSourceMapChange(e) {
    this.setState({sourceMaps: e.target.checked});
  }

  handleCodeChange(code) {
    this.setState({jsCode: code});
    this.debouncedDisplayErrors();
    window.localStorage.setItem("es6-brownbag-saved-code", code);

    if (this.state.autoRun) {
      this.debouncedAutoRunCode();
    }
  }

  compileCode(code) {
    try {
      const js = babel.transform(this.state.jsCode, {
        ast: false,
        filename: "repl-" + this.runCount,
        sourceMaps: this.state.sourceMaps ? "inline" : false
      });
      return { code: js.code, error: null };
    } catch (e) {
      return { code: null, error: e.message };
    }
  }

  displayErrors() {
    const { code, error } = this.compileCode(this.state.jsCode);
    this.setState({ error });
  }

  handleRunCodeClick() {
    this.runCode();
  }

  autoRunCode() {
    this.runCode();
  }

  runCode() {
    this.runCount++;
    const { code, error } = this.compileCode(this.state.jsCode);
    if (error) {
      this.setState({ error });
    } else if (code) {
      eval(code);
    }
  }

  loadDemo(fileName) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/examples/${fileName}`);
    xhr.overrideMimeType('text/plain; charset=utf-8');

    xhr.onreadystatechange = (e) => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        this.setState({jsCode: e.target.responseText});
      }
    };

    xhr.send();
  }
}

React.render(<App />, document.getElementById("app"));
