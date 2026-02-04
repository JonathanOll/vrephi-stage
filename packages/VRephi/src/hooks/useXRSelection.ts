import { useXRGraphStore } from "../store/useXRGraphStore";

export const useXRSelection = () => {
  const selected = useXRGraphStore(s => s.selected);
  const setSelected = useXRGraphStore(s => s.setSelected);
  const makeNeighboursVisible = useXRGraphStore(s => s.makeNeighboursVisible);

  return { selected, setSelected, makeNeighboursVisible };
};
