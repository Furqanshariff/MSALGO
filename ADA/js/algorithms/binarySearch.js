// Binary Search Algorithm Implementation
class BinarySearch {
    constructor(array) {
        this.array = [...array];
        this.steps = [];
        // Generate a random target value that exists in the array
        this.target = this.array[Math.floor(Math.random() * this.array.length)];
    }

    // Generate steps for Binary Search visualization
    generateSteps() {
        this.steps = [];
        this.binarySearch(0, this.array.length - 1);
        return this.steps;
    }

    // Binary Search implementation
    binarySearch(left, right) {
        if (left <= right) {
            const mid = Math.floor((left + right) / 2);

            // Add step to show current search range
            this.steps.push({
                type: 'compare',
                indices: [left, right],
                explanation: `Searching in range [${this.array[left]}...${this.array[right]}]`
            });

            // Add step to show middle element
            this.steps.push({
                type: 'compare',
                indices: [mid],
                explanation: `Checking middle element: ${this.array[mid]}`
            });

            if (this.array[mid] === this.target) {
                // Add step to show target found
                this.steps.push({
                    type: 'sorted',
                    indices: [mid],
                    explanation: `Target ${this.target} found at index ${mid}!`
                });
                return mid;
            }

            if (this.array[mid] > this.target) {
                // Add step to show search in left half
                this.steps.push({
                    type: 'compare',
                    indices: [left, mid - 1],
                    explanation: `Target ${this.target} is less than ${this.array[mid]}, searching left half`
                });
                return this.binarySearch(left, mid - 1);
            }

            // Add step to show search in right half
            this.steps.push({
                type: 'compare',
                indices: [mid + 1, right],
                explanation: `Target ${this.target} is greater than ${this.array[mid]}, searching right half`
            });
            return this.binarySearch(mid + 1, right);
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

// Extend the Visualizer class with Binary Search implementation
Visualizer.prototype.generateBinarySearchSteps = function() {
    const binarySearch = new BinarySearch(this.array);
    return binarySearch.generateSteps();
}; 