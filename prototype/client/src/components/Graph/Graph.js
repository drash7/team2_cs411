import React, { Component } from 'react';
import * as d3 from 'd3';
import { select } from 'd3-selection';
import colors from "./Colors";
import './../../assets/css/graph.css';


class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewLabel: "hidden",
            titleStyle: {
                display: "inline"
            }
        };
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

        // Color for all stroke related things
        const stroke_color = "#171717";

        // Force simulation treats nodes as "particles" with repelling and attracting forces
        const simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody(links).strength(-200 * this.props.width / 2100))
            .force("link", d3.forceLink(links).id(d => d.id).strength(0.0001))
            .force("x", d3.forceX().x(d => {
                switch (d.__proto__.source) {
                    case this.props.users.user1:
                        return -this.props.width / 4;
                    case this.props.users.user2:
                        return this.props.width / 4;
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
            .attr("stroke", stroke_color)
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.07);

        // Give node properties
        const node = select(NODE)
            .attr("stroke", "#171717")
            .attr("stroke-width", 0)
            .selectAll("circle")
            .data(nodes)
            .join("g")
            .attr("class", "node")
            .append("circle")
            .attr("r", 10)
            .attr("fill", d => node_color(d.__proto__.genres[0]))
            .attr("fill-opacity", 1)
            .call(drag(simulation))
            .style("cursor", "pointer")

        // Responsible for link and hover behavior for links and nodes
        select(NODE).selectAll("circle")
            .on('mouseover', function (d, i) {
                let artist = i.__proto__;

                // Accent links with hovered artist, lighten those that aren't
                link.transition()
                    .duration(100)
                    .attr("stroke-width", d => artist.id === d.__proto__.source || artist.id === d.__proto__.target ? 2 : 1)
                    .attr("stroke-opacity", d => artist.id === d.__proto__.source || artist.id === d.__proto__.target ? 0.9 : 0.02);

                // Hide away nodes that aren't either hovered or connected to
                node.transition()
                    .duration(100)
                    .attr("fill-opacity", d => {
                        if (artist.association.includes(d.__proto__.id) || artist.id === d.__proto__.id) {
                            return 1
                        } else {
                            return 0
                        }
                    });

                // Make the hovered node a bicc boi
                select(this).transition()
                    .duration(100)
                    .attr("r", 25);
            })
            .on('mouseout', function (d, i) {
                // Make links go back to normal
                link.transition()
                    .duration(100)
                    .attr("stroke-width", 1)
                    .attr("stroke-opacity", 0.07);

                // Make nodes go back to normal
                node.transition()
                    .duration(100)
                    .attr("fill-opacity", 1);

                // Make current node be normal sized
                select(this).transition()
                    .duration(100)
                    .attr("r", 10);
            });

        // Append labels to nodes
        // Label appears based on node hover behavior
        const nameLabels = select(NODE).selectAll("g").append("g")

        nameLabels
            .attr("class", "label")

        // BACKGROUND RECTANGLE
        nameLabels
            .append("rect")
            // Calculate width of rectangle based off of length of text using some heuristics
            .attr("width", d => {
                let n = d.id.length;
                let g = d.genres.slice(0, 3).toString().length;
                let s = d.source.length;
                let max = Math.max(n, g, s);
                let result = 90
                if (max === g || max === s) {
                    result += (8 + Math.max(n, g, s)) * 10
                } else {
                    result += (8 + Math.max(n, g, s)) * 11
                }
                return result
            })
            .attr("height", 90)
            .attr("fill", "white")
            .attr("stroke-opacity", 1)
            .attr("stroke", stroke_color)
            .attr("stroke-width", 1)
            .attr("rx", 10)
            .style("text-shadow", "1em");

        // ARTIST IMAGE
        nameLabels
            .append("image")
            .attr('width', 70)
            .attr('height', 70)
            .attr("x", 10)
            .attr("y", 10)
            .attr('xlink:href', function (d) {
                return d.photo;
            })

        // ARTIST NAME
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

        // GENRES
        nameLabels
            .append("text")
            .style("font-size", 14)
            .attr("x", 90)
            .attr("y", 65)
            .attr("letter-spacing", "0.0625em")
            .text(function (d) {
                return "Genres: " + d.genres.slice(0, 3)
            })

        // Clicking on node leads to artist spotify page
        node.on("click", (d, i) => {
            let artist = i.__proto__;
            window.open(artist.url, "_blank");
        });

        // What to do when there has been a layout change in the graph
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
        return (
            // Wraps Around graph
            <div className="graphWrapper">
                {/* Labels */}
                <span style={{ width: "100%", textAlign: "center", display: "block" }}>
                    <h2 style={{ display: "inline-block", width: "30%" }}>{this.props.users.user1}</h2>
                    <h2 style={{ display: "inline-block", width: "30%" }}>Both</h2>
                    <h2 style={{ display: "inline-block", width: "30%" }}>{this.props.users.user2}</h2>
                </span>
                {/* Graph SVG */}
                <svg className=".svg-container" ref={node => this.node = node}
                    width={this.props.width} height={this.props.height}>
                </svg>
            </div>
        )
    }
}
export default Graph