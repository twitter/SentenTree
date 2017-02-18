import * as DataService from './DataService.js';
import * as d3 from 'd3-selection';

import React, { PropTypes } from 'react';
import { SentenTreeModel, SentenTreeVis } from '../../src/main.js';

import { DATASETS } from './datasets.js';
import { format } from 'd3-format';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {};

const formatNumber = format(',d');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: 0,
      selectedNode: null,
    };
  }

  componentDidMount() {
    this.loadFile(DATASETS[this.state.dataset].file);
  }

  changeDataset(value) {
    this.setState({
      dataset: value,
      selectedNode: null
    });
    this.loadFile(DATASETS[value].file);
  }

  selectNode(node) {
    const [x, y] = d3.mouse(this.c);
    this.setState({
      selectedNode: node,
      nodeY: y,
      nodeX: x,
    });
  }

  clearNode() {
    this.setState({ selectedNode: null });
  }

  loadFile(file) {
    const container = document.querySelector('#vis');
    container.innerHTML = 'Loading ...';

    DataService.loadFile('data/' + file, (error, data) => {
      console.time('Build tree');
      const model = new SentenTreeModel(data);
      console.timeEnd('Build tree');

      container.innerHTML = '';

      model.getRenderedGraphs(3)
        .forEach((graph, i) => {
          console.time(`Render graph ${i}`);
          const div = document.createElement('div');
          container.appendChild(div);
          const chart = new SentenTreeVis(div)
            .data(graph)
            .on('nodeClick', node => {
              console.log('node', node);
            })
            .on('nodeMouseenter', node => {
              this.selectNode(node);
            })
            .on('nodeMousemove', node => {
              this.selectNode(node);
            })
            .on('nodeMouseleave', node => {
              this.clearNode();
            })
            .on('layoutEnd', () => {
              chart.fitComponentToContent();
              console.timeEnd(`Render graph ${i}`);
            });
        });
    });
  }

  renderSelectedNode() {
    const { selectedNode: node, nodeX, nodeY } = this.state;
    if (node) {
      return (
        <div
          className="popover-content"
          style={{
            top: `${nodeY + 10}px`,
            left: `${nodeX}px`,
          }}
        >
          <div className="popover-inner">
          <div className="content-center">
            <h4>
              {node.data.entity}
              &nbsp;
              <small>({formatNumber(node.data.freq)})</small>
            </h4>
          </div>
          {node.data.topEntries.slice(0,1).map(entry =>
            <div className="mock-tweet">
              <div className="top-remark">
                <i className="glyphicon glyphicon-star"></i> Top entry
              </div>
              {entry.rawText}
              <div className="word-count">
                {formatNumber(entry.count)} occurrences
              </div>
            </div>
          )}
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const classes = ['App'];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div className={classes.join(' ')}>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">SentenTree</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Demo</a></li>
                <li>
                  <a href="http://www.cc.gatech.edu/~stasko/papers/infovis16-sententree.pdf">Paper</a>
                </li>
                <li>
                  <a href="https://github.com/twitter/sententree">Source Code</a>
                </li>
              </ul>
              <div className="navbar-text navbar-star">
                <iframe
                  src="https://ghbtns.com/github-btn.html?user=twitter&repo=SentenTree&type=star&count=true"
                  frameBorder="0"
                  scrolling="0"
                  width="100px"
                  height="20px"
                />
              </div>
            </div>
          </div>
        </nav>
        <div
          className="popover-container"
          ref={c => {this.c = c;}}
        >
          {this.renderSelectedNode()}
        </div>
        <div className="container content">
          <div className="page-header">
            <h1>SentenTree</h1>
            <div className="pull-right">


            </div>
          </div>
          <p className="lead">
            SentenTree is a novel text visualization technique for summarizing
            a collection of social media text, i.e. take thousands or more Tweets
            and summarize what the Tweets are about.
          </p>
          <p>
            Choose from these example datasets and see the visualization below.
          </p>
          <select
            className="form-control"
            name="" id=""
            value={this.state.dataset}
            onChange={e => this.changeDataset(e.target.value)}
          >
            {DATASETS.map((dataset, i) =>
              <option key={dataset.file} value={i}>
                {dataset.name || dataset.file}
              </option>
            )}
          </select>
        </div>
        <div className="container">
          <div className="vis-container">
            <div id="vis"></div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
