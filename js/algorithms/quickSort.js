// Quick Sort Algorithm Implementation
class QuickSort {
    constructor(array) {
        this.array = [...array];
        this.steps = [];
    }

    // Generate steps for Quick Sort visualization
    generateSteps() {
        this.steps = [];
        this.quickSort(0, this.array.length - 1);
        return this.steps;
    }

    // Quick Sort implementation
    quickSort(low, high) {
        if (low < high) {
            const pivotIndex = this.partition(low, high);
            this.quickSort(low, pivotIndex - 1);
            this.quickSort(pivotIndex + 1, high);
        }
    }

    // Partition function
    partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;

        // Add step to show pivot selection
        this.steps.push({
            type: 'compare',
            indices: [high],
            explanation: `Selecting pivot: ${pivot}`
        });

        for (let j = low; j < high; j++) {
            // Add step to show comparison
            this.steps.push({
                type: 'compare',
                indices: [j, high],
                explanation: `Comparing ${this.array[j]} with pivot ${pivot}`
            });

            if (this.array[j] <= pivot) {
                i++;
                
                if (i !== j) {
                    // Add step to show swap
                    this.steps.push({
                        type: 'swap',
                        indices: [i, j],
                        explanation: `Swapping ${this.array[i]} and ${this.array[j]}`
                    });

                    // Perform swap
                    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                }
            }
        }

        // Add step to show final pivot placement
        this.steps.push({
            type: 'swap',
            indices: [i + 1, high],
            explanation: `Placing pivot ${pivot} in its final position`
        });

        // Perform final swap
        [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];

        // Add step to show sorted section
        this.steps.push({
            type: 'sorted',
            indices: [i + 1],
            explanation: `Pivot ${pivot} is now in its correct position`
        });

        return i + 1;
    }
}

// Extend the Visualizer class with Quick Sort implementation
Visualizer.prototype.generateQuickSortSteps = function() {
    const quickSort = new QuickSort(this.array);
    return quickSort.generateSteps();
}; 