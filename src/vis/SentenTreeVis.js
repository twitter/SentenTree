import * as d3 from 'd3';

import { SvgChart, helper } from 'd3kit/dist/d3kit-es.js';

import { d3adaptor } from 'webcola/WebCola/cola.js';

class SentenTreeVis extends SvgChart {
  static getDefaultOptions() {
    return helper.deepExtend(super.getDefaultOptions(), {
      initialWidth: 900,
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

  renderNodes(nodes) {
    const sUpdate = this.layers.get('node').selectAll('g')
      .data(nodes, n => n.data.id);

    sUpdate.exit().remove();

    const sEnter = sUpdate.enter().append('g');

    sEnter.append('text')
      .attr('dy', '.28em')
      .text(d => d.data.entity)

    const sMerge = sEnter.merge(sUpdate)
      .style('font-size', this.fontSize)
      .style('text-anchor', d => {
        if(d.isLeftLeaf()) return 'end';
        else if(d.isRightLeaf()) return 'start';
        else return 'middle';
      });

    this.sNodes = sMerge;
  }

  placeNodes() {
    this.sNodes
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
  }

  renderLinks(links) {
    const sUpdate = this.layers.get('link').selectAll('line')
      .data(links);

    sUpdate.exit().remove();

    const sEnter = sUpdate.enter().append('line')
      .style('stroke', '#222')
      .style('fill', 'none');

    this.sLinks = sEnter.merge(sUpdate);
  }

  placeLinks() {
    this.sLinks
      .attr('x1', link => link.sourceNode.rightEdge())
      .attr('y1', link => link.sourceNode.y)
      .attr('x2', link => link.targetNode.leftEdge())
      .attr('y2', link => link.targetNode.y);
  }

  visualize() {
    if (!this.hasData() || !this.hasNonZeroArea()) return;

    const graph = this.data();

    const contrast = Math.sqrt(graph.freqMax/graph.freqMin);
    const alpha = Math.max(5, 70/contrast);
    this.fontSize = d => `${Math.sqrt(d.data.freq/graph.freqMin) * alpha}px`;

    this.renderNodes(graph.nodes);

    graph.nodes.forEach(n => {
      if(!n.x) {
        n.x = Math.random() * this.getInnerWidth();
        n.y = Math.random() * this.getInnerHeight();
      }
    });

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
      .start(10,10,10);

    this.placeNodes();
    this.renderLinks(graph.links);
    this.placeLinks();

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
