import { describe, expect, it } from 'vitest';

import { Position } from '@/feature/cube';
import { MOVE } from '@/shared/enum';
import { alignTopBottomEdge } from './corner';

it('moves should empty array', () => {
  const current: Position = [0, 0, 0];
  const target: Position = [0, 0, 0];
  const { moves, position } = alignTopBottomEdge(current, target);
  expect(moves.length).toBe(0);
  expect(position).toStrictEqual(target);
});

describe('should Top Clockwise once', () => {
  it('case 1', () => {
    const current: Position = [0, 0, 0];
    const target: Position = [0, 0, 2];
    const { moves, position } = alignTopBottomEdge(current, target);
    expect(moves.length).toBe(1);
    expect(moves[0]).toBe(MOVE.TOP_C);
    expect(position).toStrictEqual(target);
  });

  it('case 2', () => {
    const current: Position = [2, 0, 0];
    const target: Position = [0, 0, 0];
    const { moves, position } = alignTopBottomEdge(current, target);
    expect(moves.length).toBe(1);
    expect(moves[0]).toBe(MOVE.TOP_C);
    expect(position).toStrictEqual(target);
  });
});

describe('should Top Clockwise twice', () => {
  it('case 1', () => {
    const current: Position = [0, 0, 0];
    const target: Position = [2, 0, 2];
    const { moves, position } = alignTopBottomEdge(current, target);
    expect(moves.length).toBe(2);
    expect(moves[0]).toBe(MOVE.TOP_C);
    expect(position).toStrictEqual(target);
  });

  it('case 2', () => {
    const current: Position = [2, 0, 0];
    const target: Position = [0, 0, 2];
    const { moves, position } = alignTopBottomEdge(current, target);
    expect(moves.length).toBe(2);
    expect(moves[0]).toBe(MOVE.TOP_CC);
    expect(position).toStrictEqual(target);
  });
});

describe('should Top CounterClockwise once', () => {
  it('case 1', () => {
    const current: Position = [0, 0, 0];
    const target: Position = [2, 0, 0];
    const { moves, position } = alignTopBottomEdge(current, target);
    expect(moves.length).toBe(1);
    expect(moves[0]).toBe(MOVE.TOP_CC);
    expect(position).toStrictEqual(target);
  });

  it('case 2', () => {
    const current: Position = [2, 0, 0];
    const target: Position = [2, 0, 2];
    const { moves, position } = alignTopBottomEdge(current, target);
    expect(moves.length).toBe(1);
    expect(moves[0]).toBe(MOVE.TOP_CC);
    expect(position).toStrictEqual(target);
  });
});
