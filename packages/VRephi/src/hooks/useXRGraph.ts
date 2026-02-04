import { useXRGraphStore } from "../store/useXRGraphStore";

export const useXRGraph = () => {
  const nodes = useXRGraphStore(s => s.nodes);
  const edges = useXRGraphStore(s => s.edges);
  const loadData = useXRGraphStore(s => s.loadData);
  const updateNode = useXRGraphStore(s => s.updateNode);

  return { nodes, edges, loadData, updateNode };
};
