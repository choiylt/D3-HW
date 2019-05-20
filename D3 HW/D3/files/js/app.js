// @TODO: YOUR CODE HERE!

var svgWidth = 900;
var svgHeight = 500;

var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};

var crtWidth = svgWidth - margin.left - margin.right;
var crtHeight = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "chart");

var chartGroup = svg.append("g")
     .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("files/data/data.csv")
    .then(function(healthData) {

    healthData.forEach(function(data) {
        data.abbr = data.abbr;
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;

    });

    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(healthData, d => d.poverty)])
      .range([0, crtWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([4, d3.max(healthData, d => d.healthcare)])
        .range([crtHeight, 0]);

    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${crtHeight})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

      var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("class", "stateCircle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .text( function (d) { console.log(d.abbr);})

    var text = chartGroup.selectAll(null)
        .data(healthData)
        .enter()
        .insert("text")
        .attr("class", "stateText")
        .attr("dx", d => xLinearScale(d.poverty) )
        .attr("dy", d => yLinearScale(d.healthcare) +3 )
        .text( function (d) { return d.abbr})
        .attr("font-size", "8px")
        .attr("fill", "black");

        svg.append("text")
            .attr("class", "active")
            .attr("text-anchor", "end")
            .attr("y", 0)
            .attr("dy", "1.35em")
            .attr("dx", "-12.8em")
            .attr("transform", "rotate(-90)")
            .text("Lacks Healthcare (%)");

        svg.append("text")
            .attr("class", "active")
            .attr("text-anchor", "end")
            .attr("x", svgWidth - 350)
            .attr("y", svgHeight - 6)
            .text("In Poverty (%)");

    });
