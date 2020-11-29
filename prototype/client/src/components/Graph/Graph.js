import React, { Component } from 'react';
import * as d3 from 'd3';
import { select } from 'd3-selection';
import colors from "./Colors";
import './../../assets/css/graph.css';
import { max } from 'd3';


class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = { viewLabel: "hidden" };
        this.createGraph = this.createGraph.bind(this)
    }
    componentDidMount() {
        this.createGraph()
    }
    componentDidUpdate() {
        this.createGraph()
    }
    // This builds the actual graph
    createGraph() {
        const NODE = this.node;

        // Centers the graph view based on passed-in width and height parameter
        select(NODE)
            .attr(
                "viewBox",
                [-this.props.width / 2, -this.props.height / 2, this.props.width, this.props.height]
            );

        // Function implements dragging behavior of nodes
        function drag(simulation) {

            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(1).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        // Passed in graph
        const graph = this.props.graph

        const links = graph.links.map(d => Object.create(d));
        const nodes = graph.nodes.map(d => Object.create(d));

        // Node Coloring Based off of genres
        const node_color = d3.scaleOrdinal()
            .domain(new Set(graph.nodes.map(n => n.genres[0])))
            .range(colors.genreColors);

        // Right now, the color for links is static, no matter what
        function link_color(d) {
            return "#171717";
        }

        // Force simulation treats nodes as "particles" with repelling and attracting forces
        const simulation = d3.forceSimulation(nodes)
            // .force("link", d3.forceLink(links).id(d => d.id).distance(200).strength(0.1))
            .force("charge", d3.forceManyBody(links).strength(-200))
            .force("link", d3.forceLink(links).id(d => d.id).strength(0.0001))
            .force("x", d3.forceX().x(d => {

                switch (d.__proto__.source) {
                    case this.props.users.user1:
                        return -500;
                    case this.props.users.user2:
                        return 500;
                    default:
                        return 0;
                }
            }))
            .force("y", d3.forceY());

        // Give link properties
        const link = select(NODE)
            .attr("stroke-opacity", 0)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke", d => link_color(d))
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.07);

        // Give node properties
        const node = select(NODE)
            .attr("stroke", "#171717")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 0.7)
            .selectAll("circle")
            .data(nodes)
            .join("g")
            .attr("class", "node")
            .append("circle")
            .attr("r", 10)
            .attr("fill", d => node_color(d.__proto__.genres[0]))
            .call(drag(simulation))
            .style("cursor", "pointer")
        
            select(NODE).selectAll("circle")
                .on('mouseover', function (d, i) {
                    select(this).transition()
                        .duration('50')
                        .attr("r", 20)
                })
                .on('mouseout', function (d, i) {
                    select(this).transition()
                        .duration('50')
                        .attr("r", 10)
                });
            
        
        // Append labels to nodes
        // Label appears based on node hover behavior
        const nameLabels = select(NODE).selectAll("g").append("g")

        nameLabels
            .attr("class", "label")
        
        // RECTANGLE
        nameLabels
            .append("rect")
            .attr("width", d => {
                let n = d.id.length;
                let g = d.genres.slice(0, 3).toString().length;
                let s = d.source.length;
                let max = Math.max(n, g, s);
                let result = 90
                if (max == g || max == s){
                    result += (8+Math.max(n, g, s))*10
                } else {
                    result += (8+Math.max(n, g, s))*11
                }
                return result
            })
            .attr("height", 90)
            .attr("fill", "white")
            // .attr("stroke-width", 0.5)
            // .attr("stroke", "#CCCCCC")
            .attr("rx", 10)
            .style("text-shadow", "1em");
        
        // IMAGE
        nameLabels
            .append("image")
            // .attr("class", "label")
            .attr('width', 70)
            .attr('height', 70)
            .attr("x", 10)
            .attr("y", 10)
            .attr('xlink:href', function (d) { 
                console.log(d.photo);
                return d.photo;
            })

        // NAME
        nameLabels
            .append("text")
            .style("font-size", 18)
            .attr("x", 90)
            .attr("y", 25)
            // .attr("letter-spacing", "0.0625em")
            .text(function (d) { return d.id })
        
        // SOURCE
        nameLabels
            .append("text")
            .style("font-size", 14)
            .attr("x", 90)
            .attr("y", 45)
            .attr("letter-spacing", "0.0625em")
            .text(function (d) { return "Source: " + d.source })

        // Genres
        nameLabels
            .append("text")
            .style("font-size", 14)
            .attr("x", 90)
            .attr("y", 65)
            .attr("letter-spacing", "0.0625em")
            .text(function (d) { 
                return "Genres: " + d.genres.slice(0, 3)
            })

        node.on("click", (d, i) => {
                let artist = i.__proto__;
                window.open(artist.url, "_blank");
        });
        

        // What to do when there has been a layout change in the grap
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            nameLabels
                .attr("transform", d => {
                    return "translate(" + d.x + "," + d.y + ")"
                });
        });
    }

    // Render the actual graph, appending it to an SVG (scaleable vector graphic.) using ref
    render() {
        return <svg className=".svg-container" ref={node => this.node = node}
            width={this.props.width} height={this.props.height}>
        </svg>
    }
}
export default Graph