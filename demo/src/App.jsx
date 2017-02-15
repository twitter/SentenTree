import React, { PropTypes } from 'react';
import { SentenTreeModel, SentenTreeVis } from '../../src/main.js';

import { DATASETS } from './datasets.js';
import { text as d3Text } from 'd3-request';
import { tsvParseRows } from 'd3-dsv';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: 0,
    };
  }

  componentDidMount() {
    loadFile(DATASETS[this.state.dataset].file);
  }

  changeDataset(value) {
    this.setState({
      dataset: value
    });
    loadFile(DATASETS[value].file);
  }

  render() {
    const classes = ['App'];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div className={classes.join(' ')}>
        <nav className="navbar navbar-default navbar-fixed-top">
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
        <div className="container content">
          <div className="page-header">
            <h1>SentenTree</h1>
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
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;



function loadFile(file) {
  const container = document.querySelector('#vis');
  container.innerHTML = 'Loading ...';

  d3Text('data/' + file, (error, data) => {
    const rows = tsvParseRows(data)
      .map(([id, text, count]) => ({
        id,
        text: text.replace(/https?\:\/\/[A-Za-z0-9.\/]+/gi, '[url]'),
        cnt: +count
      }));
    console.log('data', rows);

    const model = new SentenTreeModel(rows);
    console.log('model', model);

    const graph = model.graphs[0].toRenderedGraph();
    console.log('graph', graph);

    container.innerHTML = '';

    model.graphs
      .slice(0,3)
      .forEach(rawGraph => {
        const graph = rawGraph.toRenderedGraph();
        const div = document.createElement('div');
        container.appendChild(div);
        const chart = new SentenTreeVis(div)
          .data(graph)
          .on('layoutEnd', () => {
            chart.fitComponentToContent();
          });
      })
  });
}

