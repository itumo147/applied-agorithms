function dijkstra(graph, start) {
    // Initialize distances with infinity and set the start vertex distance to 0
    const distances = {};
    const priorityQueue = new MinPriorityQueue();

    for (let vertex in graph) {
        if (vertex === start) {
            distances[vertex] = 0;
            priorityQueue.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            priorityQueue.enqueue(vertex, Infinity);
        }
    }

    while (!priorityQueue.isEmpty()) {
        const { element: currentVertex, priority: currentDistance } = priorityQueue.dequeue();

        // Check all adjacent vertices
        for (let neighbor in graph[currentVertex]) {
            let distance = graph[currentVertex][neighbor];
            let newDistance = currentDistance + distance;

            // If the new distance is shorter, update the distance and enqueue
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                priorityQueue.enqueue(neighbor, newDistance);
            }
        }
    }

    return distances;
}

class MinPriorityQueue {
    constructor() {
        this.heap = [];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    enqueue(element, priority) {
        this.heap.push({ element, priority });
        this.bubbleUp();
    }

    dequeue() {
        if (this.isEmpty()) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();

        return top;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        const element = this.heap[index];

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (element.priority >= parent.priority) break;

            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;

            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}

// Example usage:
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A'));
// Output should be: { A: 0, B: 4, C: 2, D: 5 }
