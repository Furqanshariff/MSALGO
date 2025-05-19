class Visualizer {
    constructor() {
        this.currentAlgorithm = null;
        this.array = [];
        this.isRunning = false;
        this.currentStep = 0;
        this.steps = [];
        this.explanations = [];
        this.previousStates = []; // Store all previous states
        this.currentPseudocodeLine = -1; // Track current pseudocode line
    }

    // Initialize the visualizer with an algorithm
    init(algorithm) {
        console.log('Initializing visualizer with algorithm:', algorithm);
        this.currentAlgorithm = algorithm;
        this.reset();
    }

    // Reset the visualization
    reset() {
        console.log('Resetting visualization');
        this.isRunning = false;
        this.currentStep = 0;
        this.steps = [];
        this.explanations = [];
        this.previousStates = [];
        this.resetPseudocodeHighlight();
        
        // Generate new array based on algorithm type
        if (this.currentAlgorithm.includes('Search')) {
            this.array = utils.generateArray(15).sort((a, b) => a - b);
        } else if (this.currentAlgorithm === 'dijkstra') {
            this.initializeGraph();
        } else {
            this.array = utils.generateArray();
        }

        // Create visualization
        if (this.currentAlgorithm === 'dijkstra') {
            this.createGraph();
            // Hide array display for Dijkstra's algorithm
            const arrayDisplay = document.querySelector('.array-display');
            if (arrayDisplay) {
                arrayDisplay.style.display = 'none';
            }
        } else {
            utils.createBars(this.array);
            // Show array display for other algorithms
            const arrayDisplay = document.querySelector('.array-display');
            if (arrayDisplay) {
                arrayDisplay.style.display = 'flex';
            }
        }

        utils.updateExplanation('Select an algorithm and click Start to begin visualization.');
        utils.toggleControls(true);
    }

    // Start the visualization
    async start() {
        if (this.isRunning) return;
        
        console.log('Starting visualization for algorithm:', this.currentAlgorithm);
        this.isRunning = true;
        utils.toggleControls(true, true);
        
        // Generate steps based on algorithm
        switch (this.currentAlgorithm) {
            case 'quickSort':
                this.steps = this.generateQuickSortSteps();
                break;
            case 'mergeSort':
                this.steps = this.generateMergeSortSteps();
                break;
            case 'bubbleSort':
                this.steps = this.generateBubbleSortSteps();
                break;
            case 'binarySearch':
                this.steps = this.generateBinarySearchSteps();
                break;
            case 'linearSearch':
                this.steps = this.generateLinearSearchSteps();
                break;
            case 'dijkstra':
                this.steps = this.generateDijkstraSteps();
                break;
            default:
                console.log('No algorithm selected');
                this.isRunning = false;
                utils.toggleControls(true, false);
                return;
        }

        console.log('Generated steps:', this.steps.length);

        // Reset current step
        this.currentStep = 0;

        // Execute steps
        while (this.currentStep < this.steps.length && this.isRunning) {
            console.log('Executing step:', this.currentStep);
            await this.executeStep(this.currentStep);
            this.currentStep++;
            await utils.sleep(500);
        }

        this.isRunning = false;
        utils.toggleControls(true, false);
    }

    // Stop the visualization
    stop() {
        console.log('Stopping visualization');
        this.isRunning = false;
        utils.toggleControls(true, false);
    }

    // Execute a single step
    async executeStep(stepIndex) {
        const step = this.steps[stepIndex];
        if (!step) {
            console.log('No step found at index:', stepIndex);
            return;
        }

        console.log('Executing step:', step);

        // Store current state before making changes
        if (step.type === 'swap') {
            this.previousStates[stepIndex] = [...this.array];
        }

        // Update visualization based on step type
        if (step.type === 'compare') {
            utils.updateBarColors(step.indices, 'comparing');
        } else if (step.type === 'swap') {
            // Update array
            [this.array[step.indices[0]], this.array[step.indices[1]]] = 
            [this.array[step.indices[1]], this.array[step.indices[0]]];
            
            // Update visualization
            utils.createBars(this.array);
        } else if (step.type === 'sorted') {
            utils.updateBarColors(step.indices, 'sorted');
        } else if (step.type === 'graph') {
            this.updateGraph(step);
        }

        // Update explanation and pseudocode line
        utils.updateExplanation(step.explanation);
        if (step.pseudocodeLine !== undefined) {
            this.highlightPseudocodeLine(step.pseudocodeLine);
        }
    }

    // Next step button handler
    async nextStep() {
        if (this.currentStep < this.steps.length) {
            await this.executeStep(this.currentStep);
            this.currentStep++;
        }
    }

    // Previous step button handler
    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            const step = this.steps[this.currentStep];

            if (step.type === 'swap' && this.previousStates[this.currentStep]) {
                // Restore previous array state
                this.array = [...this.previousStates[this.currentStep]];
                utils.createBars(this.array);
            } else if (step.type === 'compare') {
                utils.updateBarColors(step.indices, 'comparing');
            } else if (step.type === 'sorted') {
                utils.updateBarColors(step.indices, 'sorted');
            } else if (step.type === 'graph') {
                this.updateGraph(step);
            }

            // Update explanation
            utils.updateExplanation(step.explanation);
        }
    }

    // Graph-specific methods
    initializeGraph() {
        // Create a complex graph for Dijkstra's algorithm
        this.graph = {
            nodes: [
                { id: 0, x: 100, y: 100 },  // Start node
                { id: 1, x: 300, y: 100 },
                { id: 2, x: 500, y: 100 },
                { id: 3, x: 200, y: 200 },
                { id: 4, x: 400, y: 200 },
                { id: 5, x: 600, y: 200 },
                { id: 6, x: 150, y: 300 },
                { id: 7, x: 350, y: 300 },
                { id: 8, x: 550, y: 300 },
                { id: 9, x: 250, y: 400 },
                { id: 10, x: 450, y: 400 },
                { id: 11, x: 650, y: 400 }  // End node
            ],
            edges: [
                // Layer 1 connections
                { from: 0, to: 1, weight: 4 },
                { from: 0, to: 3, weight: 2 },
                { from: 1, to: 2, weight: 3 },
                { from: 1, to: 3, weight: 1 },
                { from: 1, to: 4, weight: 5 },
                { from: 2, to: 4, weight: 2 },
                { from: 2, to: 5, weight: 6 },
                
                // Layer 2 connections
                { from: 3, to: 6, weight: 3 },
                { from: 3, to: 7, weight: 4 },
                { from: 4, to: 7, weight: 2 },
                { from: 4, to: 8, weight: 3 },
                { from: 5, to: 8, weight: 5 },
                
                // Layer 3 connections
                { from: 6, to: 9, weight: 4 },
                { from: 7, to: 9, weight: 3 },
                { from: 7, to: 10, weight: 2 },
                { from: 8, to: 10, weight: 4 },
                { from: 8, to: 11, weight: 6 },
                
                // Cross connections
                { from: 0, to: 6, weight: 7 },
                { from: 1, to: 7, weight: 5 },
                { from: 2, to: 8, weight: 8 },
                { from: 3, to: 9, weight: 6 },
                { from: 4, to: 10, weight: 4 },
                { from: 5, to: 11, weight: 7 },
                
                // Additional paths
                { from: 6, to: 10, weight: 5 },
                { from: 7, to: 11, weight: 4 },
                { from: 9, to: 11, weight: 3 }
            ]
        };
    }

    createGraph() {
        const container = document.getElementById('visualization');
        container.innerHTML = '';
        
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 800 600');
        container.appendChild(svg);

        // Draw edges
        this.graph.edges.forEach(edge => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const fromNode = this.graph.nodes[edge.from];
            const toNode = this.graph.nodes[edge.to];
            
            // Calculate midpoint for weight label
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            
            line.setAttribute('x1', fromNode.x);
            line.setAttribute('y1', fromNode.y);
            line.setAttribute('x2', toNode.x);
            line.setAttribute('y2', toNode.y);
            line.setAttribute('class', 'graph-edge');
            line.setAttribute('data-from', edge.from);
            line.setAttribute('data-to', edge.to);
            
            // Add weight label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', midX);
            text.setAttribute('y', midY);
            text.setAttribute('class', 'graph-weight');
            text.textContent = edge.weight;
            
            svg.appendChild(line);
            svg.appendChild(text);
        });

        // Draw nodes
        this.graph.nodes.forEach(node => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', '20');
            circle.setAttribute('class', 'graph-node');
            circle.setAttribute('data-id', node.id);
            
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', 'white');
            text.textContent = node.id;
            
            svg.appendChild(circle);
            svg.appendChild(text);
        });
    }

    updateGraph(step) {
        // Update graph visualization based on step
        if (step.type === 'graph') {
            const svg = document.querySelector('svg');
            if (!svg) return;

            // Update node colors
            if (step.nodes) {
                step.nodes.forEach(nodeId => {
                    const node = svg.querySelector(`circle[data-id="${nodeId}"]`);
                    if (node) {
                        node.setAttribute('class', `graph-node ${step.nodeClass || ''}`);
                    }
                });
            }

            // Update edge colors
            if (step.edges) {
                step.edges.forEach(edge => {
                    const edgeElement = svg.querySelector(`line[data-from="${edge.from}"][data-to="${edge.to}"]`);
                    if (edgeElement) {
                        edgeElement.setAttribute('class', `graph-edge ${step.edgeClass || ''}`);
                    }
                });
            }
        }
    }

    // Algorithm-specific step generators
    generateQuickSortSteps() {
        const arr = [...this.array];
        const steps = [];

        const quickSort = (start, end) => {
            if (start >= end) return;

            // Choose pivot (middle element)
            const pivotIndex = Math.floor((start + end) / 2);
            const pivot = arr[pivotIndex];

            // Move pivot to end
            steps.push({
                type: 'compare',
                indices: [pivotIndex, end],
                explanation: `Selecting pivot: ${pivot}`
            });

            [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

            let i = start;
            for (let j = start; j < end; j++) {
                steps.push({
                    type: 'compare',
                    indices: [j, end],
                    explanation: `Comparing ${arr[j]} with pivot ${pivot}`
                });

                if (arr[j] <= pivot) {
                    if (i !== j) {
                        steps.push({
                            type: 'swap',
                            indices: [i, j],
                            explanation: `Swapping ${arr[i]} and ${arr[j]}`
                        });
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                    }
                    i++;
                }
            }

            // Move pivot to its final position
            if (i !== end) {
                steps.push({
                    type: 'swap',
                    indices: [i, end],
                    explanation: `Moving pivot ${pivot} to its final position`
                });
                [arr[i], arr[end]] = [arr[end], arr[i]];
            }

            // Mark pivot as sorted
            steps.push({
                type: 'sorted',
                indices: [i],
                explanation: `Pivot ${pivot} is now in its final position`
            });

            // Recursively sort subarrays
            quickSort(start, i - 1);
            quickSort(i + 1, end);
        };

        quickSort(0, arr.length - 1);

        // Mark all elements as sorted at the end
        steps.push({
            type: 'sorted',
            indices: Array.from({ length: arr.length }, (_, i) => i),
            explanation: 'Sorting complete!'
        });

        return steps;
    }

    generateMergeSortSteps() {
        const arr = [...this.array];
        const steps = [];

        const merge = (left, right, startIndex) => {
            const result = [];
            let leftIndex = 0;
            let rightIndex = 0;

            while (leftIndex < left.length && rightIndex < right.length) {
                steps.push({
                    type: 'compare',
                    indices: [startIndex + leftIndex, startIndex + left.length + rightIndex],
                    explanation: `Comparing ${left[leftIndex]} and ${right[rightIndex]}`
                });

                if (left[leftIndex] <= right[rightIndex]) {
                    result.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    result.push(right[rightIndex]);
                    rightIndex++;
                }
            }

            const remaining = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
            
            // Update the array with merged result
            for (let i = 0; i < remaining.length; i++) {
                arr[startIndex + i] = remaining[i];
                steps.push({
                    type: 'swap',
                    indices: [startIndex + i],
                    explanation: `Placing ${remaining[i]} in position ${startIndex + i}`
                });
            }

            return remaining;
        };

        const mergeSort = (array, startIndex) => {
            if (array.length <= 1) return array;

            const mid = Math.floor(array.length / 2);
            const left = array.slice(0, mid);
            const right = array.slice(mid);

            return merge(
                mergeSort(left, startIndex),
                mergeSort(right, startIndex + mid),
                startIndex
            );
        };

        mergeSort(arr, 0);

        // Mark all elements as sorted at the end
        steps.push({
            type: 'sorted',
            indices: Array.from({ length: arr.length }, (_, i) => i),
            explanation: 'Sorting complete!'
        });

        return steps;
    }

    generateBubbleSortSteps() {
        return bubbleSort(this.array);
    }

    generateBinarySearchSteps() {
        const arr = [...this.array].sort((a, b) => a - b);
        const target = arr[Math.floor(Math.random() * arr.length)];
        const steps = [];

        let left = 0;
        let right = arr.length - 1;

        steps.push({
            type: 'compare',
            indices: [],
            explanation: `Searching for value ${target}`
        });

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            steps.push({
                type: 'compare',
                indices: [mid],
                explanation: `Checking middle element at index ${mid}: ${arr[mid]}`
            });

            if (arr[mid] === target) {
                steps.push({
                    type: 'sorted',
                    indices: [mid],
                    explanation: `Found ${target} at index ${mid}!`
                });
                return steps;
            }

            if (arr[mid] < target) {
                left = mid + 1;
                steps.push({
                    type: 'compare',
                    indices: [mid],
                    explanation: `${arr[mid]} is less than ${target}, searching right half`
                });
            } else {
                right = mid - 1;
                steps.push({
                    type: 'compare',
                    indices: [mid],
                    explanation: `${arr[mid]} is greater than ${target}, searching left half`
                });
            }
        }

        steps.push({
            type: 'compare',
            indices: [],
            explanation: `Value ${target} not found in the array`
        });

        return steps;
    }

    generateLinearSearchSteps() {
        const arr = [...this.array];
        const target = arr[Math.floor(Math.random() * arr.length)];
        const steps = [];

        steps.push({
            type: 'compare',
            indices: [],
            explanation: `Searching for value ${target}`
        });

        for (let i = 0; i < arr.length; i++) {
            steps.push({
                type: 'compare',
                indices: [i],
                explanation: `Checking element at index ${i}: ${arr[i]}`
            });

            if (arr[i] === target) {
                steps.push({
                    type: 'sorted',
                    indices: [i],
                    explanation: `Found ${target} at index ${i}!`
                });
                return steps;
            }
        }

        steps.push({
            type: 'compare',
            indices: [],
            explanation: `Value ${target} not found in the array`
        });

        return steps;
    }

    generateDijkstraSteps() {
        const steps = [];
        const distances = new Array(this.graph.nodes.length).fill(Infinity);
        const visited = new Array(this.graph.nodes.length).fill(false);
        const previous = new Array(this.graph.nodes.length).fill(null);
        
        // Start from node 0
        distances[0] = 0;
        steps.push({
            type: 'graph',
            nodes: [0],
            nodeClass: 'current',
            explanation: 'Starting from node 0'
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

            // Mark current node as visited
            visited[currentNode] = true;
            steps.push({
                type: 'graph',
                nodes: [currentNode],
                nodeClass: 'visited',
                explanation: `Visiting node ${currentNode} with distance ${distances[currentNode]}`
            });

            // Update distances to neighbors
            this.graph.edges
                .filter(edge => edge.from === currentNode || edge.to === currentNode)
                .forEach(edge => {
                    const neighbor = edge.from === currentNode ? edge.to : edge.from;
                    if (!visited[neighbor]) {
                        const newDistance = distances[currentNode] + edge.weight;
                        
                        steps.push({
                            type: 'graph',
                            nodes: [neighbor],
                            edges: [{ from: currentNode, to: neighbor }],
                            nodeClass: 'considering',
                            edgeClass: 'considering',
                            explanation: `Checking path to node ${neighbor} through node ${currentNode}`
                        });

                        if (newDistance < distances[neighbor]) {
                            distances[neighbor] = newDistance;
                            previous[neighbor] = currentNode;
                            
                            steps.push({
                                type: 'graph',
                                nodes: [neighbor],
                                edges: [{ from: currentNode, to: neighbor }],
                                nodeClass: 'updated',
                                edgeClass: 'updated',
                                explanation: `Found shorter path to node ${neighbor}: ${newDistance}`
                            });
                        }
                    }
                });
        }

        // Highlight the shortest path to the end node (node 11)
        let current = 11;
        const path = [];
        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }

        steps.push({
            type: 'graph',
            nodes: path,
            edges: path.slice(1).map((node, i) => ({
                from: path[i],
                to: node
            })),
            nodeClass: 'path',
            edgeClass: 'path',
            explanation: `Shortest path found! Total distance: ${distances[11]}`
        });

        return steps;
    }

    // Update pseudocode display
    updatePseudocode(algorithm) {
        const algorithmName = document.getElementById('algorithmName');
        const pseudocodeText = document.getElementById('pseudocodeText');
        
        if (algorithmName && pseudocodeText) {
            // Update algorithm name
            algorithmName.textContent = algorithm.charAt(0).toUpperCase() + algorithm.slice(1);
            
            // Update pseudocode content
            if (pseudocode[algorithm]) {
                pseudocodeText.innerHTML = pseudocode[algorithm]
                    .split('\n')
                    .map((line, index) => `<div class="pseudocode-line" data-line="${index}">${line}</div>`)
                    .join('');
            } else {
                pseudocodeText.textContent = 'Pseudocode not available for this algorithm.';
            }
        }
    }

    // Highlight current pseudocode line
    highlightPseudocodeLine(lineNumber) {
        const lines = document.querySelectorAll('.pseudocode-line');
        lines.forEach(line => line.classList.remove('highlight-line'));
        
        if (lineNumber >= 0 && lineNumber < lines.length) {
            lines[lineNumber].classList.add('highlight-line');
            // Scroll to the highlighted line
            lines[lineNumber].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Reset pseudocode highlighting
    resetPseudocodeHighlight() {
        const lines = document.querySelectorAll('.pseudocode-line');
        lines.forEach(line => line.classList.remove('highlight-line'));
        this.currentPseudocodeLine = -1;
    }
} 