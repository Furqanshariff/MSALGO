// Bubble Sort Algorithm Implementation
function bubbleSort(array) {
    const n = array.length;
    const steps = [];
    const arr = [...array];

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Compare step
            steps.push({
                type: 'compare',
                indices: [j, j + 1],
                explanation: `Comparing ${arr[j]} and ${arr[j + 1]}`
            });

            if (arr[j] > arr[j + 1]) {
                // Swap step
                steps.push({
                    type: 'swap',
                    indices: [j, j + 1],
                    explanation: `Swapping ${arr[j]} and ${arr[j + 1]}`
                });

                // Perform the swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        // Mark the last element as sorted
        steps.push({
            type: 'sorted',
            indices: [n - i - 1],
            explanation: `Element ${arr[n - i - 1]} is now in its final position`
        });
    }

    // Mark the first element as sorted
    steps.push({
        type: 'sorted',
        indices: [0],
        explanation: 'Sorting complete!'
    });

    return steps;
} 