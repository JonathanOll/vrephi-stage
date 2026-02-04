import { FC } from "react";
import { EdgeData } from "../../core/types/EdgeData";
import { Vector3 } from "three";
import { Line } from "@react-three/drei";

export const Edge3D: FC<{edge: EdgeData}> = ({ edge }) => {
    return (    
        !edge.source.hidden && !edge.target.hidden && 
            (<mesh>
                <Line points={[
                    new Vector3(edge.source.x, edge.source.y, edge.source.z),
                    new Vector3(edge.target.x, edge.target.y, edge.target.z),
                ]}
                color="white"
                linewidth={5} 
                />
            </mesh>)
    );
}