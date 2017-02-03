var phrasetree = function() {
	var width = 1600;
	var height = 800;

	var outer = d3.select("#vis").append("svg")
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

	function redraw() {
	    vis.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
	}

	//var sentPatt = /first( | .* )goal( | .* )world( | .* )cup/g;
	var sentPatt = new RegExp('first( | .* )goal( | .* )world( | .* )cup', 'g');

	console.log(sentPatt.exec('first goal of world cup is an own goal'));

	d3.text("data/test.tsv", function(text) {
	    d3.tsv.parseRows(text, function(r) {
	    	console.log(r);
	        s = sentPatt.exec(r[1]);
	        if(s) {
	            console.log(s);
	            return s;
	        }
	        else
	            return null;
	    });
	});
}

phrasetree();