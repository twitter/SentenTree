import { max, min } from 'lodash-es';

import GraphBundler from './GraphBundler.js';
import Link from './Link.js';
import Node from './Node.js';

export default class RenderedGraph {
  constructor(rawGraph, {
    bundle = true
  } = {}) {
    this.minSupport = rawGraph.minSupport;
    this.maxSupport = rawGraph.maxSupport;

    const nodes = rawGraph.nodes.map(n => new Node(n));
    const links = [];

    for(let l in rawGraph.linkadj) {
      const leftNode = nodes[l];
      const rights = rawGraph.linkadj[l];
      for(let r in rights) {
        const rightNode = nodes[r];
        const link = new Link(
          leftNode,
          rightNode,
          rights[r]
        );
        links.push(link);
        leftNode.rightLinks.push(link);
        rightNode.leftLinks.push(link);
      }
    }

    this.assignNodeIds(nodes);

    if (bundle) {
      const bundled = new GraphBundler(nodes, links).bundle();
      this.nodes = bundled.nodes;
      this.links = bundled.links;
      this.assignNodeIds(this.nodes);
    } else {
      this.nodes = nodes;
      this.links = links;
    }

    const frequencies = this.nodes.map(n => n.data.freq);
    this.freqRange = [min(frequencies), max(frequencies)];
    this.globalFreqRange = this.freqRange;

    const onlyBridgeConstraints = this.links
      .filter(link => link.isTheOnlyBridge())
      .map(link => link.toOnlyBridgeConstraint());

    this.baseConstraints = onlyBridgeConstraints
      .concat(this.getAlignmentConstraints());
  }

  updateNodeSize(sizeFn) {
    this.nodes.forEach(node => {
      const {width, height} = sizeFn(node);
      node.width = width;
      node.height = height;
    });
    return this;
  }

  assignNodeIds(nodes, startIndex = 0) {
    nodes.forEach((n, i) => { n.id = i + startIndex; });
    return this;
  }

  getAlignmentConstraints() {
    const alignmentConstraints = [];

    if(this.nodes.length > 0) {
      const visitedNodes = this.nodes.map(() => false);
      let queue = [this.nodes[0]];
      while(queue.length > 0){
        const node = queue.shift();
        const nodeIndex = node.id;
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
        const nodeIndex = node.id;
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

    return alignmentConstraints;
  }

  getLinkConstraints() {
    return this.links.map(l => l.toConstraint());
  }

  getConstraints() {
    return this.baseConstraints
      .concat(this.links.map(l => l.toConstraint()));
  }

  toGroupConstraint() {
    return {
      leaves: this.nodes.map(n => n.id)
    };
  }
}