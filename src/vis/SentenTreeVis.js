import * as d3 from 'd3';

import { SvgChart, helper } from 'd3kit';

import Layout from './Layout.js';
import { diagonal } from './shapeUtil.js';

class SentenTreeVis extends SvgChart {
  static getDefaultOptions() {
    return helper.deepExtend(super.getDefaultOptions(), {
      initialWidth: 800,
      initialHeight: 200,
      margin: { left: 0, top: 0, bottom: 0, right: 0 },
      fontSize: [10, 32],
      gapBetweenGraph: 10,
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

    this.layers.create(['link', 'node']);

    this.fontSizeScale = d3.scaleSqrt().clamp(true);
    this.strokeSizeScale = d3.scaleSqrt()
      .domain([1, 100])
      .range([1, 6])
      .clamp(true);

    this.layouts = [];

    this.updatePosition = this.updatePosition.bind(this);
    this.visualize = this.visualize.bind(this);
    this.on('data', this.visualize);
    this.on('options', this.visualize);
    // this.on('resize', this.visualize);
  }

  fontSize(node) {
    return `${Math.round(this.fontSizeScale(node.data.freq))}px`;
  }

  renderNodes(graphs) {
    const sUpdate = this.layers.get('node').selectAll('g.graph')
      .data(graphs);

    sUpdate.exit().remove();

    const sEnter = sUpdate.enter().append('g')
      .classed('graph', true);

    this.sNodeGraphs = sUpdate.merge(sEnter)
      .attr('transform', `translate(${this.getInnerWidth() / 2},${this.getInnerHeight() / 2})`);

    const sUpdateNode = sEnter.selectAll('g')
      .data(d => d.nodes, n => n.id);

    sUpdateNode.exit().remove();

    sUpdateNode.enter().append('g')
      .classed('node', true)
    .append('text')
      .attr('dy', '.28em')
      .text(d => d.data.entity)
      .style('cursor', 'pointer')
      .on('click.event', this.dispatchAs('nodeClick'))
      .on('mouseenter.event', this.dispatchAs('nodeMouseenter'))
      .on('mousemove.event', this.dispatchAs('nodeMousemove'))
      .on('mouseleave.event', this.dispatchAs('nodeMouseleave'));

    this.sNodes = this.layers.get('node').selectAll('g.node');

    this.sNodes.select('text')
      .style('font-size', d => this.fontSize(d))
      .style('text-anchor', 'middle');
  }

  renderLinks(graphs) {
    const sUpdate = this.layers.get('link').selectAll('g.graph')
      .data(graphs);

    sUpdate.exit().remove();

    const sEnter = sUpdate.enter().append('g')
      .classed('graph', true);

    this.sLinkGraphs = sUpdate.merge(sEnter)
      .attr('transform', `translate(${this.getInnerWidth() / 2},${this.getInnerHeight() / 2})`);

    const sUpdateLink = sEnter.selectAll('path.link')
      .data(d => d.links, l => l.getKey());

    sUpdateLink.exit().remove();

    sUpdateLink.enter().append('path')
      .classed('link', true)
      .on('click.event', this.dispatchAs('linkClick'))
      .on('mouseenter.event', this.dispatchAs('linkMouseenter'))
      .on('mousemove.event', this.dispatchAs('linkMousemove'))
      .on('mouseleave.event', this.dispatchAs('linkMouseleave'))
      .style('vector-effect', 'non-scaling-stroke')
      .style('opacity', 0.5)
      .style('stroke', '#222')
      .style('fill', 'none');

    graphs.forEach(graph => {
      graph.links.forEach(link => {
        link.strokeWidth = Math.round(this.strokeSizeScale(link.freq / graph.minSupport));
      });
    });

    this.sLinks = this.layers.get('link').selectAll('path.link')
      .style('stroke-width', d => `${d.strokeWidth}px`)
      .style('stroke', l => (l.isTheOnlyBridge() ? '#777' : '#FF9800'));
  }

  updatePosition() {
    let yPos = 0;
    let maxw = 0;
    const { margin, gapBetweenGraph } = this.options();
    const { top, left, bottom, right } = margin;

    // Get bbox of <g> for each graph to compute total dimension
    // and stack each graph on top of each other
    this.sNodeGraphs.each(function fn(graph) {
      const bbox = this.getBBox();
      const w = bbox.width;
      const h = bbox.height;
      maxw = Math.max(w, maxw);
      graph.x = -bbox.x;
      graph.y = -bbox.y + yPos;
      yPos += h + gapBetweenGraph;
    });

    this.sNodeGraphs
      .attr('transform', graph => `translate(${graph.x},${graph.y})`);

    this.sLinkGraphs
      .attr('transform', graph => `translate(${graph.x},${graph.y})`);

    // Update component size to fit all content
    this.dimension([
      maxw + left + right,
      Math.max(0, yPos - gapBetweenGraph) + top + bottom,
    ]);

    this.placeNodes();
    this.placeLinks();
  }

  placeNodes() {
    this.sNodes.attr('transform', d => `translate(${d.x}, ${d.y})`);
  }

  placeLinks() {
    // draw directed edges with proper padding from node centers
    const graphs = this.data();

    graphs.forEach(graph => {
      graph.nodes.forEach(node => {
        node.updateAttachPoints();
      });
    });

    this.sLinks
      .attr('d', link => {
        const points = [
          link.source.rightEdge(),
          link.attachPoints.y1,
          link.target.leftEdge(),
          link.attachPoints.y2,
        ];
        // const xGap = link.target.leftEdge() - link.source.rightEdge();
        // if (xGap > 30) {
        //   return line(...points);
        // }
        return diagonal(...points);
      });
  }

  visualize() {
    if (!this.hasData()) return;

    const graphs = this.data();

    if (graphs.length > 0) {
      const { fontSize } = this.options();
      this.fontSizeScale
        .domain(graphs[0].globalFreqRange)
        .range(fontSize);
    }

    this.renderNodes(graphs);
    this.renderLinks(graphs);

    // Update node position for layout computation
    this.sNodes.each(function fn(node) {
      const bbox = this.getBBox();
      node.width = bbox.width + 4;
      node.height = bbox.height + 4;
    });

    // Update layout pool
    const len = Math.max(graphs.length, this.layouts.length);
    for (let i = 0; i < len; i++) {
      if (i >= this.layouts.length) {
        this.layouts.push(new Layout().on('tick', this.updatePosition));
      }
      if (i >= graphs.length) {
        this.layouts[i]
          .stop()
          .destroy();
        continue;
      }
      this.layouts[i]
        .stop()
        .setGraph(graphs[i])
        .start();
    }
    this.layouts = this.layouts.slice(0, graphs.length);

    this.updatePosition();

    // const colaAdaptor = this.colaAdaptor;

    // this.sNodes.call(colaAdaptor.drag);
    // this.sLinks.call(colaAdaptor.drag);

    // this.colaAdaptor.on('tick', event => {
    //   this.placeNodes();
    //   this.placeLinks();
    // });
  }
}

export default SentenTreeVis;
