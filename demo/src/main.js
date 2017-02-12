import { SentenTreeModel, SentenTreeVis } from '../../src/main.js';
import { text as d3Text } from 'd3-request';
import { tsvParseRows } from 'd3-dsv';

d3Text('data/goal1.tsv', (error, data) => {
  const rows = tsvParseRows(data)
    .map(([id, text, count]) => ({id, text, cnt: +count}));
  console.log('data', rows);

  const model = new SentenTreeModel(rows);
  console.log('model', model);

  const graph = model.graphs[0].toRenderedGraph();
  console.log('graph', graph);

  const container = document.querySelector('#vis');

  model.graphs
    .slice(0,5)
    .forEach(rawGraph => {
      const graph = rawGraph.toRenderedGraph();
      const div = document.createElement('div');
      container.appendChild(div);
      new SentenTreeVis(div).data(graph);
    })
});