import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useXREvent, useXRInputSourceState } from "@react-three/xr";
import * as THREE from "three";

export function XRGraphControls({ graphRef } : { graphRef: React.RefObject<THREE.Group> }) {

    const leftController = useXRInputSourceState("controller", "left");

    const grabbing = useRef(false);

    const grabControllerPos = useRef(new THREE.Vector3());

    const grabGraphPos = useRef(new THREE.Vector3());

    useXREvent("selectstart", (event) => {
        if (event.data.handedness !== "left") return;
        if (!leftController?.object || !graphRef.current) return;

        grabbing.current = true;

        leftController.object.getWorldPosition(grabControllerPos.current);
        graphRef.current.getWorldPosition(grabGraphPos.current);
    });

    useXREvent("selectend", (event) => {
        if (event.data.handedness !== "left") return;
        grabbing.current = false;
    });

    useFrame(() => {
        if (!grabbing.current || !leftController?.object || !graphRef.current) return;

        const currentControllerPos = new THREE.Vector3();
        leftController.object.getWorldPosition(currentControllerPos);

        const delta = currentControllerPos.clone().sub(grabControllerPos.current);

        delta.multiplyScalar(5);

        const newPos = grabGraphPos.current.clone().add(delta);

        graphRef.current.position.copy(newPos);
    });

    return null;
}
