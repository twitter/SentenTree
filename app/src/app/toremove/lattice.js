var latticeVis = (function(){
  function render(containerDom, dataFile){
    var width = 1600,
        height = 800;

    var color = d3.scale.category20();

    var outer = d3.select(containerDom).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("pointer-events", "all");

    outer.append('rect')
        .attr('class', 'background')
        .attr('width', "100%")
        .attr('height', "100%")
        .call(d3.behavior.zoom().on("zoom", redraw));

    var vis = outer
        .append('g');
    //      .attr('transform', 'translate(250,250)');

    function redraw() {
        vis.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
    }

    var colaAdaptor = cola.d3adaptor()
        .flowLayout('x')
        .avoidOverlaps(true)
        .size([width, height]);

    d3.json(dataFile, function (error, graph) {
        var nodes = graph.entities,
            links = graph.links;

        // define arrow markers for graph links

        outer.append('svg:defs').append('svg:marker')
            .attr('id', 'end-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 6)
            .attr('markerWidth', 3)
            .attr('markerHeight', 3)
            .attr('orient', 'auto')
          .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', '#000');

        var path = vis.selectAll(".link")
            .data(links)
          .enter().append('svg:path')
            .attr('class', 'link')
            .attr('stroke-width', function(d) {return (Math.sqrt(d.freq)/30)+'px'});

        var label = vis.selectAll(".label")
            .data(nodes)
          .enter().append("text")
            .attr("class", "label")
            .text(function (d) {return d.entity; })
            .style("font-size", function(d) {return Math.sqrt(d.freq)/10;})
            .style("fill", function (d, i) { return color(i); })
            .call(colaAdaptor.drag)
            .each(function (d) {
                var bbox = this.getBBox();
                d.width = bbox.width;
                d.height = bbox.height;
            });

        var box = vis.selectAll(".box")
            .data(nodes)
          .enter().append("rect")
            .attr("class", "box")
            .call(colaAdaptor.drag);

        var constraints = links;
        constraints.forEach(function(d) {
            d.left = d.source;
            d.right = d.target;
            d.axis = "x";
            d.gap = 15;
        })
        for(var i = 0;  i < constraints.length; i++ ) {
            var c = constraints[i];
            c.gap = nodes[c.left].width/2 + nodes[c.right].width/2 + 15;
        }


        colaAdaptor
            .nodes(nodes)
            .links(links)
            .linkDistance(15)
            .constraints(constraints)
            //.symmetricDiffLinkLengths()
            .jaccardLinkLengths()
            .start(10,15,20);

        colaAdaptor.on("tick", function () {

            path.each(function (d) {
                if (isIE()) this.parentNode.insertBefore(this, this);
            });
            // draw directed edges with proper padding from node centers
            path.each(function (d) {
                var deltaX = d.target.x - d.source.x,
                    deltaY = d.target.y - d.source.y,
                    dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    if( dist == 0 )
                        dist = 1;
                var normX = deltaX / dist,
                    normY = deltaY / dist;
                d.s = {'x':d.source.x + (d.source.bounds.width()/2 * normX),
                       'y':d.source.y + (d.source.bounds.height()/2 * normY)};
                d.t = {'x':d.target.x - (d.target.bounds.width()/2 * normX),
                       'y':d.target.y - (d.target.bounds.height()/2 * normY)};
            });

            var diagonal = d3.svg.diagonal()
                       .source(function(d) {return d.s;} )
                       .target(function(d) {return d.t;} );
            path.attr('d', diagonal);

            box
                .attr("x", function (d) { return d.bounds.x; })
                .attr("y", function (d) { return d.bounds.y; })
                .attr("width", function (d) { return d.bounds.width(); })
                .attr("height", function (d) { return d.bounds.height(); });

            label
                .attr("x", function (d) { return d.x - d.bounds.width()/2; })
                .attr("y", function (d) { return d.y + d.bounds.height()/4; });
        });
        // turn on overlap avoidance after first convergence
        //colaAdaptor.on("end", function () {
        //    if (!colaAdaptor.avoidOverlaps()) {
        //        graph.nodes.forEach(function (v) {
        //            v.width = v.height = 10;
        //        });
        //        colaAdaptor.avoidOverlaps(true);
        //        colaAdaptor.start();
        //    }
        //});
    });

  }

  function isIE() { return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); }

  return {
    render: render
  };
}());

