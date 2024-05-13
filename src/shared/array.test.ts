import { expect, it } from 'vitest';

import { shuffleArray } from './array';

it('shuffle', () => {
  const initial = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(initial);

  expect(shuffled.length).toBe(initial.length);
});
