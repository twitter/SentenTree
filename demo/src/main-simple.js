import * as DataService from './DataService.js';

import { SentenTreeBuilder, SentenTreeVis } from '../../src/main.js';

const container = document.querySelector('#vis');
container.innerHTML = 'Loading ...';

DataService.loadFile('data/test_thai.tsv', (error, data) => {
  console.log('data', data);
  console.time('Build model');
  const model = new SentenTreeBuilder()
    .tokenize(text => text.split(' '))
    .transformToken(token => (/score(d|s)?/.test(token) ? 'score' : token))
    .buildModel(data);
  console.timeEnd('Build model');
  console.log(model); 

  container.innerHTML = '';

  new SentenTreeVis(container)
    .data(model.getRenderedGraphs(10))
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
