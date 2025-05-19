// Linear Search Algorithm Implementation
class LinearSearch {
    constructor(array) {
        this.array = [...array];
        this.steps = [];
        // Generate a random target value that exists in the array
        this.target = this.array[Math.floor(Math.random() * this.array.length)];
    }

    // Generate steps for Linear Search visualization
    generateSteps() {
        this.steps = [];
        this.linearSearch();
        return this.steps;
    }

    // Linear Search implementation
    linearSearch() {
        // Add initial step
        this.steps.push({
            type: 'compare',
            indices: [],
            explanation: `Starting linear search for target value: ${this.target}`
        });

        for (let i = 0; i < this.array.length; i++) {
            // Add step to show current element being checked
            this.steps.push({
                type: 'compare',
                indices: [i],
                explanation: `Checking element at index ${i}: ${this.array[i]}`
            });

            if (this.array[i] === this.target) {
                // Add step to show target found
                this.steps.push({
                    type: 'sorted',
                    indices: [i],
                    explanation: `Target ${this.target} found at index ${i}!`
                });
                return i;
            }
        }

        // Add step to show target not found
        this.steps.push({
            type: 'compare',
            indices: [],
            explanation: `Target ${this.target} not found in the array`
        });
        return -1;
    }
}

// Extend the Visualizer class with Linear Search implementation
Visualizer.prototype.generateLinearSearchSteps = function() {
    const linearSearch = new LinearSearch(this.array);
    return linearSearch.generateSteps();
}; 