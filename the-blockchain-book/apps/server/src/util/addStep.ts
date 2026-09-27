export default function addStep(stepObject: { currentStep: number }): number {
  const currentStep = Number(stepObject.currentStep);
  const nextStep = Number((currentStep + 0.1).toFixed(1));
  return nextStep;
}
