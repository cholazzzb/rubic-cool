/**
 * @example
 * const queue = new Queue<number>(5);
 *
 * queue.enqueue(1);
 * queue.enqueue(2);
 * queue.enqueue(3);
 *
 * console.log(queue.dequeue()); // Output: 1
 * console.log(queue.size()); // Output: 2
 * console.log(queue.peek()); // Output: 2
 * console.log(queue.isEmpty()); // Output: false
 */
export class Queue<T> {
  private items: Array<T | undefined>;
  private front: number;
  private back: number;
  private count: number;

  constructor(capacity = 1) {
    this.items = new Array(capacity);
    this.front = 0;
    this.back = -1;
    this.count = 0;
  }

  private getNextIndex(index: number): number {
    if (index + 1 === 0 && this.count === 0) return 0;
    if (index + 1 === this.count) return this.count;
    return (index + 1) % this.count;
  }

  enqueue(item: T): void {
    this.back = this.getNextIndex(this.back);
    if (this.count === this.items.length) {
      this.items.push(item);
    } else {
      this.items[this.back] = item;
    }
    this.count++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const dequeued = this.items[this.front];
    this.items[this.front] = undefined;
    this.front = this.getNextIndex(this.front);
    this.count--;
    return dequeued;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.items[this.front];
  }

  size(): number {
    return this.count;
  }
}
