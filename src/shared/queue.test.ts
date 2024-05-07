import { beforeEach, describe, expect, test } from 'vitest';

import { Queue } from './queue';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>(5);
  });

  test('enqueue and dequeue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.size()).toBe(2);
    expect(queue.peek()).toBe(2);
  });

  test('size and isEmpty', () => {
    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);

    queue.enqueue(1);

    expect(queue.size()).toBe(1);
    expect(queue.isEmpty()).toBe(false);

    queue.dequeue();

    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
  });

  test('peek', () => {
    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.peek()).toBe(1);
    expect(queue.size()).toBe(2);
  });

  test('enqueue when full', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    queue.enqueue(5);
    queue.enqueue(6);

    expect(queue.size()).toBe(6);
  });

  test('dequeue when empty', () => {
    expect(queue.dequeue()).toBeUndefined();
  });
});
