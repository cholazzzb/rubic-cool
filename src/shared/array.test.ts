import { describe, expect, it } from 'vitest';

import { chunk, flattenArray, shuffleArray } from './array';

it('shuffle', () => {
  const initial = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(initial);

  expect(shuffled.length).toBe(initial.length);
});

it('flattenArray', () => {
  const inArr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, 4]]];
  const out = flattenArray(inArr);
  expect(out).toStrictEqual([1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 4]);
});

describe('chunk', () => {
  it('2D', () => {
    const inArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const out = chunk(inArr, 3);
    expect(out).toStrictEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  it('3D', () => {
    const inArr = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27,
    ];
    const out = chunk(chunk(inArr, 3), 3);
    expect(out).toStrictEqual([
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      [
        [10, 11, 12],
        [13, 14, 15],
        [16, 17, 18],
      ],
      [
        [19, 20, 21],
        [22, 23, 24],
        [25, 26, 27],
      ],
    ]);
  });
});
