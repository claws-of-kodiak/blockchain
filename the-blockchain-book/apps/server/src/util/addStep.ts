export default function addStep(stepObject: { currentObj: number }): number {
  const currentObj = Number(stepObject.currentObj);
  const nextObj = Number((currentObj + 1).toFixed(1));
  return nextObj;
}
