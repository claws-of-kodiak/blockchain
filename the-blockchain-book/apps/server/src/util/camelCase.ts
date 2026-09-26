// used inside db.ts file
export function camelizeKeys<T = any>(input: any): T {
  if (Array.isArray(input)) {
    return input.map((item) => camelizeKeys(item)) as unknown as T;
  }
  if (
    input !== null &&
    typeof input === "object" &&
    input.constructor === Object
  ) {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const camelKey = key.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
      acc[camelKey] = camelizeKeys(value);
      return acc;
    }, {} as any);
  }
  return input;
}
