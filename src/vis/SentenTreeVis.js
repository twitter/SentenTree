import * as d3 from 'd3';

import { SvgChart, helper } from 'd3kit/dist/d3kit-es.js';
import { diagonal, line } from './shapeUtil.js';

import { d3adaptor } from 'webcola/WebCola/cola.js';

class SentenTreeVis extends SvgChart {
  static getDefaultOptions() {
    return helper.deepExtend(super.getDefaultOptions(), {
      initialWidth: 1,
      initialHeight: 1,
      margin: { left: 0, top: 0, bottom: 0, right: 0 },
      fontSize: [10, 32],
    });
  }

  static getCustomEventNames() {
    return [
      'layoutStart',
      'layoutTick',
      'layoutEnd',
      'nodeMouseenter',
      'nodeMouseleave',
      'nodeMousemove',
      'nodeClick',
      'linkMouseenter',
      'linkMouseleave',
      'linkMousemove',
      'linkClick',
    ];
  }

  constructor(element, options) {
    super(element, options);

    this.isRunning = false;

    this.layers.create({root: ['link', 'node']});

    this.visualize = this.visualize.bind(this);
    this.on('data', this.visualize);
    this.on('options', this.visualize);
    // this.on('resize', this.visualize);

    this.colaAdaptor = d3adaptor(d3)
      .flowLayout('x', 5)
      .avoidOverlaps(true)
      // .symmetricDiffLinkLengths(5)
      .jaccardLinkLengths(10)
      .linkDistance(5);

    const dispatchLayoutStart = this.dispatchAs('layoutStart');
    this.colaAdaptor.on('start.default', (...args) => {
      this.isRunning = true;
      dispatchLayoutStart(...args);
    });

    this.colaAdaptor.on('tick.event', this.dispatchAs('layoutTick'));

    const dispatchLayoutEnd = this.dispatchAs('layoutEnd');
    this.colaAdaptor.on('end.default', (...args) => {
      if (this.isRunning) {
        this.isRunning = false;
        dispatchLayoutEnd(...args);
      }
    });
  }

  fontSize(node) {
    return `${Math.round(this.fontSizeScale(node.data.freq))}px`;
  }

  renderNodes(nodes) {
    const sUpdate = this.layers.get('root/node').selectAll('g')
      .data(nodes, n => n.data.id);

    sUpdate.exit().remove();

    const sEnter = sUpdate.enter().append('g');

    sEnter.append('text')
      .attr('dy', '.28em')
      .text(d => d.data.entity)
      .style('cursor', 'pointer')
      .on('click.event', this.dispatchAs('nodeClick'))
      .on('mouseenter.event', this.dispatchAs('nodeMouseenter'))
      .on('mousemove.event', this.dispatchAs('nodeMousemove'))
      .on('mouseleave.event', this.dispatchAs('nodeMouseleave'));

    const sMerge = sEnter.merge(sUpdate)
      .style('font-size', d => this.fontSize(d))
      .style('text-anchor', 'middle')
      // .style('text-anchor', d => {
      //   if(d.isLeftLeaf()) return 'end';
      //   else if(d.isRightLeaf()) return 'start';
      //   else return 'middle';
      // });

    this.sNodes = sMerge;
  }

  placeNodes() {
    this.sNodes
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
  }

  renderLinks(links) {
    const graph = this.data();

    const strokeSizeScale = d3.scaleSqrt()
      .domain([1, 100])
      .range([1, 7])
      .clamp(true);

    links.forEach(link => {
      link.strokeWidth = Math.round(strokeSizeScale(link.freq / graph.minSupport));
    });

    const sUpdate = this.layers.get('root/link').selectAll('path')
      .data(links);

    sUpdate.exit().remove();

    const sEnter = sUpdate.enter().append('path')
      .on('click.event', this.dispatchAs('linkClick'))
      .on('mouseenter.event', this.dispatchAs('linkMouseenter'))
      .on('mousemove.event', this.dispatchAs('linkMousemove'))
      .on('mouseleave.event', this.dispatchAs('linkMouseleave'))
      .style('vector-effect', 'non-scaling-stroke')
      .style('opacity', 0.5)
      .style('stroke', '#222')
      .style('fill', 'none');

    this.sLinks = sEnter.merge(sUpdate)
      .style('stroke-width', d => `${d.strokeWidth}px`)
      .style('stroke', l => l.isTheOnlyBridge() ? '#777' : '#FF9800');
  }

  placeLinks() {
    // draw directed edges with proper padding from node centers
    const graph = this.data();

    graph.nodes.forEach(node => {
      node.updateAttachPoints();
    });

    // graph.links.forEach(d => {
    //   const deltaX = d.target.x - d.source.x;
    //   const deltaY = d.target.y - d.source.y;
    //   const dist = Math.max(1, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
    //   const normX = deltaX / dist;
    //   const normY = deltaY / dist;

    //   d.points = {
    //     x1: d.source.rightEdge(),
    //     // x1: d.source.x + (d.source.bounds.width()/2 * normX),
    //     y1: d.source.y + (d.source.bounds.height()/2 * normY),
    //     x2: d.target.leftEdge(),
    //     // x2: d.target.x - (d.target.bounds.width()/2 * normX),
    //     y2: d.target.y - (d.target.bounds.height()/2 * normY),
    //   };
    // });

    this.sLinks
      .attr('d', link => {
        const points = [
          link.source.rightEdge(),
          link.attachPoints.y1,
          link.target.leftEdge(),
          link.attachPoints.y2
        ];
        // const xGap = link.target.leftEdge() - link.source.rightEdge();
        // if (xGap > 30) {
        //   return line(...points);
        // }
        return diagonal(...points);
      });
  }

  visualize() {
    if (!this.hasData() || !this.hasNonZeroArea()) return;

    const graph = this.data();
    const { fontSize } = this.options();

    this.fontSizeScale = d3.scaleSqrt()
      .domain(graph.globalFreqRange)
      .range(fontSize)
      .clamp(true);

    this.layers.get('root')
      .attr('transform', `translate(${this.getInnerWidth() / 2},${this.getInnerHeight() / 2})`);
    this.renderNodes(graph.nodes);
    this.renderLinks(graph.links);

    // graph.nodes.forEach(n => {
    //   if(!n.x) {
    //     n.x = Math.random() * this.getInnerWidth();
    //     n.y = Math.random() * this.getInnerHeight();
    //   }
    // });

    this.sNodes.each(function(d) {
      const bbox = this.getBBox();
      d.width = bbox.width + 4;
      d.height = bbox.height + 4;
    });

    const linkConstraints = graph.getLinkConstraints();

    this.colaAdaptor
      .nodes(graph.nodes)
      .links(graph.links)
      .constraints(graph.getConstraints())
      .start(20,40,40);

    this.placeNodes();
    this.placeLinks();

    // const colaAdaptor = this.colaAdaptor;

    // this.sNodes.call(colaAdaptor.drag);
    // this.sLinks.call(colaAdaptor.drag);

    // this.colaAdaptor.on('tick', event => {
    //   this.placeNodes();
    //   this.placeLinks();

    // });
  }

  fitComponentToContent() {
    const bbox = this.layers.get('root').node().getBBox();
    const { top, left, bottom, right } = this.options().margin;
    const w = this.width();
    const h = this.height();
    const w2 = bbox.width + left + right;
    const h2 = bbox.height + top + bottom;
    this.dimension([w2, h2]);
    this.layers.get('root')
      .attr('transform', `translate(${-bbox.x},${-bbox.y})`);
  }
}

export default SentenTreeVis;
