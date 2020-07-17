import { animals, links } from './data.js';
const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);
// STRENGTH & FORCE SIMULATION
const simulation = d3.forceSimulation(animals)
  .force('charge', d3.forceManyBody().strength(-200))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('link', d3.forceLink(links)
    .id(link => link.id)
    .strength(link => link.strength))


const getNodeColor = node => (node.level === 1) ? 'red' : 'gray';
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



let nodeElements = svg.append('g')
  .selectAll('circle')
  .data(animals)
  .enter().append('circle')
  .attr('r', 10)
  .attr('fill', getNodeColor)
  .call(dragDrop);

let textElements = svg.append('g')
  .selectAll('text')
  .data(animals)
  .enter().append('text')
  .text(node => node.label)
  .attr('font-size', 18)
  .attr('dx', 15)
  .attr('dy', 4);

let linkElements = svg.append('g')
  .selectAll('line')
  .data(links)
  .enter().append('line')
  .attr('stroke-width', 1)
  .attr('stroke', '#f95f40');



// THICK SIMULATION
simulation.nodes(animals).on("tick", () => {
  nodeElements
    .attr("cx", node => node.x)
    .attr("cy", node => node.y);
  textElements
    .attr("x", node => node.x)
    .attr("y", node => node.y);
  linkElements
    .attr('x1', link => link.source.x)
    .attr('y1', link => link.source.y)
    .attr('x2', link => link.target.x)
    .attr('y2', link => link.target.y)
});



function getNeighbors(node) {
  return links.reduce((neighbors, link) => {
    if (link.target.id === node.id) {
      neighbors.push(link.source.id)
    } else if (link.source.id === node.id) {
      neighbors.push(link.target.id)
    } return neighbors
  }, [node.id])
};

function getNodeColors(node, neighbors) {
  if (neighbors.indexOf(node.id)) return node.level === 1 ? 'blue' : 'green';
  else return node.level === 1 ? 'red' : 'gray';
}

const isNeighborLink = (node, link) => link.target.id === node.id || link.source.id === node.id;

const getTextColor = (node, neighbors) => neighbors.indexOf(node.id) ? 'green' : 'black';

const getLinkColor = (node, link) => isNeighborLink(node, link) ? 'green' : '#E5E5E5';

nodeElements.on('click', selectNode);

function selectNode(selectedNode) {
  const neighbors = getNeighbors(selectedNode)
  nodeElements
    .attr('fill', node => getNodeColors(node, neighbors));
  textElements
    .attr('fill', node => getTextColor(node, neighbors));
  linkElements
    .attr('stroke', link => getLinkColor(selectedNode, link));
}

function updateData(selectedNode) {
  const neighbors = getNeighbors(selectedNode);
  const newNodes = baseNodes.filter(node => neighbors.indexOf(node.id) > -1 || node.level === 1);

  const diff = {
    removed: nodes.filter(node => newNodes.indexOf(node) === -1),
    added: newNodes.filter(node => nodes.indexOf(node) === -1)
  }
  diff.removed.forEach(node => nodes.splice(nodes.indexOf(node), 1))
  diff.added.forEach(node => nodes.push(node))
  links = baseLinks.filter(link => {
    return link.target.id === selectedNode.id ||
      link.source.id === selectedNode.id
  })
}

const linkGroup = svg.append('g').attr('class', 'links');
const nodeGroup = svg.append('g').attr('class', 'nodes');
const textGroup = svg.append('g').attr('class', 'texts');

function updateGraph() {
  // links
  linkElements = linkGroup.selectAll('line').data(links, link => link.target.id + link.source.id)
  linkElements.exit().remove()

  const linkEnter = linkElements.enter().append('line').attr('stroke-width', 1).attr('stroke', 'rgba(50, 50, 50, 0.2)')

  linkElements = linkEnter.merge(linkElements)

  // nodes
  nodeElements = nodeGroup.selectAll('circle').data(animals, node => node.id)
  nodeElements.exit().remove()

  const nodeEnter = nodeElements
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('fill', node => node.level === 1 ? 'red' : 'gray')
    .call(dragDrop)
    // we link the selectNode method here
    // to update the graph on every click
    .on('click', selectNode)

  nodeElements = nodeEnter.merge(nodeElements)

  // texts
  textElements = textGroup.selectAll('text').data(animals, node => node.id)
  textElements.exit().remove()

  const textEnter = textElements
    .enter()
    .append('text')
    .text(node => node.label)
    .attr('font-size', 15)
    .attr('dx', 15)
    .attr('dy', 4)

  textElements = textEnter.merge(textElements)
}

function updateSimulation() {
  updateGraph()

  simulation.nodes(animals).on('tick', () => {
    nodeElements.attr('cx', node => node.x).attr('cy', node => node.y)
    textElements.attr('x', node => node.x).attr('y', node => node.y)
    linkElements
      .attr('x1', link => link.source.x)
      .attr('y1', link => link.source.y)
      .attr('x2', link => link.target.x)
      .attr('y2', link => link.target.y)
  })

  simulation.force('link')
  simulation.restart()
}

// last but not least, we call updateSimulation
// to trigger the initial render
updateSimulation()