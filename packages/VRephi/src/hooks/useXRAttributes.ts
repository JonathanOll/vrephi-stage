import { useXRGraphStore } from "../store/useXRGraphStore";

export const useXRAttributes = () => {
  const attributes = useXRGraphStore(s => s.attributes);

  return { attributes };
};
