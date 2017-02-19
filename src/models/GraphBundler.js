import { chain, keyBy, sum } from 'lodash-es';

import Heap from 'heap';
import Link from './Link.js';
import Node from './Node.js';

export default class GraphBundler {
  constructor(nodes, links) {
    this.nodes = nodes;
    this.links = links;
    this.linkLookup = keyBy(this.links, l => l.getKey());
  }

  addLinks(links) {
    this.links = this.links.concat(links);
    links.forEach(link => {
      this.linkLookup[link.getKey()] = link;
    });
  }

  bundle() {
    const heap = new Heap((a, b) => a.data.id - b.data.id);

    // Add candidate parents to heap
    this.nodes
      .filter(n => this.hasPotential(n))
      .forEach(n => { heap.push(n); });

    while (heap.size() > 0) {
      const parent = heap.pop();
      if (parent.merged) {
        continue;
      }

      let groups = [];
      if (parent.leftLinks.length > 1) {
        const lNodes = parent.leftLinks.map(l => l.source);
        groups = groups.concat(this.groupMergeableNodes(lNodes));
      }

      if (parent.rightLinks.length > 1) {
        const rNodes = parent.rightLinks.map(l => l.target);
        groups = groups.concat(this.groupMergeableNodes(rNodes));
      }

      if (groups.length > 0) {
        const newNodes = groups.map(group => this.mergeNodes(group));
        newNodes.filter(n => this.hasPotential(n))
          .forEach(n => { heap.push(n); });
      }
    }

    return {
      nodes: this.nodes.filter(n => !n.merged),
      links: this.links.filter(l =>
        !l.source.merged && !l.target.merged),
    };
  }

  groupMergeableNodes(nodes) {
    const linkLookup = this.linkLookup;
    return chain(nodes)
      .groupBy(n => n.data.entity)
      .values()
      .filter(g => g.length > 1)
      .flatMap(g => {
        const subgroups = [[g[0]]];
        for (let i = 1; i < g.length; i++) {
          const node = g[i];
          for (let j = 0; j < subgroups.length; j++) {
            const subgroup = subgroups[j];
            if (subgroup.every(n =>
              !linkLookup[[n.id, node.id].join(',')]
              && !linkLookup[[n.id, node.id].join(',')])
            ) {
              subgroup.push(node);
              continue;
            }
            subgroups.push([node]);
          }
        }
        return subgroups.filter(subgroup => subgroup.length > 1);
      })
      .value();
  }

  hasPotential(node) {
    return node.rightLinks.length > 1 || node.leftLinks.length > 1;
  }

  mergeNodes(nodes) {
    const newNode = Node.merge(nodes);
    newNode.id = this.nodes.length;
    this.nodes.push(newNode);
    nodes.forEach(n => { n.merged = true; });

    newNode.rightLinks = chain(nodes)
      .flatMap(n => n.rightLinks)
      .groupBy(l => l.target.id)
      .mapValues(links => {
        const target = links[0].target;
        target.leftLinks = target.leftLinks
          .filter(l => !l.source.merged);
        const link = new Link(
          newNode,
          links[0].target,
          sum(links.map(l => l.freq))
        );
        target.leftLinks.push(link);
        return link;
      })
      .values()
      .value();

    this.addLinks(newNode.rightLinks);

    newNode.leftLinks = chain(nodes)
      .flatMap(n => n.leftLinks)
      .groupBy(l => l.source.id)
      .mapValues(links => {
        const source = links[0].source;
        source.rightLinks = source.rightLinks
          .filter(l => !l.target.merged);
        const link = new Link(
          links[0].source,
          newNode,
          sum(links.map(l => l.freq))
        );
        source.rightLinks.push(link);
        return link;
      })
      .values()
      .value();

    this.addLinks(newNode.leftLinks);

    return newNode;
  }
}
