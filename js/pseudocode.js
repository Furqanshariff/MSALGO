// Pseudocode definitions for each algorithm
const pseudocode = {
    quickSort: `function quickSort(array, low, high) {
    if (low < high) {
        // Partition the array
        pivot = partition(array, low, high)
        
        // Recursively sort the sub-arrays
        quickSort(array, low, pivot - 1)
        quickSort(array, pivot + 1, high)
    }
}

function partition(array, low, high) {
    // Choose the rightmost element as pivot
    pivot = array[high]
    i = low - 1
    
    // Compare each element with pivot
    for (j = low to high - 1) {
        if (array[j] <= pivot) {
            i++
            swap(array[i], array[j])
        }
    }
    
    // Place pivot in its correct position
    swap(array[i + 1], array[high])
    return i + 1
}`,

    mergeSort: `function mergeSort(array) {
    if (array.length <= 1) return array
    
    // Find the middle point
    mid = array.length / 2
    
    // Divide array into two halves
    left = mergeSort(array[0 to mid])
    right = mergeSort(array[mid to end])
    
    // Merge the two halves
    return merge(left, right)
}

function merge(left, right) {
    result = []
    i = 0, j = 0
    
    // Compare and merge elements
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i])
            i++
        } else {
            result.push(right[j])
            j++
        }
    }
    
    // Add remaining elements
    result = result + left[i to end]
    result = result + right[j to end]
    
    return result
}`,

    bubbleSort: `function bubbleSort(array) {
    n = array.length
    
    // Traverse through all array elements
    for (i = 0 to n-1) {
        // Last i elements are already in place
        for (j = 0 to n-i-1) {
            // Compare adjacent elements
            if (array[j] > array[j+1]) {
                // Swap if greater
                swap(array[j], array[j+1])
            }
        }
    }
}`,

    binarySearch: `function binarySearch(array, target) {
    left = 0
    right = array.length - 1
    
    while (left <= right) {
        // Find middle element
        mid = (left + right) / 2
        
        // Check if target is present at mid
        if (array[mid] == target)
            return mid
            
        // If target greater, ignore left half
        if (array[mid] < target)
            left = mid + 1
            
        // If target smaller, ignore right half
        else
            right = mid - 1
    }
    
    // Target not found
    return -1
}`,

    linearSearch: `function linearSearch(array, target) {
    // Traverse array sequentially
    for (i = 0 to array.length - 1) {
        // If target found, return index
        if (array[i] == target)
            return i
    }
    
    // Target not found
    return -1
}`,

    dijkstra: `function dijkstra(graph, start) {
    // Initialize distances and visited
    distances = [infinity] * graph.size
    distances[start] = 0
    visited = empty set
    
    while (visited.size < graph.size) {
        // Find unvisited node with min distance
        current = node with min distance not in visited
        
        // Mark current node as visited
        visited.add(current)
        
        // Update distances to neighbors
        for (neighbor in current.neighbors) {
            new_distance = distances[current] + edge_weight
            if (new_distance < distances[neighbor])
                distances[neighbor] = new_distance
        }
    }
    
    return distances
}`
}; 