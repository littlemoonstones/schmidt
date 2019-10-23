var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};
var width = window.innerWidth - margin.left - margin.right // Use the window's width 
    ,
    height = (window.innerHeight - margin.top - margin.bottom) / 2; // Use the window's height

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, 1]) // input
    .range([1, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([0, 100]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    .x(function (d, i) {
        return xScale(d.x);
    }) // set the x values for the line generator
    .y(function (d) {
        return yScale(d.y);
    }) // set the y values for the line generator 
    .curve(d3.curveLinear) // apply smoothing to the line
function drawChart(N, dataset) {
    // 2. Use the margin convention practice 

    var width = window.innerWidth - margin.left - margin.right // Use the window's width 
        ,
        height = (window.innerHeight - margin.top - margin.bottom) / 2; // Use the window's height

    // The number of datapoints
    var n = N;



    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    // var dataset = d3.range(n).map(function(d) {
    //     return {
    //         "y": d3.randomUniform(1)()
    //     }
    // })

    //  console.log("dataset", dataset);

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom
    // X-label
    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top - 10) + ")")
        .style("text-anchor", "middle")
        .text("x (mm)");
    // Y-label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Temperature (˚C)");

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

    // 12. Appends a circle for each datapoint 
    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function (d, i) {
            return xScale(d.x)
        })
        .attr("cy", function (d) {
            return yScale(d.y)
        })
        .attr("r", 2)
        .on("mouseover", function (a, b, c) {
            console.log(a)
            this.attr('class', 'focus')
        })
        .on("mouseout", function () { })


    svg.selectAll(".dotted-line")
        .data(dataset)
        .enter()
        .append("line")
        .attr("x1", function (d) {
            return xScale(d.x)
        })  //<<== change your code here
        .attr("y1", 0)
        .attr("x2", (d) => xScale(d.x))  //<<== and here
        .attr("y2", height)
        .attr("class", "dotted")
        .style("stroke-width", 0)
        .style("stroke", "red")
        .style("stroke-dasharray", ("3, 3"))
        .style("fill", "none");
}

function update(dataset) {
    var width = window.innerWidth - margin.left - margin.right // Use the window's width 
        ,
        height = (window.innerHeight - margin.top - margin.bottom) / 2; // Use the window's height

    var svg = d3.select("body");
    svg.selectAll('.line')
        .datum(dataset)
        .attr("d", line);
    svg.selectAll(".dot")
        .data(dataset)
        .attr("cy", function (d) {
            return yScale(d.y)
        })

}