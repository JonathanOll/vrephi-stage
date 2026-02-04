import { useXRGraphStore } from "../store/useXRGraphStore";

export const useXRFilter = () => {
  const filterNodes = useXRGraphStore(s => s.filterNodes);

  return { filterNodes };
};
