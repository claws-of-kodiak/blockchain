import { create } from "zustand";

type PositionState = {
  position: number | null;
};

export const usePosition = create<PositionState>(() => {
  return { position: null };
});

export const setPosition = (newPosition: number) => {
  usePosition.setState({ position: newPosition });
};

export const clearPosition = () => {
  usePosition.setState({ position: null });
};
