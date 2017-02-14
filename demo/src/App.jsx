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
        <select
          className="form-control"
          name="" id=""
          value={this.state.dataset}
          onChange={e => this.changeDataset(e.target.value)}
        >
          {DATASETS.map((dataset, i) =>
            <option key={dataset.file} value={i}>
              {dataset.file}
            </option>
          )}
        </select>
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

