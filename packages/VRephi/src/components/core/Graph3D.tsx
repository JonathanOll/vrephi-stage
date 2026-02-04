import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, XRControllerComponent, XRControllerModel, createXRStore } from '@react-three/xr';
import { useGraphDataset, useSigmaGraph } from "@gephi/gephi-lite/src/core/context/dataContexts";
import { useXRGraph } from "../../hooks/useXRGraph";
import { Node3D } from "../graph/Node3D";
import { Edge3D } from "../graph/Edge3D";
import { XRMenu } from "./XRMenu";
import * as THREE from "three";
import { XRGraphControls } from "./XRGraphControls";

export interface IGraph3D {
  loadData: () => void;
}

const store = createXRStore();

export const Graph3D = forwardRef<IGraph3D, {}>((props, ref) => {

  const sigmaGraph = useSigmaGraph();
  const { nodeData } = useGraphDataset();
  const dataRef = useRef(nodeData);

  useEffect(() => {
    dataRef.current = nodeData;
  }, [nodeData]);

  const { nodes, edges, loadData } = useXRGraph();

  const graphRef = useRef<THREE.Group>(null);

  useImperativeHandle(ref, () => ({
    loadData: () => {
      loadData(sigmaGraph, dataRef.current);
      store.enterVR();
    }
  }));

  return (
    <div style={{ position: "absolute", top: -999999 }}>
      <Canvas>
        <XR store={store}>

          <XRMenu />

          <XRGraphControls graphRef={graphRef} />
          
          <group ref={graphRef}>
            {nodes.map(node => (
              <Node3D key={node.id} node={node} />
            ))}
            {edges.map(edge => (
              <Edge3D key={edge.id} edge={edge} />
            ))}
          </group>

        </XR>
      </Canvas>
    </div>
  );
});
