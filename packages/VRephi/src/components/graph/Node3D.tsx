import { FC, useRef } from "react";
import { NodeData } from "../../core/types/NodeData";
import { Color, Mesh, Vector3 } from "three";
import { useXRSelection } from "../../hooks/useXRSelection";
import { Handle, HandleTarget } from "@react-three/handle";
import { useXRGraph } from "../../hooks/useXRGraph";
import { ThreeEvent } from "@react-three/fiber";

export const Node3D: FC<{ node: NodeData }> = ({ node }) => {
  const { updateNode } = useXRGraph();
  const { selected, setSelected } = useXRSelection();

  const startPos = useRef<Vector3 | null>(null);
  const meshRef = useRef<Mesh | null>(null);

  const onPointerDown = () => {
    const pos = meshRef.current!.getWorldPosition( new Vector3() );
    startPos.current = pos;
  };

  const onPointerUp = () => {
    if (!startPos.current || !meshRef.current) return;
    meshRef.current.matrixAutoUpdate = false;

    const endPos = meshRef.current!.getWorldPosition( new Vector3() );

    const dx = endPos.x - startPos.current.x;
    const dy = endPos.y - startPos.current.y;
    const dz = endPos.z - startPos.current.z;

    updateNode({
      ...node,
      x: node.x + dx,
      y: node.y + dy,
      z: node.z + dz,
    });

    startPos.current = null;
  };

  const isSelected = selected?.id === node.id;

  const baseColor = new Color(node.color);
  const finalColor = isSelected
    ? baseColor.clone().lerp(new Color("white"), 0.1)
    : baseColor;

  return (
    !node.hidden && 
    (<HandleTarget>
      <Handle targetRef={"from-context"}>
        <mesh
          position={[node.x, node.y, node.z]}
          onClick={() => setSelected(node)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          ref={meshRef}
          matrixAutoUpdate={true}
        >
          <sphereGeometry args={[(node.size || 0) / 100]} />
          <meshBasicMaterial color={finalColor} />
        </mesh>
      </Handle>
    </HandleTarget>)
  );
};
