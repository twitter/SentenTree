export default class Graph {
  constructor(minSupport, maxSupport) {
    this.nodes = [];
    this.linkadj = [];
    this.minSupport = minSupport;
    this.maxSupport = maxSupport;
    this.totalNodeCnt = 0;
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
}