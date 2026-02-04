import { StateCreator } from "zustand";
import create from "zustand"
import { NodeData } from "../core/types/NodeData";
import { EdgeData } from "../core/types/EdgeData";
import { ItemData, SigmaGraph } from "@gephi/gephi-lite-sdk";
import { XRLayout } from "../core/layouts/XRLayout";
import { Layout } from "@gephi/gephi-lite/src/core/layouts/types";
import { useLayoutActions, useSigmaGraph } from "@gephi/gephi-lite/src/core/context/dataContexts";
import { at } from "lodash";


interface Graph3DState {
  nodes: NodeData[];
  edges: EdgeData[];
  selected: NodeData | null;
  loaded: boolean;

  attributes: string[];

  loadData: (sigmaGraph: SigmaGraph, data: Record<string, ItemData>) => void;
  setSelected: (node: NodeData | null) => void;
  filterNodes: (condition:(node: NodeData) => boolean) => void;
  updateNode: (node: NodeData ) => void;
  applyLayout: (layout: XRLayout | Layout, sigmaGraph: SigmaGraph, options?: any) => void;
  makeNeighboursVisible: (nodeId: string) => void;
}

const graphXRStoreCreator: StateCreator<Graph3DState> = (set, get) => ({
  nodes: [],
  edges: [],
  attributes: [],
  selected: null,
  loaded: false,

 loadData: (sigmaGraph: SigmaGraph, data: Record<string, ItemData>) => {
    if (get().loaded) return;

    const nodes = sigmaGraph.nodes().map((id: string) => {
      const sigmaAttrs = sigmaGraph.getNodeAttributes(id) || {};
      const gephiAttrs = data[id] || {};

      return {
        id,
        ...sigmaAttrs,
        ...gephiAttrs,
        z: (gephiAttrs.z as number) ?? -1000,
        hidden: false,
      };
    })
    .map((el) => ({
      ...el,
      x: el.x / 100,
      y: el.y / 100,
      z: el.z / 100,
    }));

    const edges = sigmaGraph.edges().map((id: string) => {
      const s = sigmaGraph.source(id);
      const t = sigmaGraph.target(id);

      return {
        id,
        ...sigmaGraph.getEdgeAttributes(id),
        source: nodes.find((el) => el.id === s)!,
        target: nodes.find((el) => el.id === t)!,
      };
    });

    let attributes: string[] = [];

    nodes.forEach((node) => {
      Object.keys(node).forEach((key) => {
        if (!attributes.includes(key))
          attributes.push(key);
      });
    });

    set({
      nodes,
      edges,
      attributes,
      loaded: true,
    });
  },

  setSelected: (node) => set({ selected: node }),

  filterNodes: (condition:(node: NodeData) => boolean) => {
    const updatedNodes = get().nodes.map((node) => ({
      ...node,
      hidden: !condition(node),
    }));

    const edges = get().edges.map((edge) => {
        return {
          ...edge,
          source: updatedNodes.find(el => el.id === edge.source.id)!,
          target: updatedNodes.find(el => el.id === edge.target.id)!,
        };
      });

    set({ nodes: updatedNodes, edges });
  },
  
  updateNode: (data) => {
      const updatedNode = {
        ...get().nodes.find((n) => n.id === data.id)!,
        ...data,
      };
  
      const nodes = get().nodes.map((node) =>
        node.id === data.id ? updatedNode : node
      );
  
      const edges = get().edges.map((edge) => {
        const isSource = edge.source.id === data.id;
        const isTarget = edge.target.id === data.id;
  
        if (!isSource && !isTarget) return edge;

        return {
          ...edge,
          source: isSource ? updatedNode : edge.source,
          target: isTarget ? updatedNode : edge.target
        };
      });

  
      const selected =
        get().selected?.id === data.id
          ? { ...get().selected, ...data }
          : get().selected;
  
      set({ nodes, edges, selected });
  },

  applyLayout: (layout, sigmaGraph, options) => {

    if (layout.type === "xr") {
      const nodes = layout.run(get().nodes, options);
      
      const edges = get().edges.map((edge) => {
        return {
          ...edge,
          source: nodes.find(el => el.id === edge.source.id)!,
          target: nodes.find(el => el.id === edge.target.id)!,
        };
      });

      set({ nodes, edges });
    } else {
      const { startLayout, stopLayout } = useLayoutActions();

      startLayout(layout.id, {
        ...options
      })
      if (!sigmaGraph) return;

      setTimeout(() => {
        const nodes = get().nodes.map((node) => ({
          ...node,
          x: sigmaGraph.getNodeAttributes(node.id)!.x! / 100,
          y: sigmaGraph.getNodeAttributes(node.id)!.y! / 100,
          z: -10,
        }));

        const edges = get().edges.map(edge => ({
          ...edge,
          source: nodes.find((n: NodeData) => n.id === edge.source.id)!,
          target: nodes.find((n: NodeData) => n.id === edge.target.id)!,
        }));

        set({ nodes, edges });

        stopLayout();
      }, 1000)
      
    }


  },
  
  makeNeighboursVisible: (nodeId: string) => {
    const { nodes, edges } = get();

    const neighbourIds = new Set<string>();
    edges.forEach((e) => {
      if (e.source.id === nodeId) neighbourIds.add(e.target.id);
      if (e.target.id === nodeId) neighbourIds.add(e.source.id);
    });
    neighbourIds.add(nodeId);

    const updatedNodes = nodes.map((n) => ({
      ...n,
      hidden: !neighbourIds.has(n.id),
    }));

    const updatedEdges = edges.map((e) => ({
      ...e,
      source: updatedNodes.find((n) => n.id === e.source.id)!,
      target: updatedNodes.find((n) => n.id === e.target.id)!,
      hidden: !(
        neighbourIds.has(e.source.id) && neighbourIds.has(e.target.id)
      ),
    }));

    set({ nodes: updatedNodes, edges: updatedEdges });
  },
  
});

export const useXRGraphStore = create<Graph3DState>(graphXRStoreCreator);
