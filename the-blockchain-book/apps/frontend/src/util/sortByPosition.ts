import type { Objective, Section } from "@repo/validations";

type PositionedArray = Objective[] | Section[];

export function sortByPosition(items: PositionedArray): PositionedArray {
  if (items.length === 0) return [];
  return [...items].sort((a, b) => a.position - b.position);
}
