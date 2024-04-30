type FlattenArray<T> = T extends Array<infer U> ? FlattenArray<U> : Array<T>;

export function flattenArray<T>(arr: T): FlattenArray<T> {
  if (Array.isArray(arr)) {
    return arr.reduce(
      (acc, val) => acc.concat(flattenArray(val)),
      [] as Array<FlattenArray<T>>,
    );
  } else {
    return [arr] as FlattenArray<T>;
  }
}

export function getRandomArrEl<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
