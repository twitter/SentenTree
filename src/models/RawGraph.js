import RenderedGraph from './RenderedGraph.js';

export default class RawGraph {
  constructor(minSupport, maxSupport) {
    this.nodes = [];
    this.linkadj = [];
    this.minSupport = minSupport;
    this.maxSupport = maxSupport;
    this.totalNodeCnt = 0;
    this.freqMin = 1;
    this.freqMax = 2;
  }

  generateNodeIds(startIndex = 1) {
    this.nodes.forEach((n, i) => { n.id = i + startIndex; });
    return this;
  }

  getBounds() {
    return this.nodes.reduce((acc, curr) => {

      return acc;
    }, {
      topLeft: [0, 0],
      bottomRight: [1, 1]
    });
  }

  clear() {
    this.nodes = [];
    this.linkadj = [];
    return this;
  }

  toRenderedGraph() {
    return new RenderedGraph(this);
  }
}