import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'
import { animals, links } from './data.js';

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    nodes: animals,
    textElements: {},
    linkElements: {},
    nodeElements: {},
    selectedItem: {
      name: "",
      neighbors: [],
      color:""
    }
  },
  mounted() {
    this.generateNodes();
  },
  computed: {

  },
  methods: {
    generateNodes() {
      const width = window.innerWidth / 1.4;
      const height = window.innerHeight;

      const svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);
      // STRENGTH & FORCE SIMULATION
      const simulation = d3.forceSimulation(animals)
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('link', d3.forceLink(links)
          .id(link => link.id)
          .distance(0)
          .strength(link => link.strength))

      // DRAG AND DROP HANDLER
      const dragDrop = d3.drag()
        .on('start', node => {
          node.fx = node.x
          node.fy = node.y
        })
        .on('drag', node => {
          simulation.alphaTarget(0.7).restart()
          node.fx = d3.event.x
          node.fy = d3.event.y
        })
        .on('end', node => {
          if (!d3.event.active) {
            simulation.alphaTarget(0)
          }
          node.fx = null
          node.fy = null
        });
      this.textElements = svg.append('g')
        .selectAll('text')
        .data(animals)
        .enter().append('text')
        .text(node => node.label)
        .attr('font-size', 18)
        .attr('dx', 15)
        .attr('dy', 4);

      this.linkElements = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke-width', 1)
        .attr('stroke', '#f95f40');
      this.nodeElements = svg.append('g')
        .selectAll('circle')
        .data(animals)
        .enter().append('circle')
        .attr('r', 10)
        .attr('fill', this.getNodeColor)
        .attr('data-id', d => d.id)
        .on('click', this.getNodeInfo)
        .call(dragDrop)

      // THICK SIMULATION
      simulation.nodes(animals).on("tick", () => {
        this.nodeElements
          .attr("cx", node => node.x)
          .attr("cy", node => node.y)
        this.textElements
          .attr("x", node => node.x)
          .attr("y", node => node.y);
        this.linkElements
          .attr('x1', link => link.source.x)
          .attr('y1', link => link.source.y)
          .attr('x2', link => link.target.x)
          .attr('y2', link => link.target.y)
      })

      this.nodeElements.on('click', this.getNodeInfo);
    },
    getNodeInfo(e) {
      this.selectedItem.name = e.id;
      this.selectedItem.color = this.getNodeColor(e);
      this.selectNode(e)
    },
    selectNode(selectedNode) {
      const neighbors = this.getNeighbors(selectedNode)
      this.selectedItem.neighbors = neighbors;
      
      this.nodeElements
        .attr('fill', node => this.getNodeColors(node, neighbors));
      this.textElements
        .attr('fill', node => this.getTextColor(node, neighbors));
      this.linkElements
        .attr('stroke', link => this.getLinkColor(selectedNode, link));
    },
    getNeighbors(node) {
      return links.reduce((neighbors, link) => {
        if (link.target.id === node.id) {
          neighbors.push(link.source.id)
        } else if (link.source.id === node.id) {
          neighbors.push(link.target.id)
        } return neighbors
      }, [node.id])
    },
    getNodeColors(node, neighbors) {
      console.log(node.id);
      if (node.level === 0) return 'rgb(112, 81, 35)';
      if (neighbors.indexOf(node.id)) return node.level === 1 ? 'blue' : 'green';
      return node.level === 1 ? 'red' : 'gray';
    },
    getTextColor(node, neighbors) {
      return neighbors.indexOf(node.id) ? 'green' : 'black'
    },
    getLinkColor(node, link) {
      return this.isNeighborLink(node, link) ? 'green' : '#E5E5E5';
    },
    isNeighborLink(node, link) {
      return link.target.id === node.id || link.source.id === node.id
    },
    getNodeColor(node) {
      if (node.level === 0) return 'rgb(112, 81, 35)';
      if (node.level === 1) return 'rgb(175, 134, 71)';
      if (node.level === 2) return 'rgb(8, 134, 18)';
    }
  }
})