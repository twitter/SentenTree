import Link from './Link.js';
import Node from './Node.js';

export default class RenderedGraph {
  constructor(rawGraph) {
    this.nodes = rawGraph.nodes.map(n => new Node(n));
    this.links = [];

    this.freqMin = rawGraph.freqMin;
    this.freqMax = rawGraph.freqMax;
    this.minSupport = rawGraph.minSupport;
    this.maxSupport = rawGraph.maxSupport;

    for( let l in rawGraph.linkadj ) {
      const leftNode = this.nodes[l];
      const rights = rawGraph.linkadj[l];
      for( let r in rights) {
        const rightNode = this.nodes[r];
        leftNode.rightNodes.push(rightNode);
        rightNode.leftNodes.push(leftNode);
        const link = new Link(
          leftNode,
          rightNode,
          rights[r]
        );
        this.links.push(link);
        leftNode.rightLinks.push(link);
        rightNode.leftLinks.push(link);
      }
    }

    const onlyBridgeConstraints = this.links
      .filter(link => link.isTheOnlyBridge())
      .map(link => ({
        type: 'alignment',
        axis: 'y',
        offsets: [
          { node: link.source.data.id, offset: 0 },
          { node: link.target.data.id, offset: 0 }
        ]
      }));

    const alignmentConstraints = [];

    if(this.nodes.length > 0) {
      const visitedNodes = this.nodes.map(() => false);
      let queue = [this.nodes[0]];
      while(queue.length > 0){
        const node = queue.shift();
        const nodeIndex = node.data.id;
        if(visitedNodes[nodeIndex]) continue;
        visitedNodes[nodeIndex] = true;
        const constraints = this.computeRightConstraints(node);
        if(constraints){
          alignmentConstraints.push(constraints);
        }
        if(node.rightNodes){
          queue = queue.concat(node.rightNodes);
        }
      }

      for (let i=0;i<this.nodes.length;i++){
        visitedNodes[i] = false;
      }
      queue = [this.nodes[0]];

      while(queue.length>0){
        const node = queue.shift();
        const nodeIndex = node.data.id;
        if(visitedNodes[nodeIndex]) continue;
        visitedNodes[nodeIndex] = true;
        const constraints = this.computeLeftConstraints(node);
        if(constraints){
          alignmentConstraints.push(constraints);
        }
        if(node.leftNodes){
          queue = queue.concat(node.leftNodes);
        }
      }
    }

    this.baseConstraints = onlyBridgeConstraints.concat(alignmentConstraints);
  }

  computeLeftConstraints(node){
    const leftNodes = node.leftNodes.filter(n => n.rightNodes.length === 1);
    if(leftNodes.length > 1){
      return this.createAlignmentConstraints('x', leftNodes);
    }
    return null;
  }

  computeRightConstraints(node){
    const rightNodes = node.rightNodes.filter(n => n.leftNodes.length === 1);
    if(rightNodes.length > 1){
      return this.createAlignmentConstraints('x', rightNodes);
    }
    return null;
  }

  createAlignmentConstraints(axis, nodes) {
    return {
      type: 'alignment',
      axis,
      offsets: nodes.map(n => ({node: n.data.id, offset: 0}))
    };
  }

  updateNodeSize(sizeFn) {
    this.nodes.forEach(node => {
      const {width, height} = sizeFn(node);
      node.width = width;
      node.height = height;
    });
    return this;
  }

  getLinkConstraints() {
    return this.links.map(l => l.toConstraint());
  }

  getConstraints() {
    return this.baseConstraints
      .concat(this.links.map(l => l.toConstraint()));
  }
}