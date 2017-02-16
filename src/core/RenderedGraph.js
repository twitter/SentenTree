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
      .map(link => link.toOnlyBridgeConstraint());

    const alignmentConstraints = [];

    if(this.nodes.length > 0) {
      const visitedNodes = this.nodes.map(() => false);
      let queue = [this.nodes[0]];
      while(queue.length > 0){
        const node = queue.shift();
        const nodeIndex = node.data.id;
        if(visitedNodes[nodeIndex]) continue;
        visitedNodes[nodeIndex] = true;
        const constraints = node.computeRightConstraints();
        if(constraints){
          alignmentConstraints.push(constraints);
        }
        const rNodes = node.getRightNodes();
        if(rNodes.length > 0){
          queue = queue.concat(rNodes);
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
        const constraints = node.computeLeftConstraints();
        if(constraints){
          alignmentConstraints.push(constraints);
        }
        const lNodes = node.getLeftNodes();
        if(lNodes.length > 0){
          queue = queue.concat(lNodes);
        }
      }
    }

    this.baseConstraints = onlyBridgeConstraints.concat(alignmentConstraints);
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