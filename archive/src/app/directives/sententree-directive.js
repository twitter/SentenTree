/* jshint asi:true */

define([
  'app/directives/directives',
  'd3',
  'cola',
  'colorbrewer',
],
function (directives, d3, cola, colorbrewer) {
  'use strict';
//---------------------------------------------------
// BEGIN code for this directive
//---------------------------------------------------

directives.directive('sententree', ['sstooltipManager', function (sstooltipManager){
  return {
    restrict: 'AE',
    replace: true,
    require: '^sentenforest',
    templateUrl: 'app/directives/sententree-directive.html',
    scope:{
      graph: '=',
      width: '=',
      height: '='
    },
    link: function(scope, elements, attrs, sentenforestCtrl) {
      scope.showMe = true;
      sentenforestCtrl.addTree(scope);

      /* Initialize tooltip */
      /* jshint ignore:start */
      var tip = new sstooltipManager(scope, 'node');
      /* jshint ignore:end */

      scope.initView = function() {
        /* create DOM elements */
        var svgw = (scope.width>50)?scope.width:50,
            svgh = (scope.height>50)?scope.height:50;

        scope.svg = d3.select(elements[0]).select('svg')
                      .attr("width", svgw)
                      .attr("height", svgh)
                      .attr("pointer-events", "all");

        scope.svg.append('rect')
          .attr('class', 'background')
          .attr('width', "100%")
          .attr('height', "100%");

        scope.linkGroup = scope.svg.append('g');
        scope.nodeGroup = scope.svg.append('g');

        /* initialize force-layout adaptor */
       /* scope.colaAdaptor = cola.d3adaptor()
          .flowLayout('x')
          .avoidOverlaps(true)
          .size([svgw, svgh]);*/
      }

      scope.dimView = function() {
        if( scope.nodeGroup )
          scope.nodeGroup.style("opacity", 0.2);
        if( scope.linkGroup )
          scope.linkGroup.style("opacity", 0.1);
      }

      scope.undimView = function() {
        if( scope.nodeGroup )
          scope.nodeGroup.style("opacity", 1);
        if( scope.linkGroup )
          scope.linkGroup.style("opacity", 1);
      }

      scope.showView = function() {
        if(!scope.showMe || !scope.graph || !scope.graph.nodes || !scope.graph.linkadj){
          return;
        }

        var svg = scope.svg;
        var nodeGroup = scope.nodeGroup;
        var linkGroup = scope.linkGroup;

        if(scope.colaAdaptor)
          scope.colaAdaptor.stop();

        var colaAdaptor = cola.d3adaptor()
          .flowLayout('x')
          .avoidOverlaps(true);
        //  .size([svgw, svgh]);

        console.log("nodes count: " + scope.graph.nodes.length);
        // // assign nodes and links data
        // var nodes = scope.graph.nodes;
        // for( var i = 0; i < nodes.length; i++ ) {
        //   nodes[i].left = 0;
        //   nodes[i].leftNodes = [];
        //   nodes[i].right = 0;
        //   nodes[i].rightNodes = [];
        // }
        // var links = [];
        // for( var l in scope.graph.linkadj )
        //   for( var r in scope.graph.linkadj[l]) {
        //     nodes[l].right += 1;
        //     nodes[l].rightNodes.push(r);
        //     nodes[r].left += 1;
        //     nodes[r].leftNodes.push(l);
        //     links.push({
        //       source: +l,
        //       target: +r,
        //       freq: scope.graph.linkadj[l][r]
        //     });
        //   }

        var freqMin = scope.graph.graphsFreqMin;
        var freqMax = scope.graph.graphsFreqMax;
        // update style functions
        //var fontweight = scope.fontweight;
        //if( !fontweight ) {
          var fontweight = scope.fontweight = function(d) {
            var contrast = Math.sqrt(freqMax/freqMin);
            var alpha = 80/contrast >= 5 ? 80/contrast : 5;
            return Math.sqrt(d.freq/freqMin)*alpha+'px';
            //return Math.sqrt(d.freq/nodes[nodes.length-1].freq)*10+'px';
          }
        //}

        //var linkweight = scope.linkweight;
        //if( !linkweight ) {
          var linkweight = scope.linkweight = function(d) {
            return Math.sqrt(d.freq/scope.graph.minSupport)+'px';
          }
        //}

        //var color = scope.color;
        //if( !color ) {
          /*var maxDegree = d3.max(nodes, function(d){return d.left + d.right;});
          var blues = d3.scale.linear()
                .domain(d3.range(0, maxDegree, maxDegree/4))
                .range(colorbrewer.PuBu[9].slice(4));
          color = scope.color = function(d) {
            var degree = d.left + d.right;
            if( degree == 1 )
              return "#6e016b";
            else
              return blues(degree);
          };*/
          var blues = d3.scale.linear()
                .domain(d3.range(freqMin, freqMax, (freqMax - freqMin) / 4))
                .range(colorbrewer.PuBu[9].slice(4));
          var color = scope.color = function(d) {
            return blues(d.freq);
          }
        //}

        var zoom = d3.behavior.zoom()
          .translate([0,0])
          .scale(1)
          .on("zoom", redraw);

        var diagonal = d3.svg.diagonal()
          .source(function(d) {return d.s;} )
          .target(function(d) {return d.t;} )
          .projection(function(d){ return [d.y, d.x]; });


        //update graph
        var path = linkGroup.selectAll(".link")
            .data(links);

        path.enter().append('svg:path')
            .attr('class', 'link');
            // .attr('stroke-width', linkweight);

        path.exit().remove();

        var box = nodeGroup.selectAll(".box")
            .data(nodes, function(d) {return d.id;});

        box.enter().append("rect")
            .attr("class", "box")
            .style('fill', '#ddd');

        box.exit().remove();

        var label = nodeGroup.selectAll(".label")
            .data(nodes, function(d){return d.id;});

        label.enter().append("text")
            .attr("class", "label")
            .text(function (d) {return d.entity; })
            .style("font-size", fontweight)
            .style("fill", function (d, i) {
              return color(d);
            })
            .each(function (d) {
              var bbox = this.getBBox();
              d.width  = bbox.width;
              d.height = bbox.height;
            });

        label.exit().remove();


        /* update link lengths */
        links.forEach(function(l) {
          l.left = l.source;
          l.right = l.target;
          l.axis = "x";
          l.gap = nodes[l.left].width/2 + nodes[l.right].width/2 + 20;
        });

        path
          .style('vector-effect', 'non-scaling-stroke')
          .style('stroke-width', function(d){return isTheOnlyBridge(d) ? '1px' : '2px';})
          .style('stroke', function(d){return isTheOnlyBridge(d) ? '#4eb3d3' : '#ccc';})


        /* defining interactions with the label */
        label.on('mouseover', function(d){
            // show tooltip
            // the second parameter is the "data" passed to tooltip
            // modify nodeTooltip.html to modify tooltip
            sentenforestCtrl.dimAll(scope);
            tip.show(d3.event, d);
            label.style("opacity", 0.2);
            label.filter(function(l) {
                    return d.leafSeq.words.indexOf(l)>=0;
                  })
                 .style("opacity", 1)
                 .style("fill", "#3690c0");
            label.filter(function(l) {
                    return d.seq.words.indexOf(l)>=0;
                  })
                 .style("fill", "#034e7b");
            path.style("opacity", 0.1);
            path.filter(function(p){
                  var l = d.leafSeq.words.indexOf(p.source),
                      r = d.leafSeq.words.indexOf(p.target);
                  return l>=0 && r>=0 && r-l==1;})
                .style("opacity", 0.6);
            path.filter(function(p){
                  var l = d.seq.words.indexOf(p.source),
                      r = d.seq.words.indexOf(p.target);
                  return l>=0 && r>=0 && r-l==1;})
                .style("opacity", 1);
            showExampleTexts(d);
          })
          .on('mousemove', function(d){
            // move tooltip to new position when mouse move
            tip.move(d3.event);
          })
          .on('mouseout', function(d) {
            sentenforestCtrl.undimAll();
            tip.hide();
            label.style("fill", function (d, i) {
              return color(d);
            })
              .style("opacity", 1);
            path.style("opacity", 0.6);
            clearExampleTexts();
          });

        label.on('click', function(d){
          // shift + click: drill down
          //if( d3.event.shiftKey ) {
            sentenforestCtrl.zoomin(scope, d);
          //}
          // click only: show tweet detail
          //else {
            //showTooltip(d);
            //showExampleTexts(d);
          //}
        });


        /* add constraints for direct left/right nodes to have same x positions */
        var alignmentConstraints = applyConstraints();

        /* initialize force-layout adaptor */
        colaAdaptor
          .avoidOverlaps(true)
          .nodes(nodes)
          .links(links)
          .linkDistance(5)
          .constraints(links)
          .constraints(alignmentConstraints.concat(links))
          //.symmetricDiffLinkLengths()
          .jaccardLinkLengths()
          .start(10,10,10);

        box.call(colaAdaptor.drag);
        label.call(colaAdaptor.drag);

        var gbbox = nodeGroup.node().getBBox();
        var width = gbbox.width, height = gbbox.height;

        colaAdaptor.on("tick", function (event) {
          // draw directed edges with proper padding from node centers
          path.each(function (d) {
            var deltaX = d.target.x - d.source.x;
            var deltaY = d.target.y - d.source.y;
            var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            dist = dist===0 ? 1 : dist;

            var normX = deltaX / dist,
                normY = deltaY / dist;

            d.s = {'y':d.source.x + (d.source.bounds.width()/2 * normX),
                   'x':d.source.y + (d.source.bounds.height()/2 * normY)};
            d.t = {'y':d.target.x - (d.target.bounds.width()/2 * normX),
                   'x':d.target.y - (d.target.bounds.height()/2 * normY)};
          });

          path.attr('d', diagonal);

          box
            .attr("x", function (d) { return d.bounds.x; })
            .attr("y", function (d) { return d.bounds.y; })
            .attr("width", function (d) { return d.bounds.width(); })
            .attr("height", function (d) { return d.bounds.height(); });

          label
            .attr("x", function (d) { return d.x - d.bounds.width()/2; })
            .attr('dy', '.28em')
            .attr("y", function (d) { return d.y; });

          // crop SVG
          var gbbox = nodeGroup.node().getBBox();
          if( Math.abs(gbbox.width - width) > 5 || Math.abs(gbbox.height - height) > 5 ) {
            zoom.translate([5 - gbbox.x, 5 - gbbox.y]).event(nodeGroup);
            svg.attr("height", gbbox.height + 10);
            svg.attr("width", gbbox.width + 10);
          }
        });

        colaAdaptor.on("end", function (event) {
          console.log("end");
        });



        //---------------------------------------------------
        // Functions
        //---------------------------------------------------
        function redraw() {
          nodeGroup.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
          linkGroup.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
        }

        function cropSVG() {
          var gbbox = nodeGroup.node().getBBox();
          zoom.translate([5 - gbbox.x, 5 - gbbox.y]).event(nodeGroup);
          svg.attr("height", gbbox.height + 10);
          svg.attr("width", gbbox.width + 10);
        }

        // function applyConstraints() {
        //   var alignmentConstraints = [];

        //   // if there is nothing else between left and right nodes
        //   // these link can be shorten and we can fix left and right node to the same y
        //   links.filter(isTheOnlyBridge).forEach(function(l){
        //     // shorten link
        //     l.gap = nodes[l.left].width/2 + nodes[l.right].width/2 + 5;
        //     // add y-axis constraint
        //     alignmentConstraints.push({
        //       type: 'alignment',
        //       axis: 'y',
        //       offsets: [
        //         {node: l.left, offset: 0},
        //         {node: l.right, offset: 0}
        //       ]
        //     });
        //   });

        //   var visitedNodes = [];
        //   (function(){
        //     for (var i=0;i<nodes.length;i++){
        //       visitedNodes.push(false);
        //     }
        //     var queue = [0];
        //     while(queue.length>0){
        //       var nodeIndex = queue.shift();
        //       if(visitedNodes[nodeIndex]) continue;
        //       visitedNodes[nodeIndex] = true;
        //       var node = nodes[nodeIndex];

        //       var constraints = computeRightConstraints(nodeIndex);
        //       if(constraints){
        //         alignmentConstraints.push(constraints);
        //       }

        //       if(node.rightNodes){
        //         queue = queue.concat(node.rightNodes);
        //       }
        //     }
        //   }());

        //   (function(){
        //     for (var i=0;i<nodes.length;i++){
        //       visitedNodes[i] = false;
        //     }
        //     var queue = [0];
        //     while(queue.length>0){
        //       var nodeIndex = queue.shift();
        //       if(visitedNodes[nodeIndex]) continue;
        //       visitedNodes[nodeIndex] = true;
        //       var node = nodes[nodeIndex];

        //       var constraints = computeLeftConstraints(nodeIndex);
        //       if(constraints){
        //         alignmentConstraints.push(constraints);
        //       }

        //       if(node.leftNodes){
        //         queue = queue.concat(node.leftNodes);
        //       }
        //     }
        //   }());

        //   return alignmentConstraints;
        // }

        // // check if there is nothing else between left and right nodes
        // function isTheOnlyBridge(l){
        //   return nodes[l.left].right==1 && nodes[l.right].left==1;
        // }

        // function computeLeftConstraints(nodeIndex){
        //   var leftNodes = nodes[nodeIndex].leftNodes;

        //   if(leftNodes){
        //     leftNodes = leftNodes.filter(function(nodeIndex){
        //       return nodes[nodeIndex].right==1;
        //     });
        //   }
        //   else{
        //     return null;
        //   }

        //   if(leftNodes.length>1){
        //     return createAlignmentConstraints('x', leftNodes);
        //   }
        //   return null;
        // }

        // function computeRightConstraints(nodeIndex){
        //   var rightNodes = nodes[nodeIndex].rightNodes;

        //   if(rightNodes){
        //     rightNodes = rightNodes.filter(function(nodeIndex){
        //   if( !nodes[nodeIndex])
        //     console.log("nodeIndex=" + nodeIndex + " rightNodes=" + rightNodes);
        //       return nodes[nodeIndex].left==1;
        //     });
        //   }
        //   else{
        //     return null;
        //   }

        //   if(rightNodes.length>1){
        //     return createAlignmentConstraints('x', rightNodes);
        //   }
        //   return null;
        // }

        // function createAlignmentConstraints(axis, nodes){
        //   return {
        //     type: 'alignment',
        //     axis: axis,
        //     offsets: nodes.map(function(nodeIndex){
        //       return {node: nodeIndex, offset: 0}
        //     })
        //   };
        // }

        // function isLeafNode(node){
        //   return !node.left || !node.right;
        // }

        function showTooltip(d) {
          var tooltipDiv = document.getElementById('tweet-display-area');
          if( d.leafSeq.DBs[0].tweetId ) {
            tooltipDiv.innerHTML = '<span class="loading-text">Loading Tweet...</span>';

            twttr.widgets.createTweetEmbed(d.leafSeq.DBs[0].tweetId, tooltipDiv, function done(){
              tooltipDiv.getElementsByClassName('loading-text')[0].innerHTML = '';
            }, {
              cards: 'hide'
            });
          }
          else
            tooltipDiv.innerHTML = '<p>' + d.leafSeq.DBs[0].rawText + '</p>';
        }

        function showExampleTexts(d) {
          var tooltipDiv = document.getElementById('tweet-display-area');
          var html = '';
          for (var i = 0; i < 5; i++ ) {
            if (d.leafSeq.DBs[i]) {
              html += '<p><span style="font-size:16px">' + d.leafSeq.DBs[i].rawText + '</span></p>';
            }
          }
          tooltipDiv.innerHTML = html;
        }

        function clearExampleTexts() {
          var tooltipDiv = document.getElementById('tweet-display-area');
          tooltipDiv.innerHTML = '<div />';
        }
      };




      scope.$watch('graph', function() {
        //console.log("graph changed");
        /*
        console.log("graph = " + scope.graph.nodes.length);
        var outer = d3.select(elements[0]).select('svg');
        outer.on('click', function() {
          sentenforestCtrl.testzoomin(scope);
          console.log("clicked " + scope.graph.nodes.length);
        });*/
        scope.initView();
        scope.showView();
      });
    }
  };
}]);

//---------------------------------------------------
// END code for this directive
//---------------------------------------------------
});