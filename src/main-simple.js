import * as DataService from './DataService.js';

import { SentenTreeModel, SentenTreeVis } from '../../src/main.js';

const container = document.querySelector('#vis');
container.innerHTML = 'Loading ...';

DataService.loadFile('data/goal.tsv', (error, data) => {
  console.time('Build tree');
  const model = new SentenTreeModel(data);
  console.timeEnd('Build tree');

  container.innerHTML = '';

  new SentenTreeVis(container)
    .data(model.getRenderedGraphs(3))
    .on('nodeClick', node => {
      console.log('node', node);
    })
    // .on('nodeMouseenter', node => {
    //   // Do something
    // })
    // .on('nodeMousemove', node => {
    //   // Do something
    // })
    // .on('nodeMouseleave', () => {
    //   // Do something
    // });
});