import type { Objective, Section } from "@repo/validations";

type PositionedArray = Objective[] | Section[];

export function sortByPosition(items: PositionedArray): PositionedArray {
  return [...items].sort((a, b) => a.position - b.position);
}
