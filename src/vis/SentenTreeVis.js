import * as d3 from 'd3';

import { SvgChart, helper } from 'd3kit/dist/d3kit-es.js';

import { d3adaptor } from 'webcola/WebCola/cola.js';
import { diagonal } from './shapeUtil.js';

class SentenTreeVis extends SvgChart {
  static getDefaultOptions() {
    return helper.deepExtend(super.getDefaultOptions(), {
      initialWidth: 1100,
      initialHeight: 300,
      fontSize: [10, 48],
    });
  }

  static getCustomEventNames() {
    return [];
  }

  constructor(element, options) {
    super(element, options);

    this.layers.create(['link', 'node']);

    this.visualize = this.visualize.bind(this);
    this.on('data', this.visualize);
    this.on('options', this.visualize);
    // this.on('resize', this.visualize);

    this.colaAdaptor = d3adaptor(d3)
      .flowLayout('x', 5)
      .avoidOverlaps(true)
      .size([this.getInnerWidth(), this.getInnerHeight()])
      .linkDistance(5);
  }

  fontSize(node) {
    return `${Math.round(this.fontSizeScale(node.data.freq))}px`;
  }

  renderNodes(nodes) {
    const sUpdate = this.layers.get('node').selectAll('g')
      .data(nodes, n => n.data.id);

    sUpdate.exit().remove();

    const sEnter = sUpdate.enter().append('g');

    sEnter.append('text')
      .attr('dy', '.28em')
      .text(d => d.data.entity)
      .on('click', node => {
        console.log(node, node);
      })

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
    const sUpdate = this.layers.get('link').selectAll('path')
      .data(links);

    sUpdate.exit().remove();

    const sEnter = sUpdate.enter().append('path')
      .style('vector-effect', 'non-scaling-stroke')
      .style('opacity', 0.5)
      .style('stroke', '#222')
      .style('fill', 'none');

    this.sLinks = sEnter.merge(sUpdate)
      .style('stroke-width', this.strokeWidth)
      .style('stroke', l => l.isTheOnlyBridge() ? '#777' : '#55acee');
  }

  placeLinks() {
    // draw directed edges with proper padding from node centers
    this.data().links.forEach(d => {
      const deltaX = d.target.x - d.source.x;
      const deltaY = d.target.y - d.source.y;
      const dist = Math.max(1, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
      const normX = deltaX / dist;
      const normY = deltaY / dist;

      d.points = {
        x1: d.source.rightEdge(),
        // x1: d.source.x + (d.source.bounds.width()/2 * normX),
        y1: d.source.y + (d.source.bounds.height()/2 * normY),
        x2: d.target.leftEdge(),
        // x2: d.target.x - (d.target.bounds.width()/2 * normX),
        y2: d.target.y - (d.target.bounds.height()/2 * normY),
      };
    });

    this.sLinks
      .attr('d', link => diagonal(
        link.points.x1,
        link.points.y1,
        link.points.x2,
        link.points.y2
      ));
      // .attr('d', link => diagonal(
      //   link.sourceNode.rightEdge(),
      //   link.sourceNode.y,
      //   link.targetNode.leftEdge(),
      //   link.targetNode.y
      // ));
      // .attr('x1', link => link.sourceNode.rightEdge())
      // .attr('y1', link => link.sourceNode.y)
      // .attr('x2', link => link.targetNode.leftEdge())
      // .attr('y2', link => link.targetNode.y);
  }

  visualize() {
    if (!this.hasData() || !this.hasNonZeroArea()) return;

    const graph = this.data();
    const { fontSize } = this.options();

    this.fontSizeScale = d3.scaleSqrt()
      .domain([graph.freqMin, graph.freqMax])
      .range(fontSize)
      .clamp(true);

    this.strokeWidth = link => {
      return `${Math.round(Math.sqrt(link.freq / graph.minSupport))}px`;
    }

    this.renderNodes(graph.nodes);

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

    this.colaAdaptor
      .nodes(graph.nodes)
      .links(graph.links)
      .constraints(graph.getConstraints())
      // .symmetricDiffLinkLengths(5)
      .jaccardLinkLengths(10)
      .start(10,20,50);

    this.placeNodes();
    this.renderLinks(graph.links);
    this.placeLinks();

    const colaAdaptor = this.colaAdaptor;

    // this.sNodes.call(colaAdaptor.drag);
    // this.sLinks.call(colaAdaptor.drag);

    this.colaAdaptor.on("tick", event => {
      // draw directed edges with proper padding from node centers
      // path.each(function (d) {
      //   var deltaX = d.target.x - d.source.x;
      //   var deltaY = d.target.y - d.source.y;
      //   var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      //   dist = dist===0 ? 1 : dist;

      //   var normX = deltaX / dist,
      //       normY = deltaY / dist;

      //   d.s = {'y':d.source.x + (d.source.bounds.width()/2 * normX),
      //           'x':d.source.y + (d.source.bounds.height()/2 * normY)};
      //   d.t = {'y':d.target.x - (d.target.bounds.width()/2 * normX),
      //           'x':d.target.y - (d.target.bounds.height()/2 * normY)};
      // });

      // path.attr('d', diagonal);

      this.placeNodes();
      this.placeLinks();

      // this.layers.get('node').selectAll('g')
      //   .attr('transform', d => `translate(${d.x}, ${d.y})`)
      //   .attr("width", function (d) { return d.bounds.width(); })
      //   .attr("height", function (d) { return d.bounds.height(); });


      // label
      //   .attr("x", function (d) { return d.x - d.bounds.width()/2; })
      //   .attr('dy', '.28em')
      //   .attr("y", function (d) { return d.y; });

      // // crop SVG
      // var gbbox = nodeGroup.node().getBBox();
      // if( Math.abs(gbbox.width - width) > 5 || Math.abs(gbbox.height - height) > 5 ) {
      //   zoom.translate([5 - gbbox.x, 5 - gbbox.y]).event(nodeGroup);
      //   svg.attr("height", gbbox.height + 10);
      //   svg.attr("width", gbbox.width + 10);
      // }
    });

    // this.colaAdaptor.on("end", function (event) {
    //   console.log("end");
    // });
  }
}

export default SentenTreeVis;
