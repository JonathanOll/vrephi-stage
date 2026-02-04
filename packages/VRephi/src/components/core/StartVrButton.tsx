import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  useSigmaGraph,
} from "@gephi/gephi-lite/src/core/context/dataContexts";
import classNames from "classnames";

export const StartVrButton: FC<{start: () => void}> = ({ start }) => {
  const [isVrSupported, setIsVrSupported] = useState(false);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const sigmaGraph = useSigmaGraph();

  const distanceToCamera = 5;

  useEffect(() => {
    checkVrSupport();
  }, []);

  const checkVrSupport = async () => {
    if (navigator.xr) {
      const isSupported = await navigator.xr.isSessionSupported("immersive-vr");
      setIsVrSupported(isSupported);
    }
  };

  return (
    <button
      className={classNames(
        "gl-btn w-100 background-primary",
        {disabled: false && !isVrSupported}
      )}
      style={{ background: "#0058ff", color: "white" }}
      onClick={start}
      disabled={false && !isVrSupported}
    >
      <span>{isVrSupported ? "Start VR" : "VR Not Supported"}</span>
    </button>
  );
};
