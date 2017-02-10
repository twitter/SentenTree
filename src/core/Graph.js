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

  toRenderData() {
    const output = {
      nodes: this.nodes.map(n => ({
        left: 0,
        leftNodes: [],
        right: 0,
        rightNodes: [],
        data: n
      })),
      links: []
    };

    for( var l in this.linkadj ) {
      for( var r in this.linkadj[l]) {
        nodes[l].right += 1;
        nodes[l].rightNodes.push(r);
        nodes[r].left += 1;
        nodes[r].leftNodes.push(l);
        links.push({
          source: +l,
          target: +r,
          freq: this.linkadj[l][r]
        });
      }
    }

    return output;
  }
}