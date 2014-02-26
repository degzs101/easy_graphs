var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var graph = {
  "nodes":[
      { "type": "uri", "value": "http://data.cso.ie/census-2011/classification/PR/P1" } ,
      { "type": "uri", "value": "http://data.cso.ie/census-2011/classification/PR/P1" }
   
      
  ],
  "links":[
     { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#int", "value": "2504814" },
     { "type": "typed-literal", "datatype": "http://www.w3.org/2001/XMLSchema#int", "value": "1530811" }
      
  ]
}

//d3.json {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.type.x; })
        .attr("y1", function(d) { return d.type.y; })
        .attr("x2", function(d) { return d.value.x; })
        .attr("y2", function(d) { return d.value.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
//});
