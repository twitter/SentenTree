SentenTree
==========

SentenTree is a novel text visualization technique for summarizing a collection of social media text, i.e. take thousands or more Tweets and summarize what the Tweets are about. The aim of this project was to create a visualization that is cheap to compute but represent the connected thoughts in the words.

![SentenTree example](https://raw.githubusercontent.com/twitter/SentenTree/master/images/SentenTree.png)

[See DEMO](https://twitter.github.io/SentenTree/)

## Author
- Mengdie Hu / [@mengdieh](https://twitter.com/mengdieh)
- Krist Wongsuphasawat / [@kristw](https://twitter.com/kristw)

## Publication

Mengdie Hu, Krist Wongsuphasawat and John Stasko. [Visualizing Social Media Content with SentenTree](http://www.cc.gatech.edu/~stasko/papers/infovis16-sententree.pdf), in IEEE Transactions on Visualization and Computer Graphics 2016.

## Example usage


```html
<div id="vis"></div>
```

```js
d3.tsv('data/goal.tsv', (error, data) => {
  // data format is [{ id, text, count }]

  const model = new SentenTreeBuilder()
    .buildModel(data);

  new SentenTreeVis('#vis')
    // change the number to limit number of output
    .data(model.getRenderedGraphs(3))
    .on('nodeClick', node => {
      console.log('node', node);
    });
```

## For developers

Install dependencies via npm or yarn

```
$ npm install
```

Then run local instance via

```
$ npm run start
```

## License

Copyright 2014 Twitter, Inc. Licensed under the [Apache License Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)