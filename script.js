
// function updateData(selectedNode) {
//   const neighbors = getNeighbors(selectedNode);
//   const newNodes = baseNodes.filter(node => neighbors.indexOf(node.id) > -1 || node.level === 1);

//   const diff = {
//     removed: nodes.filter(node => newNodes.indexOf(node) === -1),
//     added: newNodes.filter(node => nodes.indexOf(node) === -1)
//   }
//   diff.removed.forEach(node => nodes.splice(nodes.indexOf(node), 1))
//   diff.added.forEach(node => nodes.push(node))
//   links = baseLinks.filter(link => {
//     return link.target.id === selectedNode.id ||
//       link.source.id === selectedNode.id
//   })
// }

const linkGroup = svg.append('g').attr('class', 'links');
const nodeGroup = svg.append('g').attr('class', 'nodes');
const textGroup = svg.append('g').attr('class', 'texts');

// function updateGraph() {
//   // links
//   linkElements = linkGroup.selectAll('line').data(links, link => link.target.id + link.source.id)
//   linkElements.exit().remove()

//   const linkEnter = linkElements.enter().append('line').attr('stroke-width', 1).attr('stroke', 'rgba(50, 50, 50, 0.2)')

//   linkElements = linkEnter.merge(linkElements)

//   // nodes
//   nodeElements = nodeGroup.selectAll('circle').data(animals, node => node.id)
//   nodeElements.exit().remove()

//   const nodeEnter = nodeElements
//     .enter()
//     .append('circle')
//     .attr('r', 10)
//     .attr('fill', node => node.level === 1 ? 'red' : 'gray')
//     .call(dragDrop)
//     // we link the selectNode method here
//     // to update the graph on every click
//     .on('click', selectNode)

//   nodeElements = nodeEnter.merge(nodeElements)

//   // texts
//   textElements = textGroup.selectAll('text').data(animals, node => node.id)
//   textElements.exit().remove()

//   const textEnter = textElements
//     .enter()
//     .append('text')
//     .text(node => node.label)
//     .attr('font-size', 15)
//     .attr('dx', 15)
//     .attr('dy', 4)

//   textElements = textEnter.merge(textElements)
// }

// function updateSimulation() {
//   updateGraph()

//   simulation.nodes(animals).on('tick', () => {
//     nodeElements.attr('cx', node => node.x).attr('cy', node => node.y)
//     textElements.attr('x', node => node.x).attr('y', node => node.y)
//     linkElements
//       .attr('x1', link => link.source.x)
//       .attr('y1', link => link.source.y)
//       .attr('x2', link => link.target.x)
//       .attr('y2', link => link.target.y)
//   })

//   simulation.force('link')
//   simulation.restart()
// }

// // last but not least, we call updateSimulation
// // to trigger the initial render
// updateSimulation()