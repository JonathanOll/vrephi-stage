import { useXRGraphStore } from "../store/useXRGraphStore";

export const useXRLayout = () => {
  const applyLayout = useXRGraphStore(s => s.applyLayout);

  return { applyLayout };
};