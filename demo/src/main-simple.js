import { tsv } from 'd3-request';
import { SentenTreeBuilder, SentenTreeVis, tokenizer } from '../../src/main.js';

const container = document.querySelector('#vis');
container.innerHTML = 'Loading ...';

tsv('data/demo.tsv', (error, rawdata) => {
  const data = rawdata.map(d => Object.assign({}, d, { count: +d.count }));
  console.time('Build model');
  const model = new SentenTreeBuilder()
    .tokenize(tokenizer.tokenizeBySpace)
    .transformToken(token => (/score(d|s)?/.test(token) ? 'score' : token))
    .buildModel(data);
  console.timeEnd('Build model');

  container.innerHTML = '';

  new SentenTreeVis(container)
    .data(model.getRenderedGraphs(5))
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
