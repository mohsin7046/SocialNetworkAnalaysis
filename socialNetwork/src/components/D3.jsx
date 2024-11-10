import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Graph = ({ users, nodes, links }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const wrapper = d3.select(wrapperRef.current);
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous content

    const width = wrapper.node().clientWidth; // Use container width
    const height = wrapper.node().clientHeight; // Use container height

    // Add zoom and pan functionality
    const zoom = d3.zoom().scaleExtent([0.5, 2]).on('zoom', (event) => {
      svg.attr('transform', event.transform);
    });

    const container = svg.append('g').call(zoom);

    // Set up the simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', ticked);

    // Draw links (edges)
    const link = container
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 2);

    // Draw link labels
    const linkLabel = container
      .append('g')
      .selectAll('text')
      .data(links)
      .join('text')
      .attr('class', 'link-label')
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .attr('fill', '#666')
      .text(
        (d) =>
          `${users.find((u) => u.id === d.source.id)?.name} - ${users.find((u) => u.id === d.target.id)?.name}`
      );

    // Draw nodes (circles)
    const node = container
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 30) // Increased radius for better label fitting
      .attr('fill', '#1f77b4')
      .call(drag(simulation));

    // Draw node labels
    const nodeLabel = container
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('dy', 4) // Adjust label position
      .attr('dx', 0)
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .attr('fill', '#fff')
      .text((d) => users.find((u) => u.id === d.id)?.name); // Display user names on nodes

    // Update the positions of nodes and links
    function ticked() {
      link
        .attr('x1', (d) => Math.max(0, Math.min(width, d.source.x)))
        .attr('y1', (d) => Math.max(0, Math.min(height, d.source.y)))
        .attr('x2', (d) => Math.max(0, Math.min(width, d.target.x)))
        .attr('y2', (d) => Math.max(0, Math.min(height, d.target.y)));

      linkLabel
        .attr('x', (d) => (d.source.x + d.target.x) / 2)
        .attr('y', (d) => (d.source.y + d.target.y) / 2);

      node.attr('cx', (d) => Math.max(20, Math.min(width - 20, d.x))).attr('cy', (d) => Math.max(20, Math.min(height - 20, d.y)));

      nodeLabel.attr('x', (d) => Math.max(20, Math.min(width - 20, d.x))).attr('y', (d) => Math.max(20, Math.min(height - 20, d.y)));
    }

    // Define drag behavior
    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
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

      return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
    }
  }, [nodes, links, users]);

  return (
    <div ref={wrapperRef} className="w-full h-screen max-w-full max-h-full overflow-hidden relative">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default Graph;
