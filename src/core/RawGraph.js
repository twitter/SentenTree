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

  generateNodeIds() {
    this.nodes.forEach((n, i) => { n.nid = i; });
    return this;
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