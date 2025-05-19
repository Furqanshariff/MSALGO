// Dijkstra's Algorithm Implementation
class Dijkstra {
    constructor(graph) {
        this.graph = graph;
        this.steps = [];
        this.startNode = 0;
        this.endNode = 4;
    }

    // Generate steps for Dijkstra's Algorithm visualization
    generateSteps() {
        this.steps = [];
        this.dijkstra();
        return this.steps;
    }

    // Dijkstra's Algorithm implementation
    dijkstra() {
        const distances = new Array(this.graph.nodes.length).fill(Infinity);
        const visited = new Array(this.graph.nodes.length).fill(false);
        const previous = new Array(this.graph.nodes.length).fill(null);
        
        distances[this.startNode] = 0;

        // Add initial step
        this.steps.push({
            type: 'graph',
            nodes: [this.startNode],
            edges: [],
            nodeClass: 'visited',
            explanation: 'Starting Dijkstra\'s algorithm from node 0'
        });

        while (true) {
            // Find the unvisited node with the smallest distance
            let minDistance = Infinity;
            let currentNode = -1;

            for (let i = 0; i < distances.length; i++) {
                if (!visited[i] && distances[i] < minDistance) {
                    minDistance = distances[i];
                    currentNode = i;
                }
            }

            if (currentNode === -1) break;

            visited[currentNode] = true;

            // Add step to show current node being processed
            this.steps.push({
                type: 'graph',
                nodes: [currentNode],
                edges: [],
                nodeClass: 'current',
                explanation: `Processing node ${currentNode} with distance ${distances[currentNode]}`
            });

            // Check all neighbors
            this.graph.edges.forEach((edge, edgeIndex) => {
                if (edge.from === currentNode || edge.to === currentNode) {
                    const neighbor = edge.from === currentNode ? edge.to : edge.from;
                    
                    if (!visited[neighbor]) {
                        const newDistance = distances[currentNode] + edge.weight;

                        // Add step to show edge being considered
                        this.steps.push({
                            type: 'graph',
                            nodes: [currentNode, neighbor],
                            edges: [edgeIndex],
                            edgeClass: 'considering',
                            explanation: `Checking path to node ${neighbor} with weight ${edge.weight}`
                        });

                        if (newDistance < distances[neighbor]) {
                            distances[neighbor] = newDistance;
                            previous[neighbor] = currentNode;

                            // Add step to show distance update
                            this.steps.push({
                                type: 'graph',
                                nodes: [neighbor],
                                edges: [edgeIndex],
                                nodeClass: 'updated',
                                edgeClass: 'path',
                                explanation: `Updated distance to node ${neighbor}: ${newDistance}`
                            });
                        }
                    }
                }
            });
        }

        // Reconstruct and show the shortest path
        const path = [];
        let current = this.endNode;
        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }

        // Add final step to show the shortest path
        this.steps.push({
            type: 'graph',
            nodes: path,
            edges: this.getPathEdges(path),
            nodeClass: 'path',
            edgeClass: 'path',
            explanation: `Shortest path found: ${path.join(' -> ')} with total distance ${distances[this.endNode]}`
        });
    }

    // Helper function to get edges in the path
    getPathEdges(path) {
        const pathEdges = [];
        for (let i = 0; i < path.length - 1; i++) {
            const from = path[i];
            const to = path[i + 1];
            const edgeIndex = this.graph.edges.findIndex(edge => 
                (edge.from === from && edge.to === to) || (edge.from === to && edge.to === from)
            );
            if (edgeIndex !== -1) {
                pathEdges.push(edgeIndex);
            }
        }
        return pathEdges;
    }
}

// Extend the Visualizer class with Dijkstra's Algorithm implementation
Visualizer.prototype.generateDijkstraSteps = function() {
    const dijkstra = new Dijkstra(this.graph);
    return dijkstra.generateSteps();
}; 