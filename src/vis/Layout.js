import * as d3 from 'd3';

import { d3adaptor } from 'webcola/WebCola/cola.js';

export default class Layout {
  constructor() {
    this.isRunning = false;
    this.simulation = d3adaptor(d3)
      .flowLayout('x', 5)
      .avoidOverlaps(true)
      // .symmetricDiffLinkLengths(5)
      .jaccardLinkLengths(10)
      .linkDistance(5);

    this.dispatcher = d3.dispatch('start', 'tick', 'end');

    this.simulation.on('start.default', () => {
      this.isRunning = true;
      this.dispatcher.call('start', this);
    });

    this.simulation.on('tick.default', () => {
      this.dispatcher.call('tick', this);
    });

    this.simulation.on('end.default', () => {
      if (this.isRunning) {
        this.isRunning = false;
        this.dispatcher.call('end', this);
      }
    });
  }

  on(...args) {
    this.dispatcher.on(...args);
    return this;
  }

  setGraph(graph) {
    this.simulation
      .nodes(graph.nodes)
      .links(graph.links)
      .constraints(graph.getConstraints());

    return this;
  }

  start() {
    this.simulation.start(10, 10, 10);
    return this;
  }

  stop() {
    this.simulation.stop();
    return this;
  }
}
